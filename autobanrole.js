const { SlashCommandBuilder } = require("discord.js");
const { autobanRoles } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autobanrole")
    .setDescription("Auto-bans anyone who gets a specific role")
    .addRoleOption(o => o.setName("role").setDescription("Role that triggers autoban").setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole("role");
    autobanRoles.add(role.id);
    return interaction.reply(`Anyone who gets **${role.name}** will be auto-banned`);
  }
};
