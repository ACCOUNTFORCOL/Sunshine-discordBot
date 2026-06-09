const autoroles = new Map();
const blacklistedRoles = new Set();
const autobanRoles = new Set();
const autobanChannels = new Set();
const snipes = new Map();
const modLogs = new Map();
const modLogBackup = new Map();
const antiSpam = new Map();
const spamData = new Map();

function addModLog(guild, data) {
  if (!modLogs.has(guild.id)) modLogs.set(guild.id, []);
  modLogs.get(guild.id).push({ ...data, time: Date.now() });
}

module.exports = {
  autoroles, blacklistedRoles, autobanRoles, autobanChannels,
  snipes, modLogs, modLogBackup, antiSpam, spamData, addModLog
};
