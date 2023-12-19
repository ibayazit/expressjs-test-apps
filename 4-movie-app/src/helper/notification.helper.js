const { QueueTypes } = require("../providers/queue/queue.types");
const { sendMessage } = require("./queue.helper");
const {
  NotificationTypes,
  NotificationStrategySelector,
} = require("../providers/notification/notification.provider");
const notificationService = new NotificationStrategySelector();

const mail = (to, subject, content) => {
  notificationService
    .getStrategy(NotificationTypes.MAIL)
    .run({ to, subject, content });
};

const bulkMail = (receivers, subject, content) => {
  for (const user of receivers) {
    sendMessage(QueueTypes.MAIL, {
      to: { name: `${user.name} ${user.surname}`, address: user.email },
      subject,
      content,
    });
  }
};

module.exports = {
  mail,
  bulkMail,
};
