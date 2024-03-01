const User = require("../Models/UserSchema")
async function addChatToContact(senderUsername, contactUsername, chat) {
    try {
      // Find the user with the specified username
      const user = await User.findOne({ username: senderUsername });
  
      if (!user) {
        throw new Error('Sender user not found');
      }
  
      // Check if the contact exists in the user's contacts array
      const contactIndex = user.contacts.findIndex(contact => contact.username === contactUsername);
  
      if (contactIndex === -1) {
        // If contact doesn't exist, find the contact user in the database
        const contactUser = await User.findOne({ username: contactUsername });
  
        if (!contactUser) {
          throw new Error('Contact user not found');
        }
  
        // Create a new contact object with imported details and add the chat
        const newContact = {
          username: contactUser.username,
          contactNo: contactUser.contactNo,
          lastSeen: contactUser.lastSeen,
          chats: [chat], // Add the new chat to the chats array
          profilePicture: contactUser.profilePicture
        };
  
        // Insert the new contact into the user's contacts array
        user.contacts.unshift(newContact);
      } else {
        // If contact exists, directly add the chat to their chats array
        user.contacts[contactIndex].chats.push(chat);
      }
  
      // Save the updated user object
      await user.save();
      // console.log('Chat added successfully');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

module.exports = addChatToContact