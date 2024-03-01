import React, { useEffect, useState } from 'react'
import styles from '../stylesheets/Contact.module.css'
import tick from "../assets/icons8-done-50.png"
import doubleTick from "../assets/icons8-double-tick-30.png"
import blueTick from "../assets/blueTick.png"
import clock from "../assets/clock.png"
import { useDispatch, useSelector } from 'react-redux'
import { updateChat } from '../redux/chatReducer'

function Contact(props) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const data = props.data
    const lastMessage = data.chats[data.chats.length - 1]
    const selectContact = () => {
        dispatch({
            type: `${updateChat}`,
            payload: {
                ...props.data,
                show: true
            }
        })
        setSelected(true)
    }
    const chat = useSelector(state => state.chatDetails)
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        if (chat.contactNo === data.contactNo) {
            setSelected(true)
        } else {
            setSelected(false)
        }
    }, [chat])

    return (
        <div onClick={selectContact} className={styles.container} style={selected ? { backgroundColor: "var(--bgTertiary)" } : {}}>
            <img className={styles.profileImage} src={data.profilePicture} alt="" />
            <div className={styles.content}>
                <div className={styles.nameLine}>
                    <h3>{data.username}</h3>
                    <span className={styles.timeStamp}>{lastMessage !== undefined ?lastMessage.time :""}</span>
                </div>
                <div className={styles.textContent}>
                    {lastMessage !== undefined && lastMessage.sender === user.username ? <img src={lastMessage.status === "sent" ? doubleTick : lastMessage.status === "read" ? blueTick : clock} alt="" /> : <></>}
                    <p>{lastMessage !== undefined ? lastMessage.message.substring(0, 35) + "..." : ""}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Contact
