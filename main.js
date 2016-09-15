import { server as createHttpServer } from "http";
import express from "express";
import eventPublisher from "./event-publisher";
import SocketManager from "./socket-manager";
import store from "./store";

export default class VirtualSphero {
  constructor(wsPort) {
    this.app = express();
    this.server = createHttpServer(this.app);

    this.app.use(express.static("virtual"));
    this.server.listen(wsPort, () => {
      console.log(`[VirtualSphero] ${new Date()} VirtualSphero is listening on port ${wsPort}`);
    });

    new SocketManager(this.server);
  }

  // apis
  command(spheroName, commandName, args) {
    eventPublisher.publish("command", spheroName, commandName, args);
  }

  addSphero(spheroName) {
    eventPublisher.publish("addSphero", spheroName);
  }

  removeSphero(spheroName) {
    eventPublisher.publish("removeSphero", spheroName);
  }

  getNames() {
    return store.virtualSpheros;
  }
}
