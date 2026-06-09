const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roleeveryone")
    .setDescription("Gives a role to every member in the server")
    .addRoleOption(o => o.setName("role").setDescription("Role to give").setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole("role");
    await interaction.reply(`Giving **${role.name}** to everyone...`);
    const members = await interaction.guild.members.fetch();
    members.forEach(m => m.roles.add(role).catch(() => {}));
  }
};
