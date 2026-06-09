const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addsticker")
    .setDescription("Adds a sticker to the server")
    .addAttachmentOption(o => o.setName("attachment").setDescription("Image file for the sticker").setRequired(true))
    .addStringOption(o => o.setName("name").setDescription("Name for the sticker").setRequired(true)),
  async execute(interaction) {
    const attachment = interaction.options.getAttachment("attachment");
    const name = interaction.options.getString("name");
    await interaction.guild.stickers.create({ file: attachment.url, name, tags: name });
    return interaction.reply(`Sticker **${name}** added`);
  }
};
