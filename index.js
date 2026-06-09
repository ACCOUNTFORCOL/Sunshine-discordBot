const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ChannelType, PermissionsBitField } = require("discord.js")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

const token = "BOT_TOKEN"
const clientId = "CLIENT_ID"

const autoroles = new Map()
const blacklistedRoles = new Set()
const autobanRoles = new Set()
const autobanChannels = new Set()
const snipes = new Map()

const commands = [
  new SlashCommandBuilder()
    .setName("roleadd")
    .setDescription("adds a role to a user")
    .addUserOption(o => o.setName("user").setRequired(true))
    .addRoleOption(o => o.setName("role").setRequired(true)),

  new SlashCommandBuilder()
    .setName("timedroleadd")
    .setDescription("adds a role for a time")
    .addUserOption(o => o.setName("user").setRequired(true))
    .addRoleOption(o => o.setName("role").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setRequired(true)),

  new SlashCommandBuilder()
    .setName("roleuserremove")
    .setDescription("removes role from user")
    .addUserOption(o => o.setName("user").setRequired(true))
    .addRoleOption(o => o.setName("role").setRequired(true)),

  new SlashCommandBuilder()
    .setName("autorole")
    .setDescription("sets autorole")
    .addRoleOption(o => o.setName("role").setRequired(true)),

  new SlashCommandBuilder()
    .setName("timedautorole")
    .setDescription("sets temporary autorole")
    .addRoleOption(o => o.setName("role").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setRequired(true)),

  new SlashCommandBuilder()
    .setName("autoroledelete")
    .setDescription("removes autorole"),

  new SlashCommandBuilder()
    .setName("roledelete")
    .setDescription("deletes role")
    .addRoleOption(o => o.setName("role").setRequired(true)),

  new SlashCommandBuilder()
    .setName("roleeveryone")
    .setDescription("gives role to everyone")
    .addRoleOption(o => o.setName("role").setRequired(true)),

  new SlashCommandBuilder()
    .setName("roleremoveeveryone")
    .setDescription("removes role from everyone"),

  new SlashCommandBuilder()
    .setName("addchannel")
    .setDescription("creates channel")
    .addStringOption(o => o.setName("name").setRequired(true))
    .addChannelOption(o => o.setName("category"))
    .addRoleOption(o => o.setName("rolepermission")),

  new SlashCommandBuilder()
    .setName("deletechannel")
    .setDescription("deletes channel")
    .addChannelOption(o => o.setName("channel").setRequired(true)),

  new SlashCommandBuilder()
    .setName("lockchannel")
    .setDescription("locks channel"),

  new SlashCommandBuilder()
    .setName("unlockchannel")
    .setDescription("unlocks channel")
    .addChannelOption(o => o.setName("channel").setRequired(true)),

  new SlashCommandBuilder()
    .setName("addcategory")
    .setDescription("creates category")
    .addStringOption(o => o.setName("name").setRequired(true)),

  new SlashCommandBuilder()
    .setName("deletecategory")
    .setDescription("deletes category")
    .addChannelOption(o => o.setName("category").setRequired(true)),

  new SlashCommandBuilder()
    .setName("warnuser")
    .setDescription("warn user")
    .addUserOption(o => o.setName("user").setRequired(true))
    .addStringOption(o => o.setName("reason").setRequired(true)),

  new SlashCommandBuilder()
    .setName("kickuser")
    .setDescription("kick user")
    .addUserOption(o => o.setName("user").setRequired(true))
    .addStringOption(o => o.setName("reason").setRequired(true)),

  new SlashCommandBuilder()
    .setName("timeoutuser")
    .setDescription("timeout user")
    .addUserOption(o => o.setName("user").setRequired(true))
    .addStringOption(o => o.setName("reason").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setRequired(true)),

  new SlashCommandBuilder()
    .setName("banuser")
    .setDescription("ban user temporarily")
    .addUserOption(o => o.setName("user").setRequired(true))
    .addStringOption(o => o.setName("reason").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setRequired(true)),

  new SlashCommandBuilder()
    .setName("endtimeoutuser")
    .setDescription("remove timeout")
    .addUserOption(o => o.setName("user").setRequired(true)),

  new SlashCommandBuilder()
    .setName("unbanuser")
    .setDescription("unban user")
    .addStringOption(o => o.setName("userid").setRequired(true)),

  new SlashCommandBuilder()
    .setName("deafenuser")
    .setDescription("deafen user")
    .addUserOption(o => o.setName("user").setRequired(true))
    .addIntegerOption(o => o.setName("duration").setRequired(true)),

  new SlashCommandBuilder()
    .setName("undeafenuser")
    .setDescription("undeafen user")
    .addUserOption(o => o.setName("user").setRequired(true)),

  new SlashCommandBuilder()
    .setName("softban")
    .setDescription("soft bans a user")
    .addUserOption(o => o.setName("user").setRequired(true)),

  new SlashCommandBuilder()
    .setName("blacklistrole")
    .setDescription("blacklists a role")
    .addRoleOption(o => o.setName("role").setRequired(true)),

  new SlashCommandBuilder()
    .setName("autobanrole")
    .setDescription("autobans users with role")
    .addRoleOption(o => o.setName("role").setRequired(true)),

  new SlashCommandBuilder()
    .setName("setupautobanchannel")
    .setDescription("sets autoban channel"),

  new SlashCommandBuilder()
    .setName("createinvite")
    .setDescription("creates invite"),

  new SlashCommandBuilder()
    .setName("addemoji")
    .setDescription("adds emoji")
    .addAttachmentOption(o => o.setName("attachment").setRequired(true))
    .addStringOption(o => o.setName("name").setRequired(true)),

  new SlashCommandBuilder()
    .setName("addsticker")
    .setDescription("adds sticker")
    .addAttachmentOption(o => o.setName("attachment").setRequired(true))
    .addStringOption(o => o.setName("name").setRequired(true)),

  new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("snipes last deleted message"),

  new SlashCommandBuilder()
    .setName("purge")
    .setDescription("deletes messages")
    .addIntegerOption(o => o.setName("count").setRequired(true))
].map(c => c.toJSON())

