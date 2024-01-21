import React from 'react'
import styles from "../stylesheets/Chat.module.css"
import { editReply } from '../redux/replyReducer'
import { useDispatch } from 'react-redux'

function Chat(props) {
    const dispatch = useDispatch()
    const data = props.data
    const reply = data.reply

    console.log(data)
    const leftChatStyles = data.reply && {
        borderLeft: `5px solid ${data.reply.color}`,
        backgroundColor: "var(--chatBackground2secondary)"
    }
    const rightChatStyles = data.reply && {
        borderLeft: `5px solid ${data.reply.color}`,
        backgroundColor: "var(--chatBackground1secondary)"
    }
    const selectReply = (e) => {
        e.preventDefault()
        const reply = { ...props.data, show: true }
        console.log(reply)
        dispatch({
            type: `${editReply}`,
            payload: {
                data: reply
            }
        })
    }

    return (
        <div style={{ zIndex: '3' }} id={`${data.sender}${data.message}${data.time}`} value={data} onContextMenu={selectReply} className={data.sender !== "you" ? styles.leftChat : styles.rightChat}>
            {/* Put The conditions for grp chat later Idiot :D */}
            {reply !== undefined && <>
                <div value={data} onContextMenu={props.renderOptionTab} style={data.sender !== "you" ? leftChatStyles : rightChatStyles} className={styles.replyHolder}>
                    <p style={{ color: data.reply.color }}>{data.reply.sender}</p>
                    <p>{data.reply.message}</p>
                </div>
            </>}
            {/* Set The Div Box For Reactions and replies later */}

            {false ? <h4 style={{ color: data.color }} >{data.sender !== "you" ? data.sender : ""}</h4> : <></>}
            <p value={data} onContextMenu={props.renderOptionTab}>{data.message}</p>
            <div className={styles.foot}>
                <span value={data} onContextMenu={selectReply}>{data.time}</span>
                <span>s</span>
            </div>
        </div>
    )
}

export default Chat
