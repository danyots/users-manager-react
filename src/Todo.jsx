import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Todo(props) {
const [hasCompleted,setHasCompleted]=useState(props.task.completed)
const [task,setTask]=useState(props.task)


const markCompleted=()=>{  
    task.completed = true
    props.task.completed=true
    update()
    props.updateCompleted(task.id)
    setHasCompleted(true) 

}
const update=async()=>{
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`,task)
    console.log(response.data)
}

  return (
    <div style={{marginBottom:20,marginLeft:10,marginRight:10,marginTop:20, border:"3px solid purple",font:"small-caption"}}>
        <div style={{marginTop:10,marginBottom:10,marginRight:5,marginLeft:5}}>
            
        Title:  {task.title} <br />
        </div>
        <div style={{marginBottom:20,marginRight:5,marginLeft:5}}>
        Completed: {`${hasCompleted}`}
        {!hasCompleted?  <button onClick={markCompleted} style={{height:"25px",borderRadius:"0",fontSize:14,paddingTop:"2px",backgroundColor: "burlywood",float:"right",paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray",font:"small-caption"}}> mark completed </button>:null}
        </div>
    </div>
  )
}
