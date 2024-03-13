import React, { useEffect, useRef, useState } from 'react';
import styles from "../stylesheets/Chatbox.module.css";
import EmojiPicker from 'emoji-picker-react';
import send from "../assets/send.png";
import blank from "../assets/blankProfile.webp"
import close from "../assets/close.png";
import arrowDown from "../assets/arrowDoubleDown.png"
import io from 'socket.io-client';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { editReply } from '../redux/replyReducer';
import OptionTab from './OptionTab';
import { updateUserChatStatus, updateUserChatStatusLast, updateUserChats } from '../redux/userReducer';
import { updateChatStatus, updateChat, updateChatStatusLast } from '../redux/chatReducer';
import { addReactionToUser, addReactionToChat, removeReactionFromChat, removeReactionFromUser } from '../functions/reactionHandlers';
import { addChatToContact, addChatToUser } from '../functions/chatFunctions';

function Chatbox() {
  const dispatch = useDispatch()
  const [showEmoji, setShowEmoji] = useState(false)
  var chatInfo = useSelector(state => state.chatDetails)
  var reply = useSelector(state => state.reply)
  var user = useSelector(state => state.user)
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

  const removeReaction = (e) => {
    e.preventDefault();
    socket.emit("remove-reaction-req", { ...reply, by: user.username, to: chatInfo.username })
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: removeReactionFromUser(reply, user.username, user.contacts)
      }
    });
    dispatch({
      type: `${updateChat}`,
      payload: {
        chats: removeReactionFromChat(reply, user.username, chatInfo.chats)
      }
    });
  }

  const addReaction = (emoji, by) => {
    socket.emit("send-reaction", { ...reply, by, emoji, to: chatInfo.username })
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: addReactionToUser(reply, emoji, by, user.contacts)
      }
    });
    dispatch({
      type: `${updateChat}`,
      payload: {
        chats: addReactionToChat(reply, emoji, by, chatInfo.chats)
      }
    });
  }





  const onEmojiClick = (e, emojiObject) => {
    setMessage(message + e.emoji)
  }


  const socket = io("http://localhost:4000", {
    query: {
      username: user.username
    },
  });

  const fetchStatus = async () => {
    await fetch('http://localhost:4000/fetchUser/fetchStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: chatInfo.username })
    }).then(async res => {
      return res.json()
    }).then(data => {
      if (data) {
        console.log(data)
        dispatch({
          type: `${updateChat}`,
          payload: {
            lastSeen: data.lastSeen
          }
        })
        dispatch({
          type: `${updateUserChats}`,
          payload: {
            lastSeen: data.lastSeen
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    if (chatInfo.name !== "") {
      fetchStatus()
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

  socket.on('remove-reaction', (data) => {
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: removeReactionFromUser(data, data.by, user.contacts)
      }
    })
    dispatch({
      type: `${updateChat}`,
      payload: {
        chats: removeReactionFromChat(data, data.by, chatInfo.chats)
      }
    })
  })

  socket.on("receive-reaction", (data) => {
    const emoji = data.emoji
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: addReactionToUser(data, emoji, data.by, user.contacts)
      }
    })
    dispatch({
      type: `${updateChat}`,
      payload: {
        chats: addReactionToChat(data, emoji, data.by, chatInfo.chats)
      }
    })
  })

  socket.on("receive-message", (data) => {
    dispatch({
      type: `${updateUserChats}`,
      payload: {
        contacts: addChatToUser(data, false, user.contacts)
      }
    })
    if (data.sender === chatInfo.username) {
      dispatch({
        type: `${updateChat}`,
        payload: {
          chats: addChatToContact(data, chatInfo.chats)
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
      reactions: {}
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
        contacts: addChatToUser(data, true, user.contacts)
      }
    })
    dispatch({
      type: `${updateChat}`,
      payload: {
        chats: addChatToContact(data, chatInfo.chats)
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
            <p>{chatInfo.lastSeen ? chatInfo.lastSeen !== "online" ? chatInfo.lastSeen.split(",")[1] !== undefined ? `Last Seen ${chatInfo.lastSeen.split(",")[1]}` : "" : "Online" : ""}</p>
          </div>
        </div>
        <div ref={chatRef} className={styles.chatHolder}>
          {
            showOptions ? <div className={styles.optionContainer} style={{ left: pos.x, top: pos.y }}>
              <OptionTab addReaction={addReaction} />
            </div> : <></>
          }
          {
            chatInfo.chats.map((chat, index) => {
              if (chat.time) {
                console.log(chatInfo.chats[index].time.split(",")[0])
                if (index > 0 && chatInfo.chats[index].time.split(",")[0] !== chatInfo.chats[index - 1].time.split(",")[0]) {
                  return <>
                    <div className={styles.dateHeader}>
                      <p>{ chatInfo.chats[index].time.split(",")[0]}</p>
                    </div>
                    <Chat removeReaction={removeReaction} renderOptionTab={renderOptionTab} data={chat} />

                  </>
                } else {
                  return <Chat removeReaction={removeReaction} renderOptionTab={renderOptionTab} data={chat} />
                }
              } else {
                return <Chat removeReaction={removeReaction} renderOptionTab={renderOptionTab} data={chat} />
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