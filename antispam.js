const { SlashCommandBuilder } = require("discord.js");
const { antiSpam } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("antispam")
    .setDescription("Enables anti-spam and sets the message limit before action is taken")
    .addIntegerOption(o => o.setName("count").setDescription("Max messages per 5 seconds before timeout (default 15)")),
  async execute(interaction) {
    const count = interaction.options.getInteger("count") || 15;
    antiSpam.set(interaction.guild.id, count);
    return interaction.reply(`anti spam enabled — limit: ${count} messages per 5 seconds`);
  }
};
