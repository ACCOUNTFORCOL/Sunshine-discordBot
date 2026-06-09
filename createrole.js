const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createrole")
    .setDescription("Creates a new role")
    .addStringOption(o => o.setName("name").setDescription("Role name").setRequired(true))
    .addStringOption(o => o.setName("color").setDescription("Role color (hex, e.g. #ff0000)"))
    .addUserOption(o => o.setName("user").setDescription("User to give the role to")),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const color = interaction.options.getString("color");
    const user = interaction.options.getUser("user");

    const role = await interaction.guild.roles.create({
      name,
      color: color || undefined
    });

    if (user) {
      const member = await interaction.guild.members.fetch(user.id);
      await member.roles.add(role);
    }

    return interaction.reply(`${role.name} created`);
  }
};
