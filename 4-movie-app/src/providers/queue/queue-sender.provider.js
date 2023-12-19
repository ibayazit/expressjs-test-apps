const logger = require("../../helper/logger.helper");
const amqp = require("amqplib");

const sendToQueue = async (queue, message) => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URI);
  const channel = await connection.createChannel();

  channel.assertQueue(queue, { durable: false });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  logger("QueueProvider", "Message sent");

  setTimeout(() => {
    connection.close();
  }, 500);
};

module.exports = {
  sendToQueue,
};
