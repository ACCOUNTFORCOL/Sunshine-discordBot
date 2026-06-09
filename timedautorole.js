const { SlashCommandBuilder } = require("discord.js");
const { autoroles } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timedautorole")
    .setDescription("Sets a temporary autorole for new members")
    .addRoleOption(o => o.setName("role").setDescription("Role").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setDescription("Duration in seconds").setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole("role");
    const duration = interaction.options.getInteger("duration");
    autoroles.set(interaction.guild.id, role.id);
    setTimeout(() => autoroles.delete(interaction.guild.id), duration * 1000);
    return interaction.reply(`Timed autorole set to **${role.name}** for ${duration}s`);
  }
};
