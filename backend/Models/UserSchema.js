const mongoose = require('mongoose');

// Define the schema for the chat message object
const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String // Assuming status is optional
  },
  reply: {
    sender: String,
    color: String,
    message: String,
    time: String
  },
  reactions: [String] // Assuming reactions is optional and an array of strings
});

// Define the schema for the user object
const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  lastSeen: {
    type: String,
    required: true
  },
  chats: [chatSchema], // Using the chatSchema for the chats array
  profilePicture: {
    type: String
  }
});


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    lastSeen:{
        type:String
    },
    contacts:[contactSchema] ,
    profilePicture:{
        type:String
    },
    contactNo:{
        type:String
    } 
})

// Create a Mongoose model based on the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
