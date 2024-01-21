import React, { useEffect, useState } from 'react'
import styles from '../stylesheets/Contact.module.css'
// import tick from "../assets/icons8-done-50.png"
import doubleTick from "../assets/icons8-double-tick-30.png"
// import blueTick from "../assets/blueTick.png"
import { useDispatch, useSelector } from 'react-redux'
import { updateChat } from '../redux/chatReducer'
function Contact(props) {

    const dispatch = useDispatch()
    const data = props.data
    const selectContact= ()=>{
        dispatch({
          type:`${updateChat}`,
          payload:{
            data:{...props.data,show:true}
          }
        })
        setSelected(true)
    }
    const chat = useSelector(state=>state.chatDetails)
    const [selected,setSelected] = useState(false)

    useEffect(()=>{
        if (chat.contactNo === data.contactNo) {
            setSelected(true)
        }else{
            setSelected(false)
        }
    },[chat])

    return (
        <div onClick={selectContact} className={styles.container} style={selected ? {backgroundColor:"var(--bgTertiary)"}:{}}>
            <img className={styles.profileImage} src={data.profilePicture} alt="" />
            <div className={styles.content}>
                <div className={styles.nameLine}>
                    <h3>{data.name}</h3>
                    <span className={styles.timeStamp}>12-12-1222</span>
                </div>
                <div className={styles.textContent}>
                    <img src={doubleTick} alt="" />
                    <p>{data.chats[0] !== undefined ? data.chats[0].message.substring(0,35)+"...":""}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Contact
