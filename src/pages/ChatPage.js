import React, { useEffect, useState } from 'react'
import ContactList from '../components/ContactList'
import Chatbox from '../components/Chatbox'
import styles from "./PageStyles/ChatPage.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { changeDetails } from '../redux/userReducer'
import tempContacts from "../data/tempContacts.json"

function ChatPage() {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const details = useSelector((state) => state.user)
  const getContacts = async () => {
    console.log(details.username)
    await fetch('http://localhost:4000/fetchUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: details.username })
    }).then(async res => {
      return res.json()
    }).then(data => {
      console.log(data)
      if (data) {
        dispatch({
          type: `${changeDetails}`,
          payload: {
            name: "contacts",
            value: data.contacts
          }
        })
        setShow(true)
      }
    })
  }

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <>
      {
        show && <>
          <div className={styles.window}>
            <ContactList />
            <Chatbox />
          </div>
          <div className={styles.mobile}>
            <ContactList />
          </div>
        </>
      }
    </>
  )
}

export default ChatPage
