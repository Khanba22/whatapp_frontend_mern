import React from 'react'
import ContactList from '../components/ContactList'
import Chatbox from '../components/Chatbox'


function ChatPage() {
  return (
    <div style={{ padding: "30px 0px 0px 30px", height: "100vh" , display:"flex" }}>
        <ContactList />
        <Chatbox/>
      </div>
  )
}

export default ChatPage
