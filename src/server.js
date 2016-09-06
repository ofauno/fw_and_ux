import Server from 'socket.io';

export function start_server() {
  const io = new Server().attach(2444);
}