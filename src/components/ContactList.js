import React from 'react'
import styles from "../stylesheets/ContactList.module.css"
import Contact from './Contact'
import { useSelector } from 'react-redux'
// import UserComponent from './UserComponent'
function ContactList() {

  const details = useSelector((state) => state.user)

  // const [search, setSearch] = useState([{username:"MushanKhan"},{username:"TusharPamnani"}])



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Chats</h2>
        <div className={styles.iconTag}>
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <div className={styles.searchSection}>
          <input onChange={(e) => {  }} type="text" placeholder='Search For messages and Chats' className={styles.searchBar} />
        </div>
      </div>
      <div className={styles.holder}>
        {
           <>
            {
              details.contacts.map(contact => {
                if (contact.username !== details.username) {
                  return <Contact key={JSON.stringify(details.contacts.indexOf(contact))} data={contact} />
                } else {
                  return <>

                  </>
                }
              })
            }
          </> 
        }
      </div>
    </div>
  )
}

export default ContactList
