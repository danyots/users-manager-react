import React from 'react'
import axios from 'axios'
import './App.css'
import { useEffect,useState } from 'react'
import User from './User'


export default function Users(props) {
  const [users,setUsers]=useState([])
    const [searchInp,setSearchInp] = useState()
    const [isStart,setIsStart]=useState(true)
    const [colorMark,setColorMark]=useState(true)

    useEffect(()=>{
      getUsers()
    },[])

    useEffect(()=>{
      addUser()
    },[props.newUser])


    const getUsers = async ()=>{
        const response =await axios.get("https://jsonplaceholder.typicode.com/users")
        setUsers(response.data)
    }

    const toDelete=(user)=>{
      const newUsers =  users.filter(use=>use.id !== user.id)
      setUsers(newUsers)
     
    }

    const contains = (user)=>{
      return (user.name?.toLowerCase().includes(searchInp)||user.email?.toLowerCase().includes(searchInp)||isStart)

    }

    const putInp=(e)=>{
      setSearchInp(e.target.value)
      if(isStart) {
        setIsStart(false)
      }
    }

    const changeMark=()=>{
      setColorMark(!colorMark)
    }

    const displayTasks=(id)=>{
      props.displayTasks(id)
    }
    const addUser=()=>{
      if(props.newUser!==0){
        setUsers((prevUsers) => [...prevUsers, props.newUser])
      console.log(users)
      }
      
      
    }
    
  return (
    <div style={{width:"425px",border:"2px solid black",borderRadius:"100px"}}>
      <div style  ={{display:"flex",marginTop:"40px",paddingLeft:"10px",paddingRight:"40px"}}>
        <span style={{marginLeft:"30px",fontSize:15}}>Search</span> 
        <input type="text" onChange={putInp} style={{marginLeft:"20px",fontSize:15}}/> 
        <button onClick={()=>props.displayAddUser()} style={{marginLeft:"20px",height:"25px",borderRadius:"0",fontSize:14,paddingTop:"2px",backgroundColor: "burlywood",display: "flex",paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}> Add </button>
        </div>
        <hr />
        <div style={{marginBottom:"80px", paddingLeft:"10px", paddingRight:"10px"}}>
        {
        users.map(user=>contains(user)?<User idComp={props.idComp} displayTasks={displayTasks} restertColor={changeMark} backcolor = {colorMark} key={user.id} use={user} del={toDelete}/>:null)
        }

        </div>
    </div>
  )
}
