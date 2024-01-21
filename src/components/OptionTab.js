import React from 'react'
import styles from "../stylesheets/OptionTab.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { editReply } from '../redux/replyReducer'
import copy from "../assets/copy.png"
import forward from "../assets/forwardIcon.png"
import replyImg from "../assets/replyIcon.png"
import save from "../assets/save.png"
import star from "../assets/star.png"
import trash from "../assets/trash.png";
import checkBox from "../assets/checkbox.png"


function OptionTab() {
  const dispatch = useDispatch()
  const reply  = useSelector(state=>state.reply)
  const showReply = () => {
    dispatch({
      type: `${editReply}`,
      payload: {
        data: { ...reply,show: true }
      }
    })
    document.getElementById("writingSection").focus()
  }

  const deleteChat = ()=>{
    
  }

  return (
    <div className={styles.container}>
        <div className={styles.reaction}>
          <button><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f44d.png" alt="" /></button>
          <button><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2764-fe0f.png" alt="" /></button>
          <button><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f602.png" alt="" /></button>
          <button><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f62e.png" alt="" /></button>
          <button><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f622.png" alt="" /></button>
          <button><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f64f.png" alt="" /></button>
          <button><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2795.png" alt="" /></button>
        </div>
        <button className={styles.buttons} onClick={showReply}><img src={replyImg} alt="" /> Reply</button>
        <button className={styles.buttons}  onClick={()=>{navigator.clipboard.writeText(reply.message)}}><img src={copy} alt="" />Copy</button>
        <button className={styles.buttons} ><img src={save} alt="" />Save As..</button>
        <button className={styles.buttons} ><img src={forward} alt="" />Forward</button>
        
        <button className={styles.buttons} ><img src={star} alt="" />Star</button>
        <button className={styles.buttons}  onClick={deleteChat}><img src={trash} alt="" /> Delete</button>
        <button className={styles.buttons} ><img src={checkBox} alt="" />Select</button>
    </div>
  )
}

export default OptionTab
