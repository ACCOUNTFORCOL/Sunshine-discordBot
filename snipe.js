const { SlashCommandBuilder } = require("discord.js");
const { snipes } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("Shows the last deleted message in this channel"),
  async execute(interaction) {
    const data = snipes.get(interaction.channel.id);
    if (!data) return interaction.reply("Nothing to snipe!");
    return interaction.reply(`**${data.author}** said: ${data.content}`);
  }
};
