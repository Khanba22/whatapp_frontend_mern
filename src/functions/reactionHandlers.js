const addReactionToUser = (chat, emoji, by, contactState) => {
    var contacts = contactState
    var contact = contacts.find(contact => contact.username === by)
    contacts = contacts.filter(contact => contact.username !== by)
    if (contact) {
        contact = {
            ...contact,
            chats: contact.chats.map(chatMap => {
                if (chat.message === chatMap.message && chat.time === chatMap.time && chat.sender === chatMap.sender) {
                    return { ...chatMap, reactions: { ...chatMap.reactions, [by]: emoji } }
                }
                return chatMap
            })
        }
        contacts.unshift(contact)
    }
    return contacts
}

const removeReactionFromUser = (chat, by, contactState)=>{
    var contacts = contactState
    var contact = contacts.find(contact => contact.username === by)
    contacts = contacts.filter(contact => contact.username !== by)
    if (contact) {
        contact = {
            ...contact,
            chats: contact.chats.map(chatMap => {
                if (chat.message === chatMap.message && chat.time === chatMap.time && chat.sender === chatMap.sender) {
                    const newReact = delete chatMap.reactions[by]
                    return { ...chatMap, reactions: newReact }
                }
                return chatMap
            })
        }
        contacts.unshift(contact)
    }
    return contacts
}

const addReactionToChat = (chat, reaction, by, chatInfoState) => {
    var tempChats = [...chatInfoState]
    tempChats = tempChats.map(chatMap => {
        if (chat.message === chatMap.message && chat.time === chatMap.time) {
            return { ...chatMap, reactions: { ...chatMap.reactions, [by]: reaction } }
        } else {
            return chatMap
        }
    })
    return tempChats
}


const removeReactionFromChat = (chat, by, chatInfoState)=>{
    var tempChats = [...chatInfoState]
    tempChats = tempChats.map(chatMap => {
        if (chat.message === chatMap.message && chat.time === chatMap.time) {
            const newReact = delete chatMap.reactions[by]
            return { ...chatMap, reactions: newReact }
        } else {
            return chatMap
        }
    })
    return tempChats
}


module.exports = { addReactionToUser, addReactionToChat ,removeReactionFromChat , removeReactionFromUser }