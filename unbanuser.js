const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unbanuser")
    .setDescription("Unbans a user by their ID")
    .addStringOption(o => o.setName("userid").setDescription("User ID to unban").setRequired(true)),
  async execute(interaction) {
    const id = interaction.options.getString("userid");
    await interaction.guild.bans.remove(id);
    return interaction.reply(`User unbanned`);
  }
};
