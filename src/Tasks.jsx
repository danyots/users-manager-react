import {React, useEffect, useState } from 'react'
import Todos from './Todos'
import Posts from './Posts'
import AddTodo from './AddTodo'
import AddPost from './AddPost'

export default function Tasks(props) {
    
    const [toAddToDo,setToAddToDo]=useState(false)
    const [todoToAdd,setTodoToAdd]=useState({})
    const [toAddPost,setToAddPost]=useState(false)
    const [postToAdd,setPostToAdd]=useState({})
    const [firstPost,setFirstPost]=useState(true)

    


    const addTodo= ()=>{
        setToAddToDo(!toAddToDo)
    }

    const addPost=()=>{
        setToAddPost(!toAddPost)
    }

    const newTodo=(todo)=>{
        setTodoToAdd(todo)
    }
    const newPost=(post)=>{
        console.log(post)
        setPostToAdd(post)
        setFirstPost(false)
    }

  return (
    <div style={{marginTop:70,marginLeft:30}}>
        {toAddToDo?<AddTodo newTodo={newTodo} add={addTodo} userID={props.userID}/>:<Todos newTodo={todoToAdd} idCompleted={props.idCompleted} add={addTodo} userID={props.userID}/>}
        {toAddPost?<AddPost post={firstPost} newPost={newPost} userID={props.userID} add={addPost}/>:<Posts newPost={postToAdd} userID={props.userID} add={addPost}/>}
        
    </div>
  )
}
