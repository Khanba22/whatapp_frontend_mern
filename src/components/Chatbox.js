import React, { useEffect, useRef, useState } from 'react'
import styles from "../stylesheets/Chatbox.module.css"
import EmojiPicker from 'emoji-picker-react';
import send from "../assets/send.png"
import blank from "../assets/blankProfile.webp"
import close from "../assets/close.png"
import arrowDown from "../assets/arrowDoubleDown.png"
import io from 'socket.io-client';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { editReply } from '../redux/replyReducer';
import OptionTab from './OptionTab';
import { updateUserChatStatus, updateUserChatStatusLast, updateUserChats } from '../redux/userReducer';
import { updateChatStatus, updateChat, updateChatStatusLast } from '../redux/chatReducer';

function Chatbox() {

  const addReaction = (emoji,by) => {
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: addReactionToUser(reply,emoji,by)
      }
    })
    dispatch({
      type: `${updateChat}`,
      payload: {
        chats: addReactionToChat(reply,emoji,by)
      }
    })
  }

  const addReactionToChat = (chat,reaction , by)=>{
    var tempChats = [...chatInfo.chats]
    tempChats = tempChats.map(chatMap=>{
      if (chat.message === chatMap.message && chat.time === chatMap.time ) {
        return {...chatMap,reactions:{...chatMap.reactions,[by]:reaction}}
      }else{
        return chatMap
      }
    })
    return tempChats
  }

  const addReactionToUser = (chat, emoji , by) => {
    var contacts = user.contacts
    var contact = {}
    contact = contacts.find(contact => contact.username === chat.sender)
    contacts = contacts.filter(contact => contact.username !== chat.sender)
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
      console.log(contact.chats)
      contacts.unshift(contact)
    }
    return contacts
  }


  const addChatToContact = (chat) => {
    var updatedChats = [...chatInfo.chats]
    updatedChats.push(chat)
    return updatedChats
  }

  const addChatToUser = (chat, bool) => {
    var contacts = user.contacts
    var contact = {}
    if (!bool) {
      console.log("Sender = " + chat.sender)
      contact = contacts.find(contact => contact.username === chat.sender)
      contacts = contacts.filter(contact => contact.username !== chat.sender)
    } else {
      console.log(chat.to.username)
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

  const dispatch = useDispatch()
  const [showEmoji, setShowEmoji] = useState(false)
  const renderOptionTab = (e, data) => {
    e.preventDefault()
    const heightBox = 350 // The height of Context Menu
    const widthBox = 350
    const reply = data
    dispatch({
      type: `${editReply}`,
      payload: {
        data: reply
      }
    })
    setShowOptions(true)
    if (e.clientY < window.innerHeight - heightBox && e.clientX < window.innerWidth) {
      setPos({
        x: e.clientX - 425,
        y: e.clientY - 30
      })
    } else if (e.clientX < window.innerWidth - widthBox) {
      setPos({
        x: e.clientX - 425,
        y: e.clientY - heightBox
      })
    } else {
      setPos({
        x: e.clientX - widthBox - 375,
        y: e.clientY - heightBox
      })
    }
  }
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false)
  const inputRef = useRef(null);
  const chatRef = useRef(null)


  const onEmojiClick = (e, emojiObject) => {
    setMessage(message + e.emoji)
  }
  var chatInfo = useSelector(state => state.chatDetails)
  var reply = useSelector(state => state.reply)
  var user = useSelector(state => state.user)

  const socket = io("http://localhost:4000", {
    query: {
      username: user.username
    },
  });

  useEffect(() => {
    if (chatInfo.name !== "") {
      setTimeout(() => {
        socket.emit('read-message', { to: chatInfo.username, from: user.username })
        document.getElementById('lowest').scrollIntoView({
          behavior: "smooth",
          inline: "start"
        })
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatInfo.username])


  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle Messaging Queries From Websockets
  socket.on("receive-message", (data) => {
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: addChatToUser(data, false)
      }
    })
    if (data.sender === chatInfo.username) {
      dispatch({
        type: `${updateChat}`,
        payload: {
          chats: addChatToContact(data)
        }
      })
      dispatch({
        type: `${updateChatStatus}`,
        payload: {
          status: "read"
        }
      })
    }
    if (chatInfo.username === data.sender) {
      setTimeout(() => {
        socket.emit('read-message', { to: chatInfo.username, from: user.username })
        document.getElementById('lowest').scrollIntoView({
          behavior: "smooth",
          inline: "start"
        })
      }, 100);
    }
  });

  socket.on('sent-successful', (data) => {
    dispatch({
      type: `${updateUserChatStatusLast}`,
      payload: {
        contactName: data.username,
        status: "sent"
      }
    })

    if (chatInfo.username === data.username) {
      dispatch({
        type: `${updateChatStatusLast}`,
        payload: {
          status: "sent"
        }
      })
    }
  })

  socket.on('read', (data) => {
    dispatch({
      type: `${updateUserChatStatus}`,
      payload: {
        contactName: data.username,
        status: "read"
      }
    })

    if (chatInfo.username === data.username) {
      dispatch({
        type: `${updateChatStatus}`,
        payload: {
          status: "read"
        }
      })
    }

  })

  const handleChange = (event) => {
    setMessage(event.target.value);
  }

  const cancelReply = () => {
    dispatch({
      type: `${editReply}`,
      payload: {
        data: {
          show: false
        }
      }
    })
  }

  const sendMessage = (e) => {
    e.preventDefault()
    const date = new Date()
    const time = `${date.toLocaleDateString()} , ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    var data = {
      to: {
        username: chatInfo.username,
        contactNo: chatInfo.contactNo,
      },
      profilePicture: user.profilePicture,
      status: "waiting",
      sender: user.username,
      contactNo: user.contactNo,
      color: "#68f3a7",
      message: message,
      time: time,
      reactions:{}
    }
    if (reply.show) {
      data = {
        ...data,
        reply: {
          "sender": reply.sender,
          "color": reply.color,
          "message": reply.message,
          "time": reply.time
        },
      }
    }
    socket.emit('send-message', data)
    setMessage("")
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: addChatToUser(data, true)
      }
    })
    dispatch({
      type: `${updateChat}`,
      payload: {
        chats: addChatToContact(data)
      }
    })
    cancelReply()
    setTimeout(() => {
      document.getElementById('lowest').scrollIntoView()
    }, 100);
  }



  return (
    <>
      <div className={styles.container} onClick={() => {
        setShowOptions(false)
      }} >
        <div className={styles.chatInfoTab}>
          <img src={chatInfo.profilePicture !== "" ? chatInfo.profilePicture : blank} alt="" className={styles.profilePicture} />
          <div className={styles.chatInfoTabRight}>
            <h2 className={styles.chatName}>{chatInfo.username}</h2>
            <p>last seen {chatInfo.lastSeen}</p>
          </div>
        </div>
        <div ref={chatRef} className={styles.chatHolder}>
          {
            showOptions ? <div className={styles.optionContainer} style={{ left: pos.x, top: pos.y }}>
              <OptionTab addReaction = {addReaction} />
            </div> : <></>
          }
          {
            chatInfo.chats.map((chat, index) => {
              if (chat.time) {
                if (chat.time === chatInfo.chats[index - 1]) {
                  return <>
                    <h1>
                      Hello
                    </h1>
                    <Chat renderOptionTab={renderOptionTab} data={chat} />

                  </>
                } else {
                  return <Chat renderOptionTab={renderOptionTab} data={chat} />
                }
              } else {
                return <Chat renderOptionTab={renderOptionTab} data={chat} />
              }
            })
          }
          <button className={styles.latestLocator} onClick={() => {
            document.getElementById('lowest').scrollIntoView()
          }}> <img src={arrowDown} alt="" /> </button>
          <div id='lowest'></div>
        </div>
        <div className={styles.inputBar}>
          {
            reply.show &&
            <div className={styles.replyDiv}>
              <div className={styles.replyHolder}>
                <div className={styles.replyContent}>
                  <p style={{ color: reply.color }}>{reply.sender}</p>
                  <button onClick={cancelReply}><img src={close} alt="" /></button>
                </div>
                <p>{reply.message}</p>
              </div>
            </div>
          }
          <div className={styles.emojiSection}>
            {showEmoji ? <EmojiPicker emojiStyle='facebook' style={{ zIndex: "10" }} onEmojiClick={onEmojiClick} /> : <></>}
          </div>
          <button className={styles.inputBarButtons} onClick={() => { setShowEmoji(!showEmoji) }}><img src="https://cdn-icons-png.flaticon.com/128/569/569501.png" alt="" /></button>
          <button className={styles.inputBarButtons}></button>
          <form className={styles.inputForm}>
            <input id='writingSection' type="text" ref={inputRef} value={message} onChange={handleChange} />
            <button className={styles.sendButton} onClick={sendMessage}><img src={send} alt="" /></button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Chatbox