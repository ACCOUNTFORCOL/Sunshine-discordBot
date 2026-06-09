const { SlashCommandBuilder } = require("discord.js");
const { addModLog } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeoutuser")
    .setDescription("Times out a user for a set duration")
    .addUserOption(o => o.setName("user").setDescription("User to timeout").setRequired(true))
    .addStringOption(o => o.setName("reason").setDescription("Reason").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setDescription("Duration in seconds").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const duration = interaction.options.getInteger("duration");
    const member = await interaction.guild.members.fetch(user.id);
    await member.timeout(duration * 1000, reason);
    addModLog(interaction.guild, { type: "timeout", user: user.username, mod: interaction.user.username, reason });
    return interaction.reply(`**${user.username}** timed out for ${duration}s`);
  }
};
