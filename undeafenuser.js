const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("undeafenuser")
    .setDescription("Undeafens a user in voice")
    .addUserOption(o => o.setName("user").setDescription("User to undeafen").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id);
    await member.voice.setDeaf(false);
    return interaction.reply(`**${user.username}** undeafened`);
  }
};
