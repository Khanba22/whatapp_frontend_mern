import React, { useEffect, useRef, useState } from 'react'
import styles from "../stylesheets/Chatbox.module.css"
import EmojiPicker from 'emoji-picker-react';
import send from "../assets/send.png"
import close from "../assets/close.png"
// import { io } from 'socket.io-client';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { editReply } from '../redux/replyReducer';
import OptionTab from './OptionTab';
function Chatbox() {
  const dispatch = useDispatch()
  var inputRef = useRef(null);
  const chatRef = useRef(null)
  const onEmojiClick = (e, emojiObject) => {
    setMessage(message + e.emoji)
    console.log(message)
  }
  // const location = useLocation()
  // const chatData = location.state
  // const socket = io("http://localhost:3001")
  //To be added in socket when link is created
  // , { query: {
  //   sender:chatData.sender,
  //   receiver:chatData.receiver,
  //  } }
  const [showEmoji, setShowEmoji] = useState(false)
  // socket.connect()
  // socket.on("receive-message", (data) => {
  //   data = { ...data, sender: "other" }
  //   setChats(chats => [...chats, data])
  // });
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false)

  const handleChange = (event) => {
    setMessage(event.target.value);
  }

  const cancelReply = () => {
    dispatch({
      type: `${editReply}`,
      payload: {
        data: { show: false }
      }
    })
  }

  var chatInfo = useSelector(state => state.chatDetails)
  var reply = useSelector(state => state.reply)
  const [chats, setChats] = useState(chatInfo.chats)
  const sendMessage = (e) => {
    e.preventDefault()
    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes()}`
    const data = reply.show === true ? {
      sender: "you",
      color: "#68f3a7",
      message: message,
      reply: {
        "sender": reply.sender,
        "color": reply.color,
        "message": reply.message,
        "time": reply.time
      },
      time: time
    } :
      {
        sender: "you",
        color: "#68f3a7",
        message: message,
        time: time
      }
    // socket.emit("send-message", data);
    setChats([...chats, data])
    setMessage("")
    cancelReply()
  }

  useEffect(() => {
    setChats(chatInfo.chats)
  }, [chatInfo])

  const [pos, setPos] = useState({
    x: 0,
    y: 0
  })

  const renderOptionTab = (e) => {
    setShowOptions(false)
    setPos({
      x: e.clientX - 425,
      y: e.clientY - 30
    })
  }


  return (
    <>
      <div className={styles.container} onClick={() => {
        setShowOptions(true)
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
            !showOptions ? <div className={styles.optionContainer} style={{left: pos.x, top: pos.y }}>
                  <OptionTab/>
            </div> : <></>
          }
          {
            chats.map(chat => {
              return <Chat renderOptionTab={renderOptionTab} data={chat} />
            })
          }
          <button className={styles.latestLocator} onClick={() => {
          }}>b</button>
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
            {showEmoji ? <EmojiPicker emojiStyle='facebook' style={{ zIndex: "10", background: "var(--bgTertiary)" }} onEmojiClick={onEmojiClick} /> : <></>}
          </div>
          <button className={styles.inputBarButtons} onClick={() => { setShowEmoji(!showEmoji) }}><img src="https://cdn-icons-png.flaticon.com/128/569/569501.png" alt="" /></button>
          <button className={styles.inputBarButtons}></button>
          <form className={styles.inputForm}>
            <input type="text" ref={inputRef} value={message} onChange={handleChange} />
            <button className={styles.sendButton} onClick={sendMessage}><img src={send} alt="" /></button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Chatbox
