const { SlashCommandBuilder } = require("discord.js");
const { modLogs, modLogBackup } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearmodlog")
    .setDescription("Clears mod logs for this server")
    .addBooleanOption(o => o.setName("backup").setDescription("Save a backup before clearing")),
  async execute(interaction) {
    const backup = interaction.options.getBoolean("backup");

    if (backup) {
      modLogBackup.set(interaction.guild.id, modLogs.get(interaction.guild.id) || []);
    }

    modLogs.set(interaction.guild.id, []);
    return interaction.reply(backup ? "mod logs cleared and backed up" : "mod logs cleared");
  }
};
