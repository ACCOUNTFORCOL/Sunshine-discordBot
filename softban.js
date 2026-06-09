const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("softban")
    .setDescription("Soft-bans a user (bans then immediately unbans to delete messages)")
    .addUserOption(o => o.setName("user").setDescription("User to softban").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    await interaction.guild.members.ban(user.id, { deleteMessageSeconds: 604800 });
    await interaction.guild.bans.remove(user.id);
    return interaction.reply(`**${user.username}** soft-banned`);
  }
};
