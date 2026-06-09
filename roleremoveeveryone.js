const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roleremoveeveryone")
    .setDescription("Removes a role from every member in the server")
    .addRoleOption(o => o.setName("role").setDescription("Role to remove").setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole("role");
    await interaction.reply(`Removing **${role.name}** from everyone...`);
    const members = await interaction.guild.members.fetch();
    members.forEach(m => m.roles.remove(role).catch(() => {}));
  }
};
