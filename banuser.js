const { SlashCommandBuilder } = require("discord.js");
const { addModLog } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banuser")
    .setDescription("Bans a user temporarily")
    .addUserOption(o => o.setName("user").setDescription("User to ban").setRequired(true))
    .addStringOption(o => o.setName("reason").setDescription("Reason").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setDescription("Duration in seconds").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const duration = interaction.options.getInteger("duration");
    await interaction.guild.members.ban(user.id, { reason });
    setTimeout(() => interaction.guild.bans.remove(user.id).catch(() => {}), duration * 1000);
    addModLog(interaction.guild, { type: "ban", user: user.username, mod: interaction.user.username, reason });
    return interaction.reply(`**${user.username}** banned for ${duration}s`);
  }
};
