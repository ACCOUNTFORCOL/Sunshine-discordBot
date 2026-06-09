const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("endtimeoutuser")
    .setDescription("Removes the timeout from a user")
    .addUserOption(o => o.setName("user").setDescription("User to un-timeout").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id);
    await member.timeout(null);
    return interaction.reply(`Timeout removed from **${user.username}**`);
  }
};
