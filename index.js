import { createServer } from "http";
import geckos from '@geckos.io/server'
import { Server } from 'socket.io'

const httpServer = createServer();

const socketIo = new Server(httpServer,{
  cors:{
    origin: "*",
  }
})

const geckosIo = geckos()

geckosIo.addServer(httpServer);

socketIo.on("connection", (socket) => {
  console.log("socket connected");
})

geckosIo.onConnection(channel => {
  console.log("connection made")
  channel.onDisconnect(() => {
    console.log(`${channel.id} got disconnected`)
  })

  channel.on('chat message', data => {
    console.log(data);
  })
})

httpServer.listen(5000);