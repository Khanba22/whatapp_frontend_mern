import React, { useEffect, useRef, useState } from 'react'
import styles from "../stylesheets/Chatbox.module.css"
import EmojiPicker from 'emoji-picker-react';
import send from "../assets/send.png"
import close from "../assets/close.png"
import arrowDown from "../assets/arrowDoubleDown.png"
import { io } from 'socket.io-client';
// import {io} from "socket.io-client"
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { editReply } from '../redux/replyReducer';
import OptionTab from './OptionTab';
import { updateUserChats } from '../redux/userReducer';
import { updateChat } from '../redux/chatReducer';

function Chatbox() {
  const dispatch = useDispatch()
  var chatInfo = useSelector(state => state.chatDetails)
  var reply = useSelector(state => state.reply)
  const user = useSelector(state => state.user)
  const socket = io("http://localhost:4000", {
    query: {
      username: user.username
    }
  })

  useEffect(() => {
    socket.emit('read-message', { name: user.username, sender: chatInfo.name })
  }, [chatInfo.name,socket,user.username])

  const [showEmoji, setShowEmoji] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false)
  const inputRef = useRef(null);
  const chatRef = useRef(null)
  const onEmojiClick = (e, emojiObject) => {
    setMessage(message + e.emoji)
    console.log(message)
  }


  const updateContactChat = (data) => {
    var contacts = [...user.contacts];
    var contact = contacts.find(contact => contact.name === data.sender);
    contacts = contacts.filter(contact => contact.name !== data.sender)
    console.log(contacts)
    contact = {
      ...contact,
      chats: [...contact.chats, data]
    }
    contacts.push(contact)
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: contacts
      }
    });
    dispatch({
      type: `${updateChat}`,
      payload: {
        data: { ...chatInfo, chats: [...chatInfo.chats, data], show: true }
      }
    })

  }


  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [socket])

  socket.on("receive-message", (data) => {
    updateContactChat(data)
    setTimeout(() => {
      document.getElementById('lowest').scrollIntoView()
    }, 100);
  });

  socket.on('sent-successful', (data) => {
    var contacts = [...user.contacts]; // Create a new array to ensure mutability
    alert("Sent Successful Called")
    var tcontact = contacts.find(contact => contact.name === chatInfo.name);
    if (tcontact) {
      contacts = contacts.map(contact => {
        if (tcontact.name === data.name) {
          return { ...contact, chats: contact.chats.map(chat => { return { ...chat, status: "sent" } }) }
        }else{
          return {...contact}
        }
      })
    }
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: contacts // Update the user's contacts
      }
    });
    dispatch({
      type: `${updateChat}`,
      payload: {
        data: { ...chatInfo, chats: [...chatInfo.chats, data], show: true }
      }
    })
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
    const time = `${date.getHours()}:${date.getMinutes()}`
    var data = {
      to: {
        name: chatInfo.name,
        contactNo: chatInfo.contactNo,
      },
      status: "waiting",
      sender: user.username,
      contactNo: user.contactNo,
      color: "#68f3a7",
      message: message,
      time: time
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
    var contacts = [...user.contacts]; // Create a new array to ensure mutability
    var contact = contacts.find(contact => contact.name === chatInfo.name);
    contacts = contacts.filter(contact => contact.name !== chatInfo.name)
    contact = {
      ...contact,
      chats: [...contact.chats, data]
    }
    contacts.unshift(contact)
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: contacts // Update the user's contacts
      }
    });
    dispatch({
      type: `${updateChat}`,
      payload: {
        data: { ...chatInfo, chats: [...chatInfo.chats, data], show: true }
      }
    })
    cancelReply()
    setTimeout(() => {
      document.getElementById('lowest').scrollIntoView()
    }, 100);
  }

  

  // socket.on('read', (data) => {
  //   var contacts = [...user.contacts]; // Create a new array to ensure mutability
  //   var targetContact = contacts.find(contact => contact.name === chatInfo.name);
  //   if (targetContact) {
  //     contacts = contacts.map(contact => {
  //       if (targetContact.name === contact.name) {
  //         return {
  //           ...contact,
  //           chats: [contact.chats.map(chat => { return { ...chat, status: "read" } })]
  //         }
  //       } else {
  //         return { ...contact }
  //       }
  //     })
  //   }
  //   dispatch({
  //     type: `${updateUserChats}`,
  //     payload: {
  //       contacts: contacts // Update the user's contacts
  //     }
  //   });
  //   dispatch({
  //     type: `${updateChat}`,
  //     payload: {
  //       data: { ...chatInfo, chats: [...chatInfo.chats, data], show: true }
  //     }
  //   })
  // })


  const renderOptionTab = (e) => {
    e.preventDefault()
    const heightBox = 350 // The height of Context Menu
    e.preventDefault()
    const reply = { ...JSON.parse(e.target.id) }
    dispatch({
      type: `${editReply}`,
      payload: {
        data: reply
      }
    })
    setShowOptions(true)
    if (e.clientY < window.innerHeight - heightBox) {
      setPos({
        x: e.clientX - 425,
        y: e.clientY - 30
      })
    } else {
      setPos({
        x: e.clientX - 425,
        y: e.clientY - heightBox
      })
    }
  }


  return (
    <>
      <div className={styles.container} onClick={() => {
        setShowOptions(false)
      }} >
        <div className={styles.chatInfoTab}>
          <img src={chatInfo.profilePicture} alt="" className={styles.profilePicture} />
          <div className={styles.chatInfoTabRight}>
            <h2 className={styles.chatName}>{chatInfo.name}</h2>
            <p>last seen {chatInfo.lastSeen}</p>
          </div>
        </div>
        <div ref={chatRef} className={styles.chatHolder}>
          {
            showOptions ? <div className={styles.optionContainer} style={{ left: pos.x, top: pos.y }}>
              <OptionTab />
            </div> : <></>
          }
          {
            chatInfo.chats.map(chat => {
              return <Chat renderOptionTab={renderOptionTab} data={chat} />
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
            {showEmoji ? <EmojiPicker emojiStyle='apple' style={{ zIndex: "10" }} onEmojiClick={onEmojiClick} /> : <></>}
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
