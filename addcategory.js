const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addcategory")
    .setDescription("Creates a new category")
    .addStringOption(o => o.setName("name").setDescription("Category name").setRequired(true)),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    await interaction.guild.channels.create({ name, type: ChannelType.GuildCategory });
    return interaction.reply(`Category **${name}** created`);
  }
};
