const User = require("../Models/UserSchema");
async function updateUserChatStatus(from,to,status) {
    try {
      const user = await User.findOne({ username: to });
      if (!user) {
        console.log('User not found');
        return;
      }
      user.contacts.forEach(contact => {
        if (contact.username === from) {
            contact.chats.forEach(chat => {
                chat.status = status;
            });
        }
      });
  
      // Save the updated user object
      await user.save();
    } catch (error) {
      console.error('Error updating user chat statuses:', error);
    }
  }

  module.exports = {updateUserChatStatus}