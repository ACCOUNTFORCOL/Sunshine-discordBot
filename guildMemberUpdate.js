const { blacklistedRoles, autobanRoles } = require("../state");

module.exports = {
  name: "guildMemberUpdate",
  async execute(oldMember, newMember) {
    for (const role of newMember.roles.cache.values()) {
      if (blacklistedRoles.has(role.id)) {
        await newMember.roles.remove(role).catch(() => {});
      }
      if (autobanRoles.has(role.id)) {
        await newMember.ban({ reason: "autoban role" }).catch(() => {});
      }
    }
  }
};