const rest = new REST({ version: "10" }).setToken(token)

client.once("ready", async () => {
  await rest.put(Routes.applicationCommands(clientId), {
    body: commands
  })
})

client.on("messageDelete", message => {
  snipes.set(message.channel.id, {
    content: message.content,
    author: message.author?.username || "unknown"
  })
})

client.on("messageCreate", async message => {
  if (!message.guild) return
  if (message.author.bot) return
  if (!autobanChannels.has(message.channel.id)) return

  if (
    message.member.permissions.has(PermissionsBitField.Flags.Administrator) ||
    message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
  ) return

  await message.member.ban({ reason: "autoban channel" }).catch(() => {})
})

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  for (const role of newMember.roles.cache.values()) {
    if (blacklistedRoles.has(role.id)) {
      await newMember.roles.remove(role).catch(() => {})
    }

    if (autobanRoles.has(role.id)) {
      await newMember.ban({ reason: "autoban role" }).catch(() => {})
    }
  }
})

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return

  const guild = interaction.guild

  if (interaction.commandName === "softban") {
    const user = interaction.options.getUser("user")
    await guild.members.ban(user.id)
    await guild.bans.remove(user.id)
    return interaction.reply(`${user.username} softbanned`)
  }

  if (interaction.commandName === "blacklistrole") {
    const role = interaction.options.getRole("role")
    blacklistedRoles.add(role.id)
    return interaction.reply(`${role.name} blacklisted`)
  }

  if (interaction.commandName === "autobanrole") {
    const role = interaction.options.getRole("role")
    autobanRoles.add(role.id)
    return interaction.reply(`${role.name} autoban role set`)
  }

  if (interaction.commandName === "setupautobanchannel") {
    autobanChannels.add(interaction.channel.id)
    return interaction.reply(`autoban channel set`)
  }

  if (interaction.commandName === "createinvite") {
    const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 })
    return interaction.reply(`invite created ${invite.url}`)
  }

  if (interaction.commandName === "addemoji") {
    const attachment = interaction.options.getAttachment("attachment")
    const name = interaction.options.getString("name")
    const emoji = await guild.emojis.create({ attachment: attachment.url, name })
    return interaction.reply(`${emoji.name} emoji added`)
  }

  if (interaction.commandName === "addsticker") {
    const attachment = interaction.options.getAttachment("attachment")
    const name = interaction.options.getString("name")
    await guild.stickers.create({ file: attachment.url, name, tags: name })
    return interaction.reply(`sticker added`)
  }

  if (interaction.commandName === "snipe") {
    const data = snipes.get(interaction.channel.id)
    if (!data) return interaction.reply("nothing to snipe")
    return interaction.reply(`${data.author} said ${data.content}`)
  }

  if (interaction.commandName === "purge") {
    const count = interaction.options.getInteger("count")
    const deleted = await interaction.channel.bulkDelete(count, true)
    return interaction.reply(`${deleted.size} messages deleted`)
  }
})

client.login(token)
