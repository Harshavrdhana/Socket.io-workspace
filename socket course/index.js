//1. packages
import express from 'express'
import http from 'http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Server } from 'socket.io'

//2. instances
const app = express()
const server = http.createServer(app)
const io = new Server(server)

//3. Serving HTML file
const _dirname = dirname(fileURLToPath(import.meta.url))
app.get('/', (req, res) => res.sendFile(join(_dirname, "index.html")))

//4. Define a connection event handler
io.on('connection', (client)=>{
  console.log("User connected to server")

  client.on('new message', (message)=>{
    console.log(message)
  })

  client.on('disconnect', ()=>{
    console.log('User disconnected from the server')
  })
});
 
//5. Start the server
const PORT = 3000;
server.listen(PORT, ()=>console.log("server running on 3000"))