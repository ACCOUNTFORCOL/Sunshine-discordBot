require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  // MODERATION
  {
    name: "role",
    description: "Give a role to a user",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true },
      { name: "role", description: "The role to give", type: ApplicationCommandOptionType.Role, required: true }
    ]
  },
  {
    name: "mute",
    description: "Mute a user for a set number of minutes",
    options: [
      { name: "user", description: "The user to mute", type: ApplicationCommandOptionType.User, required: true },
      { name: "time", description: "Duration in minutes", type: ApplicationCommandOptionType.Integer, required: true }
    ]
  },
  {
    name: "punish",
    description: "Punish a user and send them a DM warning",
    options: [
      { name: "user", description: "The user to punish", type: ApplicationCommandOptionType.User, required: true },
      { name: "time", description: "Duration in minutes", type: ApplicationCommandOptionType.Integer, required: true }
    ]
  },
  {
    name: "ban",
    description: "Ban a user from the server",
    options: [
      { name: "user", description: "The user to ban", type: ApplicationCommandOptionType.User, required: true },
      { name: "reason", description: "Reason for the ban", type: ApplicationCommandOptionType.String, required: false }
    ]
  },
  {
    name: "kick",
    description: "Kick a user from the server",
    options: [
      { name: "user", description: "The user to kick", type: ApplicationCommandOptionType.User, required: true },
      { name: "reason", description: "Reason for the kick", type: ApplicationCommandOptionType.String, required: false }
    ]
  },
  {
    name: "purge",
    description: "Delete multiple messages at once",
    options: [
      { name: "amount", description: "Number of messages to delete (max 100)", type: ApplicationCommandOptionType.Integer, required: true }
    ]
  },
  { name: "bypasssm", description: "Bypass slowmode in the current channel" },
  {
    name: "addrole",
    description: "Create a new role in the server",
    options: [
      { name: "name", description: "Name of the new role", type: ApplicationCommandOptionType.String, required: true }
    ]
  },

  // TICKETS
  { name: "open", description: "Open a support ticket" },
  { name: "close", description: "Close the current ticket channel" },

  // ANNOUNCEMENTS
  {
    name: "announce",
    description: "Send an announcement to the channel",
    options: [
      { name: "message", description: "The announcement text", type: ApplicationCommandOptionType.String, required: true }
    ]
  },

  // EVENTS
  {
    name: "startevent",
    description: "Start an event",
    options: [
      { name: "name", description: "Event name", type: ApplicationCommandOptionType.String, required: true }
    ]
  },
  {
    name: "endevent",
    description: "End an event",
    options: [
      { name: "name", description: "Event name", type: ApplicationCommandOptionType.String, required: true }
    ]
  },

  // FUN
  {
    name: "rickroll",
    description: "Rickroll a user",
    options: [
      { name: "user", description: "The victim", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  {
    name: "troll",
    description: "Troll a user with a gif",
    options: [
      { name: "user", description: "The target", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  {
    name: "murder",
    description: "Playfully eliminate a user",
    options: [
      { name: "user", description: "The target", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  {
    name: "control",
    description: "Take control of a user's emotions",
    options: [
      { name: "user", description: "The target", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  {
    name: "grasstouched",
    description: "Did this person touch grass?",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  {
    name: "describesemotion",
    description: "Describe a user's current emotion",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  {
    name: "howrich",
    description: "Find out how rich a user is",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  {
    name: "jumpscare",
    description: "Send a jumpscare at a user",
    options: [
      { name: "user", description: "The target", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  { name: "advice", description: "Get a random piece of advice" },
  { name: "math", description: "Get a random math problem to solve" },
  { name: "coinflip", description: "Flip a coin" },
  {
    name: "8ball",
    description: "Ask the magic 8ball a question",
    options: [
      { name: "question", description: "Your question", type: ApplicationCommandOptionType.String, required: true }
    ]
  },

  // MURDER GAME
  { name: "murdercase", description: "Start a murder mystery game" },
  {
    name: "vote",
    description: "Vote for who you think the killer is",
    options: [
      { name: "user", description: "Your suspect", type: ApplicationCommandOptionType.User, required: true }
    ]
  },

  // MUSIC
  {
    name: "music",
    description: "Open the music player",
    options: [
      { name: "url", description: "Song URL", type: ApplicationCommandOptionType.String, required: true }
    ]
  },

  // SNIPE
  { name: "snipe", description: "See the last deleted message in this channel" },
  {
    name: "anti-snipe",
    description: "Protect a user from being sniped",
    options: [
      { name: "user", description: "The user to protect", type: ApplicationCommandOptionType.User, required: true }
    ]
  },

  // ROLE SYNC
  { name: "sync", description: "Restore your roles after rejoining the server" },

  // LEVELING
  { name: "levelingsetup", description: "Create a leveling channel" },
  {
    name: "checklevel",
    description: "Check a user's current level",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  {
    name: "nextlevelxp",
    description: "Check how much XP a user needs for the next level",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  {
    name: "nextlevel",
    description: "See what level a user is going to next",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true }
    ]
  },
  { name: "levellb", description: "Show the top 10 level leaderboard" },
  {
    name: "rewardroles",
    description: "Set a role to be given at a specific level",
    options: [
      { name: "role", description: "The role to give", type: ApplicationCommandOptionType.Role, required: true },
      { name: "level", description: "The level to reward at", type: ApplicationCommandOptionType.Integer, required: true }
    ]
  },
  {
    name: "rolemultiplier",
    description: "Set an XP multiplier for a role",
    options: [
      { name: "role", description: "The role", type: ApplicationCommandOptionType.Role, required: true },
      { name: "multi", description: "Multiplier amount (e.g. 2 = double XP)", type: ApplicationCommandOptionType.Number, required: true }
    ]
  },
  {
    name: "levelup",
    description: "Manually level up a user",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true },
      { name: "amount", description: "How many levels to add", type: ApplicationCommandOptionType.Integer, required: true }
    ]
  },
  {
    name: "leveldown",
    description: "Manually decrease a user's level",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true },
      { name: "amount", description: "How many levels to remove", type: ApplicationCommandOptionType.Integer, required: true }
    ]
  },
  { name: "managelevels", description: "Open the level manager panel" },

  // ALARMS
  {
    name: "alarm",
    description: "Set an alarm (e.g. 10m, 2h, 30s)",
    options: [
      { name: "time", description: "Time until alarm (e.g. 10m, 2h)", type: ApplicationCommandOptionType.String, required: true }
    ]
  },
  { name: "endalarm", description: "Cancel your active alarm" },

  // ECONOMY
  { name: "salary", description: "Collect your hourly salary" },
  { name: "dailysalary", description: "Collect your daily salary" },
  { name: "usereconomy", description: "Check your balance and net worth" },
  {
    name: "setbalance",
    description: "Set a user's balance (Mod only)",
    options: [
      { name: "user", description: "The user", type: ApplicationCommandOptionType.User, required: true },
      { name: "balance", description: "Amount to set", type: ApplicationCommandOptionType.Integer, required: true }
    ]
  },

  // CENSOR
  {
    name: "wordban",
    description: "Ban a word from being used in the server",
    options: [
      { name: "word", description: "The word to ban", type: ApplicationCommandOptionType.String, required: true }
    ]
  },
  {
    name: "messageban",
    description: "Ban a phrase from being used in the server",
    options: [
      { name: "message", description: "The phrase to ban", type: ApplicationCommandOptionType.String, required: true }
    ]
  },

  // SECURITY
  { name: "securityreport", description: "Check if your server has been raided" },

  // POLLS
  {
    name: "createpoll",
    description: "Create an official Discord poll",
    options: [
      { name: "question", description: "The poll question", type: ApplicationCommandOptionType.String, required: true },
      { name: "option1", description: "Option 1", type: ApplicationCommandOptionType.String, required: true },
      { name: "option2", description: "Option 2", type: ApplicationCommandOptionType.String, required: true },
      { name: "option3", description: "Option 3", type: ApplicationCommandOptionType.String, required: false },
      { name: "option4", description: "Option 4", type: ApplicationCommandOptionType.String, required: false },
      { name: "option5", description: "Option 5", type: ApplicationCommandOptionType.String, required: false },
      { name: "option6", description: "Option 6", type: ApplicationCommandOptionType.String, required: false },
      { name: "option7", description: "Option 7", type: ApplicationCommandOptionType.String, required: false },
      { name: "option8", description: "Option 8", type: ApplicationCommandOptionType.String, required: false },
      { name: "option9", description: "Option 9", type: ApplicationCommandOptionType.String, required: false },
      { name: "option10", description: "Option 10", type: ApplicationCommandOptionType.String, required: false },
      { name: "duration", description: "Poll duration in hours (default: 24)", type: ApplicationCommandOptionType.Integer, required: false }
    ]
  },
  {
    name: "pinpoll",
    description: "Pin a poll message (Manage Messages)",
    options: [
      { name: "messageid", description: "The message ID of the poll", type: ApplicationCommandOptionType.String, required: true }
    ]
  },
  {
    name: "removepoll",
    description: "Delete a poll message (Manage Messages)",
    options: [
      { name: "messageid", description: "The message ID of the poll", type: ApplicationCommandOptionType.String, required: true }
    ]
  },

  // RUNTIME & STORAGE
  { name: "runtime", description: "Check how long the bot has been running" },
  { name: "getprocessruntime", description: "Get the bot process runtime in milliseconds" },
  { name: "checkuserstorage", description: "Check your personal stored stats" },
  { name: "checkserverstorage", description: "Check overall server stats" },
  { name: "resetuserdata", description: "Reset your stored data" },
  { name: "resetserverdata", description: "Reset all server stat data (Admin only)" },
  { name: "checkbotscripts", description: "View bot core system info" },

  // INFO
  { name: "serverinfo", description: "View server information" },
  {
    name: "userinfo",
    description: "View info about a user",
    options: [
      { name: "user", description: "The user to look up", type: ApplicationCommandOptionType.User, required: false }
    ]
  },
  { name: "about", description: "About Core Hub bot" }
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    const guildId = process.env.DISCORD_GUILD_ID;
    const clientId = process.env.DISCORD_CLIENT_ID;

    if (guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
      console.log(`Registered ${commands.length} commands to guild ${guildId}`);
    } else {
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
      console.log(`Registered ${commands.length} commands globally`);
    }
  } catch (error) {
    console.error("Error registering commands:", error);
  }
})();
