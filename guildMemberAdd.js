const { autoroles } = require("../state");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const roleId = autoroles.get(member.guild.id);
    if (roleId) member.roles.add(roleId).catch(() => {});
  }
};
