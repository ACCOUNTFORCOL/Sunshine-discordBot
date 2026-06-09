const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addemoji")
    .setDescription("Adds a custom emoji to the server")
    .addAttachmentOption(o => o.setName("attachment").setDescription("Image file for the emoji").setRequired(true))
    .addStringOption(o => o.setName("name").setDescription("Name for the emoji").setRequired(true)),
  async execute(interaction) {
    const attachment = interaction.options.getAttachment("attachment");
    const name = interaction.options.getString("name");
    const emoji = await interaction.guild.emojis.create({ attachment: attachment.url, name });
    return interaction.reply(`Emoji **:${emoji.name}:** added`);
  }
};
