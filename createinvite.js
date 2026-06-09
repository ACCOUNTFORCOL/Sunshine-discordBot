const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createinvite")
    .setDescription("Creates a permanent invite link for this channel"),
  async execute(interaction) {
    const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 });
    return interaction.reply(`Invite created: ${invite.url}`);
  }
};
