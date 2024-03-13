const addChatToContact = (chat, chats) => {
    var updatedChats = [...chats];
    updatedChats.push(chat);
    return updatedChats
}

const addChatToUser = (chat, bool, userContacts) => {
    var contacts = userContacts
    var contact = {}
    if (!bool) {
        contact = contacts.find(contact => contact.username === chat.sender)
        contacts = contacts.filter(contact => contact.username !== chat.sender)
    } else {
        contact = contacts.find(contact => contact.username === chat.to.username)
        contacts = contacts.filter(contact => contact.username !== chat.to.username)
    }

    if (contact) {
        contact = {
            ...contact,
            chats: [...contact.chats, chat]
        }
        contacts.unshift(contact)
    } else {
        contact = {
            username: chat.sender,
            contactNo: chat.contactNo,
            lastSeen: chat.lastSeen,
            chats: [
                {
                    status: "read",
                    sender: chat.username,
                    contactNo: chat.contactNo,
                    color: "#68f3a7",
                    message: chat.message,
                    time: chat.time
                }
            ],
            profilePicture: chat.profilePicture
        }
        contacts.unshift(contact)
    }
    return contacts
}



module.exports = { addChatToContact, addChatToUser }