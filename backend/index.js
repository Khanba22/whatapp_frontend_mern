const express = require("express")
const app = express();
const { Server } = require("socket.io")
const http = require("http")
const cors = require("cors")
app.use(cors())
const server = http.createServer(app)
const connectToMongo = require("./DB")
const bodyParser = require('body-parser')
const User = require("./Models/UserSchema")
const addChatToContact = require("./functions/AddMessageQuery")
connectToMongo()
// const {ExpressPeerServer} = require('peer')
const fs = require('fs')



// const servers = ExpressPeerServer()



const io = new Server(server, {
    cors: {
        origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const users = new Map()

//Routes
app.use("/fetchUser",require("./Routes/FetchUserDetails"))
app.use("/createAccount",require("./Routes/createAccount"))


//Socket IO 
io.on("connection", async(socket) => {
    const { username } = socket.handshake.query;
    users.set(username, socket.id);
    socket.broadcast.emit("online", { username: username });
    const query = { username: username };
    const update = { $set: { "lastSeen": "online" } };
    const options = { upsert: true };
    await User.findOneAndUpdate(query, update, options);
    socket.on("send-message", async(data) => {
        socket.emit("sent-successful", { username: data.to.username });
        addChatToContact(data.sender,data.to.username,{...data,status:"sent"});
        addChatToContact(data.to.username,data.sender,{...data,status:"sent"});
        const userId = users.get(data.to.username);
        setTimeout(() => {
            socket.to(userId).emit("receive-message", data);
        }, 100);
    })

    socket.on("read-message", (data) => {

        const sender = users.get(data.to);
        socket.to(sender).emit("read", { username: data.from });
    })

    socket.on("send-reaction",async(data)=>{
        console.log(data)
        User.findByIdAndUpdate({"username":data.to,"contacts.username":data.by,"contacts.chats.message":data.message,"contacts.chats.time":data.time},
            {
                $set:{
                    "contacts.chats.reactions":{
                        ..."contacts.chats.reactions",
                        [data.by]:data.emoji
                    }
                }
            }
        )
        const userId = users.get(data.to)
        socket.to(userId).emit("receive-reaction",data)
    })

    socket.on("remove-reaction-req",data=>{
        const userId = users.get(data.to)
        socket.to(userId).emit('remove-reaction',data)
    })

    socket.on("disconnect", async() => {
        const date = new Date();
        const time = `${date.toLocaleDateString()} , ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        const query = { username: username }
        const update = { $set: { "lastSeen": time} };
        const options = { upsert: true };
        await User.findOneAndUpdate(query, update, options).catch(err=>{
            console.log(err)
        })
    })

})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})