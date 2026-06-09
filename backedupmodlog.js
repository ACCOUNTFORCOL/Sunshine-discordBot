const { SlashCommandBuilder } = require("discord.js");
const { modLogs, modLogBackup } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("backedupmodlog")
    .setDescription("Restores mod logs from the last backup"),
  async execute(interaction) {
    const data = modLogBackup.get(interaction.guild.id);
    if (!data) return interaction.reply("no backup found");
    modLogs.set(interaction.guild.id, data);
    return interaction.reply("mod logs restored");
  }
};
