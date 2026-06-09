const { SlashCommandBuilder } = require("discord.js");
const { autobanChannels } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setupautobanchannel")
    .setDescription("Sets the current channel to auto-ban anyone who sends a message in it"),
  async execute(interaction) {
    autobanChannels.add(interaction.channel.id);
    return interaction.reply("Autoban channel set — anyone who sends here gets banned");
  }
};
