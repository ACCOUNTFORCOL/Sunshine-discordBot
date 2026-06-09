const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roleadd")
    .setDescription("Adds a role to a user")
    .addUserOption(o => o.setName("user").setDescription("User to give role to").setRequired(true))
    .addRoleOption(o => o.setName("role").setDescription("Role to add").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const role = interaction.options.getRole("role");
    const member = await interaction.guild.members.fetch(user.id);
    await member.roles.add(role);
    return interaction.reply(`Added **${role.name}** to **${user.username}**`);
  }
};
