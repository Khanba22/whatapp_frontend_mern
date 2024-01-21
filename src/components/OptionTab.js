import React from 'react'
import styles from "../stylesheets/OptionTab.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { editReply } from '../redux/replyReducer'

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

  return (
    <div className={styles.container}>
        <div className={styles.reaction}>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
        <button onClick={showReply}>Reply</button>
        <button>Forward</button>
        <button>Copy</button>
        <button>Star</button>
        <button>Delete</button>
        <button>Select</button>
    </div>
  )
}

export default OptionTab
