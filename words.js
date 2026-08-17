// Word list for Sixdle — a Wordle-style game with 6-letter words.
// WORDS is used both as the pool of possible answers and as the
// dictionary of guesses the player is allowed to submit.
const WORDS = [
  // animals
  "rabbit", "monkey", "turtle", "beetle", "spider", "rodent", "gopher", "possum",
  "weasel", "jaguar", "coyote", "donkey", "kitten", "lizard", "salmon", "oyster",
  "shrimp", "turkey", "falcon", "condor", "pigeon", "parrot", "toucan", "walrus",
  "badger", "beaver", "ferret", "iguana", "python", "cougar", "jackal", "mammal",

  // food
  "butter", "cheese", "banana", "orange", "coffee", "cookie", "waffle", "pickle",
  "noodle", "tomato", "carrot", "potato", "garlic", "pepper", "celery", "yogurt",
  "muffin", "burger", "cereal", "grapes", "walnut", "peanut", "almond", "cashew",
  "raisin", "radish", "nugget", "omelet", "sundae", "sorbet", "cutlet",

  // household objects
  "pillow", "candle", "mirror", "basket", "bottle", "buckle", "hammer", "wrench",
  "ladder", "zipper", "button", "needle", "thread", "pencil", "eraser", "marker",
  "folder", "binder", "staple", "wallet", "camera", "laptop", "tablet", "remote",
  "heater", "cooler", "kettle", "teapot", "saucer", "napkin", "carpet", "pillar",
  "window",

  // nature
  "forest", "desert", "canyon", "meadow", "valley", "stream", "gravel", "pebble",
  "sunset", "spring", "summer", "autumn", "winter", "breeze", "planet", "galaxy",
  "meteor", "rocket", "jungle", "island", "harbor", "bridge", "tunnel", "castle",
  "garden", "flower", "branch", "leaves", "cactus", "bamboo", "willow",

  // adjectives
  "yellow", "purple", "silver", "golden", "bright", "gentle", "simple", "humble",
  "stupid", "clever", "boring", "rustic", "formal", "casual", "modern", "sturdy",
  "subtle", "rugged", "tender", "bitter", "savory", "creamy", "chunky", "sticky",
  "smooth", "chilly", "frosty", "cloudy", "stormy", "breezy", "wintry",

  // verbs
  "jumped", "walked", "talked", "cooked", "washed", "rushed", "pushed", "pulled",
  "kicked", "landed", "wander", "travel", "follow", "listen", "scream", "rescue",
  "forget", "remind", "decide", "accept", "reject", "commit", "submit", "retire",
  "create", "invent", "design", "repair", "rename", "remove", "attach", "detach",
  "engage", "employ", "expand", "reduce", "lessen", "gather", "mingle", "settle",
  "unfold", "unlock", "unwrap", "rewind", "replay", "record", "delete", "select",
  "toggle", "scroll",

  // people
  "mother", "father", "sister", "cousin", "nephew", "auntie", "family", "friend",
  "doctor", "lawyer", "artist", "writer", "singer", "dancer", "player", "driver",
  "farmer", "hunter", "welder", "waiter", "butler", "tailor", "barber", "banker",
  "grocer", "mentor", "pastor", "master", "expert", "rookie", "wizard", "knight",
  "archer", "warden", "sailor", "pirate", "dragon", "goblin", "spirit", "shadow",
  "zombie",

  // places
  "temple", "palace", "prison", "church", "museum", "campus", "garage", "studio",
  "office", "resort", "colony", "empire", "region", "border", "county", "street",
  "corner", "subway", "runway", "hangar", "launch", "engine", "wheels", "brakes",
  "pedals", "motors",

  // colors
  "maroon", "violet", "indigo", "copper", "bronze", "pastel",

  // numbers and time
  "twelve", "twenty", "thirty", "eighty", "ninety", "second", "minute", "moment",
  "decade", "annual", "weekly", "single", "double", "triple", "couple", "plenty",
  "enough", "amount", "volume", "weight", "height", "length", "tissue", "ticket",
  "coupon", "refund", "budget", "profit", "income", "salary", "wealth", "estate",
  "market", "demand", "supply", "retail", "vendor", "broker", "client", "custom",
  "member", "rebate",

  // sports
  "soccer", "hockey", "boxing", "karate", "sprint", "hurdle", "rowing", "diving",
  "skiing", "hiking", "biking", "batter", "umpire", "arenas", "trophy", "medals",
  "dugout", "tackle", "fumble", "huddle", "bunker", "birdie", "eagles", "putter",
  "stroke",
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WORDS };
}
