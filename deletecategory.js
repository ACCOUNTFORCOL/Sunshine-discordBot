const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletecategory")
    .setDescription("Deletes a category")
    .addChannelOption(o => o.setName("category").setDescription("Category to delete").setRequired(true)),
  async execute(interaction) {
    const category = interaction.options.getChannel("category");
    await category.delete();
    return interaction.reply(`Category deleted`);
  }
};
