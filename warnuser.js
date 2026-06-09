const { SlashCommandBuilder } = require("discord.js");
const { addModLog } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnuser")
    .setDescription("Sends a warning DM to a user")
    .addUserOption(o => o.setName("user").setDescription("User to warn").setRequired(true))
    .addStringOption(o => o.setName("reason").setDescription("Reason for warning").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    try { await user.send(`You were warned in **${interaction.guild.name}**: ${reason}`); } catch {}
    addModLog(interaction.guild, { type: "warn", user: user.username, mod: interaction.user.username, reason });
    return interaction.reply(`**${user.username}** has been warned`);
  }
};
