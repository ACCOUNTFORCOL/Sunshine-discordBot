const { SlashCommandBuilder } = require("discord.js");
const { modLogs } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modlogs")
    .setDescription("Shows mod logs for this server")
    .addIntegerOption(o => o.setName("page").setDescription("Page number")),
  async execute(interaction) {
    const page = interaction.options.getInteger("page") || 1;
    const logs = modLogs.get(interaction.guild.id) || [];

    const perPage = 10;
    const start = (page - 1) * perPage;
    const slice = logs.slice(start, start + perPage);

    if (!slice.length) return interaction.reply("no logs");

    const total = Math.ceil(logs.length / perPage);
    const text = slice
      .map(l => {
        const d = new Date(l.time).toLocaleString();
        return `[${d}] ${l.type} | user: ${l.user} | mod: ${l.mod}${l.reason ? ` | reason: ${l.reason}` : ""}`;
      })
      .join("\n");

    return interaction.reply(`**Mod Logs — Page ${page}/${total}**\n\`\`\`\n${text}\n\`\`\``);
  }
};
