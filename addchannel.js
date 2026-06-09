const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addchannel")
    .setDescription("Creates a new text channel")
    .addStringOption(o => o.setName("name").setDescription("Channel name").setRequired(true))
    .addChannelOption(o => o.setName("category").setDescription("Category to place it in"))
    .addRoleOption(o => o.setName("rolepermission").setDescription("Role that can see the channel (others locked out)")),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const category = interaction.options.getChannel("category");
    const role = interaction.options.getRole("rolepermission");
    const overwrites = [];
    if (role) {
      overwrites.push({ id: role.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] });
      overwrites.push({ id: interaction.guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] });
    }
    await interaction.guild.channels.create({
      name,
      type: ChannelType.GuildText,
      parent: category ? category.id : null,
      permissionOverwrites: overwrites
    });
    return interaction.reply(`Channel **#${name}** created`);
  }
};
