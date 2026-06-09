const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deafenuser")
    .setDescription("Deafens a user in voice for a set duration")
    .addUserOption(o => o.setName("user").setDescription("User to deafen").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setDescription("Duration in seconds").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const duration = interaction.options.getInteger("duration");
    const member = await interaction.guild.members.fetch(user.id);
    await member.voice.setDeaf(true);
    setTimeout(async () => {
      const fresh = await interaction.guild.members.fetch(user.id).catch(() => null);
      if (fresh && fresh.voice.channel) fresh.voice.setDeaf(false).catch(() => {});
    }, duration * 1000);
    return interaction.reply(`**${user.username}** deafened for ${duration}s`);
  }
};
