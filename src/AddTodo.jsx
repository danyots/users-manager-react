import React, { useState } from 'react'
import axios from 'axios'

export default function AddTodo(props) {
    const [inp,setInp] = useState()
    const [newTodo,setNewTodo]=useState({})
    const [biggestID,setBiggestID]=useState()
    const [firstPull,setFirstPull]=useState(true)

    const getID=async()=>{
        if(firstPull){
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
            const todos = response.data
            setBiggestID(todos[todos.length-1].id)
            setFirstPull(false)
        }
        setBiggestID(biggestID+1)
        return(biggestID)
    }

    const updateTodo=async ()=>{
        const id = await getID()
        setNewTodo({userId:props.userID,id:id,title:inp,completed:false})
        const response = await axios.post(`https://jsonplaceholder.typicode.com/todos`,newTodo)
        props.newTodo({userId:props.userID,id:id,title:inp,completed:false})
        props.add() 
    }

  return (
    <div style={{marginBottom:50}}>
        New Todo - User {props.userID}
        <div style={{marginLeft:50,marginTop:20,width:500,border:"2px solid black"}}>
            <div style={{marginLeft:80,marginRight:20,marginBottom:40,marginTop:60}}>
            Title:
            <input style={{marginLeft:20,border:"1px solid black"}} type="text" onChange={(e)=>setInp(e.target.value)} />
            </div>
            <div style={{display:"inline-flex",marginBottom:5}}>
            <button onClick={props.add} style={{marginRight:5,height:"25px",borderRadius:"0",fontSize:13,paddingTop:"2px",backgroundColor: "burlywood",marginLeft:330,paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}> Cancel </button>
            <button onClick={updateTodo} style={{ height:"25px",borderRadius:"0",fontSize:13,paddingTop:"2px",backgroundColor: "burlywood",float:"right",paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}> Add </button>
            </div>
        </div>
    </div>
  )
}
