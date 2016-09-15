import socketIO from "socket.io";
import Socket from "./socket";

export default class SocketManager {
  constructor(server) {
    this.io = socketIO(server);
    this.sockets = [];
    this.io.on("connection", socket => {
      socket.on("request", option => {
        this.sockets.push(new Socket(socket, option.showSpheros));
      });
    });
  }
}
