const { SlashCommandBuilder } = require("discord.js");
const { autoroles } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autorole")
    .setDescription("Sets a role to give every new member that joins")
    .addRoleOption(o => o.setName("role").setDescription("Role to auto-assign").setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole("role");
    autoroles.set(interaction.guild.id, role.id);
    return interaction.reply(`Autorole set to **${role.name}**`);
  }
};
