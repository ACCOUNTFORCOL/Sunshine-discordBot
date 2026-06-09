const { SlashCommandBuilder } = require("discord.js");
const { autoroles } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autoroledelete")
    .setDescription("Removes the autorole for new members"),
  async execute(interaction) {
    autoroles.delete(interaction.guild.id);
    return interaction.reply("Autorole removed");
  }
};
