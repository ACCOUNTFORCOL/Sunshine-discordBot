const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timedroleadd")
    .setDescription("Adds a role to a user for a set time")
    .addUserOption(o => o.setName("user").setDescription("User").setRequired(true))
    .addRoleOption(o => o.setName("role").setDescription("Role to add").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setDescription("Duration in seconds").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const role = interaction.options.getRole("role");
    const duration = interaction.options.getInteger("duration");
    const member = await interaction.guild.members.fetch(user.id);
    await member.roles.add(role);
    setTimeout(async () => {
      const fresh = await interaction.guild.members.fetch(user.id).catch(() => null);
      if (fresh) fresh.roles.remove(role).catch(() => {});
    }, duration * 1000);
    return interaction.reply(`Added **${role.name}** to **${user.username}** for ${duration}s`);
  }
};
