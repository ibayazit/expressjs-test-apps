const logger = require("../../helper/logger.helper");
const amqp = require("amqplib");
const { queueCallbackSwitch } = require("./queue-callback.service");
const { QueueTypes } = require("./queue.types");

const consumeQueue = async (queue) => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URI);
  const channel = await connection.createChannel();

  channel.assertQueue(queue, { durable: false });

  logger("QueueReceiver", `Waiting for ${queue} messages`);

  channel.consume(
    queue,
    (message) => {
      logger("QueueReceiver", "Message received");

      queueCallbackSwitch(queue, message.content.toString());
    },
    { noAck: true }
  );
};

const consumeQueues = async () => {
  for (const queue of Object.values(QueueTypes)) {
    consumeQueue(queue);
  }
};

module.exports = {
  consumeQueue,
  consumeQueues,
};
