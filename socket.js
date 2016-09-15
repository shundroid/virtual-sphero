import eventPublisher from "./event-publisher";
import store from "./store";

export default class Socket {
  constructor(rawSocket, filter) {
    this.rawSocket = rawSocket;
    this.filter = filter;

    eventPublisher.subscribe("command", this.sendCommand.bind(this));
    eventPublisher.subscribe("addSphero", this.addSphero.bind(this));
    eventPublisher.subscribe("removeSphero", this.removeSphero.bind(this));

    store.virtualSpheros.forEach(virtualSphero => {
      this.addSphero(virtualSphero);
    });
  }
  sendCommand(targetSpheroName, commandName, args) {
    this.rawSocket.emit("command", targetSpheroName, commandName, args);
  }
  addSphero(spheroName) {
    if (this.filter === null || this.filter.indexOf(spheroName) !== -1) {
      this.rawSocket.emit("addVirtualSphero", spheroName);
    }
  }
  removeSphero(spheroName) {
    if (this.filter === null || this.filter.indexOf(spheroName) !== -1) {
      this.rawSocket.emit("removeVirtualSphero", spheroName);
    }
  }
}
