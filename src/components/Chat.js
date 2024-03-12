import styles from "../stylesheets/Chat.module.css"
import { useSelector } from 'react-redux'
import blueTick from "../assets/blueTick.png"
// import double from "../assets/icons8-double-tick-30.png"
import single from "../assets/icons8-double-tick-30.png"
import clock from "../assets/clock.png"
const ReactionArray = (props) => {
    const reactionOBJ = props.reactionOBJ

    return (
        <p onClick={props.removeReaction}>{reactionOBJ !== undefined && Object.keys(reactionOBJ).map(key=>{
            return reactionOBJ[key]
        })}</p>
    )
}

function Chat(props) {
    const user = useSelector(state => state.user)
    const data = props.data
    const reply = data.reply
    const src = data.status === "sent" ? single : data.status === "read" ? blueTick : clock;

    const reactionArr = data.reactions ? Object.keys(data.reactions):[]
    const nullKeyCount = reactionArr.filter(key=>data.reactions[key] !== null).length

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
            <div style={ nullKeyCount === 0 ? { zIndex: '3' } : { zIndex: '3' ,marginBottom:"20px"}} onContextMenu={(e) => { props.renderOptionTab(e, data) }} className={data.sender !== user.username ? styles.leftChat : styles.rightChat}>
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
                    <span>{data.time.split(",")[1] !== undefined ? data.time.split(",")[1] : data.time}</span>
                    {data.sender === user.username ? <span className={styles.statusIcon} >
                        <img src={src} alt="" />
                    </span>
                        : <></>}

                </div>
                {nullKeyCount!== 0 && data.reactions&&<div className={styles.reaction} style={data.sender === user.username ? {} : {}}>
                    <ReactionArray removeReaction = {props.removeReaction}  reactionOBJ={data.reactions} />
                </div>}
            </div>
        </>
    )
}

export default Chat
