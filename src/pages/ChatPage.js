import React, { useEffect, useState } from 'react'
import ContactList from '../components/ContactList'
import Chatbox from '../components/Chatbox'
import styles from "./PageStyles/ChatPage.module.css"
import { useDispatch, useSelector } from 'react-redux'
// import { changeDetails } from '../redux/userReducer'
// import tempContacts from "../data/tempContacts.json"

function ChatPage() {
  const details = useSelector(state => state.user)
  return (
    <>
      <div className={styles.window}>
        <ContactList />
        <Chatbox />
      </div>
      <div className={styles.mobile}>
        <ContactList />
      </div>

    </>
  )
}

export default ChatPage
