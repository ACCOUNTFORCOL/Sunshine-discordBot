const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roledelete")
    .setDescription("Deletes a role from the server")
    .addRoleOption(o => o.setName("role").setDescription("Role to delete").setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole("role");
    await role.delete();
    return interaction.reply(`Deleted role **${role.name}**`);
  }
};
