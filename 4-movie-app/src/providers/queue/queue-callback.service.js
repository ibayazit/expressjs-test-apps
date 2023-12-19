const { QueueTypes } = require("./queue.types");
const { mail } = require("../../helper/notification.helper");

const queueCallbackSwitch = (queue, message) => {
  switch (queue) {
    case QueueTypes.MAIL:
      queueMailCallback(message);
      break;

    default:
      throw new Error("Unknown queue type");
      break;
  }
};

const queueMailCallback = (payload) => {
  const { to, subject, content } = JSON.parse(payload);

  mail(to, subject, content);
};

module.exports = {
  queueCallbackSwitch,
  queueMailCallback,
};
