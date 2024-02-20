const express = require("express")
const app  = express();
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")
app.use(cors())
const server = http.createServer(app)
const connectToMongo = require("./DB")

connectToMongo()

const io = new Server(server,{
    cors:{
        methods:["GET","POST","PUT","DELETE"]
    }
})

const users = new Map()


io.on("connection",(socket)=> {
    const {username} = socket.handshake.query
    users.set(username,socket.id)


    socket.on("send-message", (data)=>{
        const senderId = users.get(data.sender)
        console.log("Sender = " + data.sender + " " + senderId)
        // socket.emit("sent-successful",{...data,status:"sent"})
        const userId = users.get(data.to.name)
        delete data.to
        socket.to(userId).emit("receive-message", data)
    })

    socket.on("read-message",(data)=>{
        const sender = users.get(data.sender)
        socket.to(sender).emit("read",{name:data.name})
    })

    socket.on("disconnect",()=>{
        console.log(username + "  Disconnected")
    })

})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})