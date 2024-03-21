import React, { useState } from 'react'
import axios from 'axios'

export default function AddTodo(props) {
    const [inpTitle,setInpTitle] = useState()
    const [inpBody,setInpBody] = useState()
    const [newPost,setNewPost]=useState({})
    const [biggestID,setBiggestID]=useState(0 )
    const [firstPull,setFirstPull]=useState(true)
    

    const getID=async()=>{
        if(props.post){
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
            const todos = response.data
            const ID = todos[todos.length-1].id
            setBiggestID(ID)
            console.log("ghujk")
            
        }
        setBiggestID((prevID)=>prevID+1)
        console.log(biggestID)
        return(biggestID)
    }

    const updatePost=async ()=>{
        let id = await getID()
        console.log(biggestID)
        setNewPost({userId:props.userID,id:id,title:inpTitle,body:inpBody})
        const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,newPost)
        console.log(response.data)
        props.newPost({userId:props.userID,id:id,title:inpTitle,body:inpBody})
        props.add() 
    }

  return (
    <div style={{marginBottom:50}}>
        New Post - User {props.userID}
        <div style={{marginLeft:50,marginTop:20,width:500,border:"2px solid black"}}>
            <div style={{marginLeft:80,marginRight:20,marginBottom:40,marginTop:60}}>
            Title:
            <input defaultValue={"Some Title"} style={{marginLeft:20,border:"1px solid black"}} type="text" onChange={(e)=>setInpTitle(e.target.value)} />
            <br /><br />
            Body:
            <input defaultValue={"Some Body"}  style={{marginTop:1,marginLeft:13,border:"1px solid black"}} type="text" onChange={(e)=>setInpBody(e.target.value)} />
            </div>
            <div style={{display:"inline-flex",marginBottom:5}}>
            <button onClick={()=>props.add()} style={{marginRight:5,height:"25px",borderRadius:"0",fontSize:13,paddingTop:"2px",backgroundColor: "burlywood",marginLeft:330,paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}> Cancel </button>
            <button onClick={updatePost} style={{ height:"25px",borderRadius:"0",fontSize:13,paddingTop:"2px",backgroundColor: "burlywood",float:"right",paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}> Add </button>
            </div>
        </div>
    </div>
  )
}

