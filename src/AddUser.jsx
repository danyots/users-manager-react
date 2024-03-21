import React, { useState } from 'react'
import axios from 'axios'

export default function AddUser(props) {

    const [inpName,setInpName]=useState()
    const [inpEmail,setInpEmail]=useState()
    const [biggestID,setBiggestID]=useState()
    const [newUser,setNewUser]=useState()
    

    const cancel=()=>{
        props.cancel()
    }
    const getID=async()=>{
        if(props.post){
            const response = await axios.get("https://jsonplaceholder.typicode.com/users")
            const todos = response.data
            const ID = todos[todos.length-1].id
            setBiggestID(ID)
            console.log("ghujk")
            
        }
        setBiggestID((prevID)=>prevID+1)
        console.log(biggestID)
        return(biggestID)
    }

    const updateUser=async ()=>{
        const id = await getID()
        console.log(biggestID)
        setNewUser({id:id,name:inpName,email:inpEmail,address:{street:"",city:"",zipcode:""}})
        const response = await axios.post(`https://jsonplaceholder.typicode.com/users`,newUser)
        console.log(response.data)
        props.newUser({id:id,name:inpName,email:inpEmail,address:{street:"",city:"",zipcode:""}})
        props.cancel() 
    }


  return (
    <div style={{marginBottom:50,marginTop:100}}>
        <div style={{marginLeft:50}}>
        Add New User
        </div>
        <br />x
        <div style={{marginLeft:50,width:500,border:"2px solid black"}}>
            <div style={{marginLeft:80,marginRight:20,marginBottom:40,marginTop:60}}>
            Name:
            <input defaultValue={"Some Name"} style={{marginLeft:20,border:"1px solid black"}} type="text" onChange={(e)=>setInpName(e.target.value)} />
            <br /><br />
            Email:
            <input defaultValue={"Some Email"}  style={{marginTop:1,marginLeft:13,border:"1px solid black"}} type="text" onChange={(e)=>setInpEmail(e.target.value)} />
            </div>
            <div style={{display:"inline-flex",marginBottom:5}}>
            <button onClick={cancel} style={{marginRight:5,height:"25px",borderRadius:"0",fontSize:13,paddingTop:"2px",backgroundColor: "burlywood",marginLeft:330,paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}> Cancel </button>
            <button onClick={updateUser} style={{ height:"25px",borderRadius:"0",fontSize:13,paddingTop:"2px",backgroundColor: "burlywood",float:"right",paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}> Add </button>
            </div>
        </div>
    </div>
  )
}
