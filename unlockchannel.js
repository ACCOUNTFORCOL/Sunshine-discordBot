const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlockchannel")
    .setDescription("Unlocks a channel so members can send messages again")
    .addChannelOption(o => o.setName("channel").setDescription("Channel to unlock").setRequired(true)),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
    return interaction.reply("Channel unlocked");
  }
};
