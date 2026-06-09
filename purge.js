const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Bulk deletes messages in the current channel")
    .addIntegerOption(o => o.setName("count").setDescription("Number of messages to delete (max 100)").setRequired(true)),
  async execute(interaction) {
    const count = interaction.options.getInteger("count");
    const deleted = await interaction.channel.bulkDelete(Math.min(count, 100), true);
    return interaction.reply({ content: `Deleted ${deleted.size} messages`, ephemeral: true });
  }
};
