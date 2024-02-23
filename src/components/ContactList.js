import React, { useEffect } from 'react'
import { changeDetails } from '../redux/userReducer'
import tempContacts from "../data/tempContacts.json"
import styles from "../stylesheets/ContactList.module.css"
import Contact from './Contact'
import { useDispatch, useSelector } from 'react-redux'
function ContactList() {

  const dispatch = useDispatch()

  const details = useSelector((state)=>state.user)

  const updateUsername = (e)=>{
    dispatch({
      type:`${changeDetails}`,
      payload:{
        name:"username",
        value:e.target.value
      }
    })
  }

  const getContacts = ()=>{
      dispatch({
        type:`${changeDetails}`,
        payload:{
          name:"contacts",
          value:tempContacts
        }
      })
  }

  useEffect(()=>{
    getContacts()
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Chats</h2>
        <div className={styles.iconTag}>
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <input onChange={updateUsername} type="text" placeholder='Search For messages and Chats' className={styles.searchBar}/>
      </div>
      <div className={styles.holder}>
        {
          details.contacts.map(contact => {
            if (contact.username !== details.username) {
              return <Contact key={JSON.stringify(details.contacts.indexOf(contact))} data = {contact} />
            }else{
              return <></>
            }
          })
        }
      </div>
    </div>
  )
}

export default ContactList
