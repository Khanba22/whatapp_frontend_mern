const express = require("express")
const app  = express();
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")
app.use(cors())
const server = http.createServer(app)
const connectToMongo = require("./DB")

connectToMongo()

const io = new Server(server, {
  cors: {
    origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    // credentials: true
  }
});

const users = new Map()


io.on("connection",(socket)=> {
    const {username} = socket.handshake.query
    users.set(username,socket.id)

    socket.on("send-message", (data)=>{
        socket.emit("sent-successful",{username:data.to.username})
        console.log(data.to.username)
        const userId = users.get(data.to.username)
        setTimeout(() => {
            socket.to(userId).emit("receive-message", data)
        }, 100);
    })

    socket.on("read-message",(data)=>{
        const sender = users.get(data.to)
        socket.to(sender).emit("read",{username:data.from})
    })

    socket.on("disconnect",()=>{
        console.log(username + "  Disconnected")
    })

})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})