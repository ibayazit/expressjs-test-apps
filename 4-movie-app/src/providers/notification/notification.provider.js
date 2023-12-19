const NotificationMailService = require("./services/mail.service");

const NotificationTypes = {
  MAIL: "MAIL",
};

class NotificationStrategySelector {
  strategies = new Map();

  constructor() {
    this.addStrategy(NotificationTypes.MAIL, NotificationMailService);
  }

  addStrategy(transportType, strategy) {
    this.strategies.set(transportType, strategy);
  }

  getStrategy(transportType) {
    const strategy = this.strategies.get(transportType);

    if (!strategy) {
      throw new Error(`Strategy for ${transportType} not found`);
    }

    return new strategy();
  }
}

module.exports = {
  NotificationTypes,
  NotificationStrategySelector,
};
