const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletechannel")
    .setDescription("Deletes a channel")
    .addChannelOption(o => o.setName("channel").setDescription("Channel to delete").setRequired(true)),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    await channel.delete();
    return interaction.reply(`Channel deleted`);
  }
};
