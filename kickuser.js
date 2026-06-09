const { SlashCommandBuilder } = require("discord.js");
const { addModLog } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kickuser")
    .setDescription("Kicks a user from the server")
    .addUserOption(o => o.setName("user").setDescription("User to kick").setRequired(true))
    .addStringOption(o => o.setName("reason").setDescription("Reason for kick").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const member = await interaction.guild.members.fetch(user.id);
    await member.kick(reason);
    addModLog(interaction.guild, { type: "kick", user: user.username, mod: interaction.user.username, reason });
    return interaction.reply(`**${user.username}** has been kicked`);
  }
};
