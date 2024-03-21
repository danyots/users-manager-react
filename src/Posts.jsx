import React from 'react'
import Post from './Post'
import axios from 'axios'
import { useState,useEffect } from 'react'

export default function Posts(props) {

    const [postsTitles,setPostsTitles]=useState([])

    useEffect(()=>{
        getPosts()
    },[props.userID])



    const getPosts=async()=>{
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${props.userID}`)
        if(response.data.length>0)
        {
            setPostsTitles(response.data)
        }
        else{
            setPostsTitles(["empty"])
        }
        addPost() 
        }

    

    const addPost=()=>{
        if(props.newPost.userId==props.userID){
            if(postsTitles[0]==="empty"){
                
                setPostsTitles([props.newPost])
            }
            else{
                setPostsTitles((prevTodos) => [...prevTodos, props.newPost])
            }
            console.log(postsTitles)
        }
    }

  return (
    <div>
        Posts - User {props.userID}
        <button onClick={()=>props.add()} style={{height:"25px",borderRadius:"0",fontSize:14,paddingTop:"2px",backgroundColor: "burlywood",float:"right",paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}> Add </button>
        <div style={{marginTop:20,border:"2px solid black"}}>
            {
                postsTitles[0]!=="empty"?postsTitles.map(post=><Post key={post.id} task={post}/>):"No Posts Yet"
            }
        </div>
    </div>
  )
}
