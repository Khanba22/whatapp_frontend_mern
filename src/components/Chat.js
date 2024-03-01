import React from 'react'
import styles from "../stylesheets/Chat.module.css"
// import { editReply } from '../redux/replyReducer'
import { useSelector } from 'react-redux'
import blueTick from "../assets/blueTick.png"
// import double from "../assets/icons8-double-tick-30.png"
import single from "../assets/icons8-double-tick-30.png"
import clock from "../assets/clock.png"

function Chat(props) {
    const user = useSelector(state => state.user)
    const data = props.data
    const reply = data.reply
    const reactions = data.reactions
    const src = data.status === "sent" ? single : data.status === "read" ? blueTick : clock;

    const leftChatStyles = data.reply && {
        borderLeft: `5px solid ${data.reply.color}`,
        backgroundColor: "var(--chatBackground2secondary)"
    }
    const rightChatStyles = data.reply && {
        borderLeft: `5px solid ${data.reply.color}`,
        backgroundColor: "var(--chatBackground1secondary)"
    }

    return (
        <>
            <div style={{ zIndex: '3' }} onContextMenu={(e) => { props.renderOptionTab(e, data) }} className={data.sender !== user.username ? styles.leftChat : styles.rightChat}>
                {/* Put The conditions for grp chat later Idiot :D */}
                {reply !== undefined && <>
                    <div style={data.sender !== user.username ? leftChatStyles : rightChatStyles} className={styles.replyHolder}>
                        <p style={{ color: data.reply.color, fontSize: "120%" }}>{data.reply.sender}</p>
                        <p   >{data.reply.message}</p>
                    </div>
                </>}
                {/* Set The Div Box For Reactions and replies later */}
                {false ? <h4 style={{ color: data.color }} >{data.sender !== user.username ? data.sender : ""}</h4> : <></>}
                <p  >{data.message}</p>
                <div className={styles.foot} >
                    <span  >{data.time}</span>
                    <span className={styles.statusIcon} >
                        <img src={src} alt="" />
                    </span>
                </div>

            </div>
            {/* <div className={styles.reaction}>
                    {
                        reactions && reactions.map(reaction=>{
                            return <><p>s</p></>
                        })
                    }
            </div> */}
        </>
    )
}

export default Chat
