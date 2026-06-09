const { snipes } = require("../state");

module.exports = {
  name: "messageDelete",
  execute(message) {
    if (!message.content || !message.author) return;
    snipes.set(message.channel.id, {
      content: message.content,
      author: message.author.username
    });
  }
};
