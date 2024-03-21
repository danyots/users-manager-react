    import React, { useEffect, useState } from 'react'
    import Todo from './Todo'
    import axios from 'axios'

    export default function Todos(props) {

        const [todosTitles,setTodosTitles]=useState([])

        

        useEffect(()=>{
            getTitles()
        },[props.userID])


        const getTitles=async()=>{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${props.userID}`)
            if(response.data.length>0)
            {
                setTodosTitles(response.data)
            }
            else{
                setTodosTitles(["empty"])
            }

            addTodo(props.newTodo)
            }

            const addTodo=(todo)=>{
                if(todo.userId==props.userID){
                    if(todosTitles[0]!=="empty"){
                        setTodosTitles((prevTodos) => [...prevTodos, todo])  
                    }
                    else{
                        setTodosTitles([todo])
                    }
                    props.idCompleted([props.userID,"todoadded"])
                }
                
            }

        const markCompleted=(id)=>{
            todosTitles.forEach(todo=>todo.id==id?todo.completed=true:null)
            if(todosTitles.filter(todo=>todo.completed==false).length===0){
                props.idCompleted([props.userID,"allcompleted"])
            }
        }

    return (
        <div style={{marginBottom:50}}>
            Todos - User {props.userID} 
            <button onClick={props.add} style={{height:"25px",borderRadius:"0",fontSize:14,paddingTop:"2px",backgroundColor: "burlywood",float:"right",paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}> Add </button>
            <div style={{marginTop:20,border:"2px solid black"}}>
                {console.log(todosTitles)}
                {   
                   todosTitles[0]!=="empty"?todosTitles.map(todo=><Todo key={todo.id} updateCompleted={markCompleted} task={todo}/>):"No Todos Yet"
                }
                
            </div>
        </div>
    )
    }
