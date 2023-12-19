const nodemailer = require("nodemailer");

class NotificationMailService {
  #transporter = null;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async run(payload) {
    const message = {
      from: process.env.MAIL_FROM,
      to: payload.to,
      subject: `${payload.subject} | ${process.env.APP_NAME}`,
      html: payload.content,
    };

    await this.#transporter.sendMail(message);
  }
}

module.exports = NotificationMailService;
