const { PermissionsBitField } = require("discord.js");
const { autobanChannels, antiSpam, spamData } = require("../state");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (!message.guild || message.author.bot) return;

    if (autobanChannels.has(message.channel.id)) {
      if (
        !message.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
        !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
      ) {
        await message.member.ban({ reason: "autoban channel" }).catch(() => {});
        return;
      }
    }

    const limit = antiSpam.get(message.guild.id);
    if (!limit) return;

    if (
      message.member.permissions.has(PermissionsBitField.Flags.Administrator) ||
      message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
    ) return;

    const key = `${message.guild.id}:${message.author.id}`;
    const now = Date.now();
    const window = 5000;

    if (!spamData.has(key)) spamData.set(key, []);
    const timestamps = spamData.get(key).filter(t => now - t < window);
    timestamps.push(now);
    spamData.set(key, timestamps);

    if (timestamps.length >= limit) {
      spamData.delete(key);
      await message.member.timeout(60000, "anti-spam").catch(() => {});
    }
  }
};
