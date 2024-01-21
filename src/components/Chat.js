import React from 'react'
import styles from "../stylesheets/Chat.module.css"
import { editReply } from '../redux/replyReducer'
import { useDispatch } from 'react-redux'

function Chat(props) {
    const dispatch = useDispatch()
    const data = props.data
    const reply = data.reply

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
        console.log("E.target.value")
        console.log()
        console.log(props.data)
        const reply = { ...JSON.parse(e.target.id), show: true }
        dispatch({
            type: `${editReply}`,
            payload: {
                data: reply
            }
        })
    }

    return (
        <div style={{ zIndex: '3' }} id={JSON.stringify(data)} onContextMenu={props.renderOptionTab} className={data.sender !== "you" ? styles.leftChat : styles.rightChat}>
            {/* Put The conditions for grp chat later Idiot :D */}
            {reply !== undefined && <>
                <div id={JSON.stringify(data)} onContextMenu={props.renderOptionTab} style={data.sender !== "you" ? leftChatStyles : rightChatStyles} className={styles.replyHolder}>
                    <p id={JSON.stringify(data)} onContextMenu={props.renderOptionTab} style={{ color: data.reply.color, fontSize: "120%" }}>{data.reply.sender}</p>
                    <p id={JSON.stringify(data)} onContextMenu={props.renderOptionTab} >{data.reply.message}</p>
                </div>
            </>}
            {/* Set The Div Box For Reactions and replies later */}

            {false ? <h4 style={{ color: data.color }} >{data.sender !== "you" ? data.sender : ""}</h4> : <></>}
            <p id={JSON.stringify(data)} onContextMenu={props.renderOptionTab}>{data.message}</p>
            <div className={styles.foot}>
                <span>{data.time}</span>
                <span>s</span>
            </div>
        </div>
    )
}

export default Chat
