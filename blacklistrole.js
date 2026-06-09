const { SlashCommandBuilder } = require("discord.js");
const { blacklistedRoles } = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklistrole")
    .setDescription("Blacklists a role — anyone who gets it will have it instantly removed")
    .addRoleOption(o => o.setName("role").setDescription("Role to blacklist").setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole("role");
    blacklistedRoles.add(role.id);
    return interaction.reply(`**${role.name}** is now blacklisted`);
  }
};
