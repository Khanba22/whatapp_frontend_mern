import React, { useState } from 'react'

function Temp() {

  const [color,setColor] = useState("white")
  const [text,setText] = useState("")

  // Changes Background
  function backChange(){
      setColor(text)
  }

  return (
    <>
      <div style={{backgroundColor:color , height:"200px",width:"200px"}}>
      
      </div>
      <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}} />
      <button onClick={backChange}>Change Colors</button>
    </>
  )
}

export default Temp
