const { sendToQueue } = require("../providers/queue/queue-sender.provider");

const sendMessage = (type, payload) => {
  sendToQueue(type, payload);
};

module.exports = {
  sendMessage,
};
