(function () {
  const WORD_LENGTH = 6;
  const MAX_GUESSES = 7;
  const VALID_WORDS = new Set(DICTIONARY);

  const KEYBOARD_ROWS = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
  ];

  const boardEl = document.getElementById("board");
  const keyboardEl = document.getElementById("keyboard");
  const toastEl = document.getElementById("toast");
  const helpModal = document.getElementById("help-modal");
  const endModal = document.getElementById("end-modal");
  const endTitle = document.getElementById("end-title");
  const endMessage = document.getElementById("end-message");

  let answer = "";
  let currentGuess = "";
  let rowIndex = 0;
  let gameOver = false;
  let tiles = []; // tiles[row][col] -> element
  const keyStatus = {}; // letter -> 'correct' | 'present' | 'absent'

  function pickAnswer() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  function buildBoard() {
    boardEl.innerHTML = "";
    tiles = [];
    for (let r = 0; r < MAX_GUESSES; r++) {
      const row = document.createElement("div");
      row.className = "row";
      const rowTiles = [];
      for (let c = 0; c < WORD_LENGTH; c++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        row.appendChild(tile);
        rowTiles.push(tile);
      }
      boardEl.appendChild(row);
      tiles.push(rowTiles);
    }
  }

  function buildKeyboard() {
    keyboardEl.innerHTML = "";
    KEYBOARD_ROWS.forEach((rowKeys) => {
      const row = document.createElement("div");
      row.className = "keyboard-row";
      rowKeys.forEach((key) => {
        const btn = document.createElement("button");
        btn.className = "key";
        btn.dataset.key = key;
        if (key === "enter" || key === "backspace") {
          btn.classList.add("wide");
          btn.textContent = key === "enter" ? "Enter" : "⌫";
        } else {
          btn.textContent = key;
        }
        btn.addEventListener("click", () => handleKey(key));
        row.appendChild(btn);
      });
      keyboardEl.appendChild(row);
    });
  }

  function showToast(msg, duration = 1400) {
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    if (showToast._t) clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toastEl.classList.remove("visible");
    }, duration);
  }

  function shakeRow(r) {
    tiles[r].forEach((t) => {
      t.classList.remove("shake");
      void t.offsetWidth;
      t.classList.add("shake");
    });
  }

  function handleKey(key) {
    if (gameOver) return;

    if (key === "enter") {
      submitGuess();
      return;
    }
    if (key === "backspace") {
      if (currentGuess.length > 0) {
        currentGuess = currentGuess.slice(0, -1);
        renderCurrentRow();
      }
      return;
    }
    if (/^[a-z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      currentGuess += key;
      renderCurrentRow();
    }
  }

  function renderCurrentRow() {
    const rowTiles = tiles[rowIndex];
    for (let c = 0; c < WORD_LENGTH; c++) {
      const tile = rowTiles[c];
      const letter = currentGuess[c];
      tile.textContent = letter ? letter.toUpperCase() : "";
      tile.classList.toggle("filled", Boolean(letter));
      if (letter) {
        tile.classList.remove("pop");
        void tile.offsetWidth;
        tile.classList.add("pop");
      }
    }
  }

  function evaluateGuess(guess) {
    const result = new Array(WORD_LENGTH).fill("absent");
    const answerLetters = answer.split("");
    const used = new Array(WORD_LENGTH).fill(false);

    // First pass: correct positions
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guess[i] === answerLetters[i]) {
        result[i] = "correct";
        used[i] = true;
      }
    }

    // Second pass: present but wrong position
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (result[i] === "correct") continue;
      const idx = answerLetters.findIndex(
        (letter, j) => !used[j] && letter === guess[i]
      );
      if (idx !== -1) {
        result[i] = "present";
        used[idx] = true;
      }
    }

    return result;
  }

  function updateKeyboardStatus(guess, result) {
    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guess[i];
      const status = result[i];
      const prev = keyStatus[letter];
      const rank = { absent: 0, present: 1, correct: 2 };
      if (!prev || rank[status] > rank[prev]) {
        keyStatus[letter] = status;
      }
    }
    document.querySelectorAll(".key").forEach((btn) => {
      const key = btn.dataset.key;
      const status = keyStatus[key];
      btn.classList.remove("correct", "present", "absent");
      if (status) btn.classList.add(status);
    });
  }

  function submitGuess() {
    if (currentGuess.length < WORD_LENGTH) {
      showToast("Not enough letters");
      shakeRow(rowIndex);
      return;
    }
    if (!VALID_WORDS.has(currentGuess)) {
      showToast("Not in word list");
      shakeRow(rowIndex);
      return;
    }

    const guess = currentGuess;
    const result = evaluateGuess(guess);
    const rowTiles = tiles[rowIndex];

    rowTiles.forEach((tile, i) => {
      setTimeout(() => {
        tile.classList.add("flip");
        setTimeout(() => {
          tile.classList.add(result[i]);
        }, 250);
      }, i * 250);
    });

    const totalDelay = WORD_LENGTH * 250 + 300;

    setTimeout(() => {
      updateKeyboardStatus(guess, result);

      const won = guess === answer;
      const lastRow = rowIndex === MAX_GUESSES - 1;

      if (won) {
        gameOver = true;
        showToast(pickWinMessage(rowIndex));
        setTimeout(() => openEndModal(true), 900);
      } else if (lastRow) {
        gameOver = true;
        setTimeout(() => openEndModal(false), 300);
      } else {
        rowIndex++;
        currentGuess = "";
      }
    }, totalDelay);
  }

  function pickWinMessage(row) {
    const messages = [
      "Genius!",
      "Magnificent!",
      "Impressive!",
      "Splendid!",
      "Great!",
      "Nice!",
      "Phew!",
    ];
    return messages[row] || "You got it!";
  }

  function openEndModal(won) {
    endTitle.textContent = won ? "You Win!" : "Out of Guesses";
    endMessage.textContent = won
      ? `You guessed it in ${rowIndex + 1} ${rowIndex === 0 ? "try" : "tries"}.`
      : `The word was ${answer.toUpperCase()}.`;
    endModal.classList.remove("hidden");
  }

  function startNewGame() {
    answer = pickAnswer();
    currentGuess = "";
    rowIndex = 0;
    gameOver = false;
    for (const k in keyStatus) delete keyStatus[k];
    buildBoard();
    document
      .querySelectorAll(".key")
      .forEach((btn) => btn.classList.remove("correct", "present", "absent"));
    endModal.classList.add("hidden");
  }

  document.addEventListener("keydown", (e) => {
    if (!helpModal.classList.contains("hidden")) return;
    if (!endModal.classList.contains("hidden")) return;
    const key = e.key.toLowerCase();
    if (key === "enter") handleKey("enter");
    else if (key === "backspace") handleKey("backspace");
    else if (/^[a-z]$/.test(key)) handleKey(key);
  });

  document.getElementById("help-btn").addEventListener("click", () => {
    helpModal.classList.remove("hidden");
  });
  document.getElementById("help-close").addEventListener("click", () => {
    helpModal.classList.add("hidden");
  });
  helpModal.addEventListener("click", (e) => {
    if (e.target === helpModal) helpModal.classList.add("hidden");
  });

  document.getElementById("end-close").addEventListener("click", () => {
    endModal.classList.add("hidden");
  });
  document.getElementById("play-again-btn").addEventListener("click", startNewGame);
  document.getElementById("new-game-btn").addEventListener("click", startNewGame);

  buildKeyboard();
  startNewGame();
})();
