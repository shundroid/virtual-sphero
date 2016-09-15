import { EventEmitter } from "events";

class EventPublisher {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }
  subscribe(eventName, observer) {
    this.eventEmitter.on(eventName, observer);
  }
  publish(eventName, ...data) {
    this.eventEmitter.emit.apply(this.eventEmitter, [eventName].concat(data));
  }
}

export default new EventPublisher();
