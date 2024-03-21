import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Users from './Users'
import Tasks from './Tasks'
import AddUser from './AddUser'

function App() {
  const [count, setCount] = useState(0)
  const [showTasks,setShowTasks]=useState(false)
  const [idTasks,setIdTasks]=useState()
  const [formerID,setFormerID]=useState(0)
  const [idCompleted,setIdCompleted] = useState([])
  const [showAddUser,setShowAddUser]=useState(false)
  const [newUser,setNewUser]=useState(0)

  const setID=(id)=>{
    setIdTasks(id)
    if(id===formerID){
      setShowTasks(false)
      setFormerID(0)
    }
    else{
      setShowTasks(true)
      setShowAddUser(false)
      setFormerID(id)
    }
  }
    const allCompletedId=(id)=>{
        setIdCompleted(id)
    }
    const addUser = ()=>{
      setShowAddUser(true)
      setShowTasks(false)
    }
    const cancelAddUser=()=>{
      setShowAddUser(false)
    }
    

  return (
    <div style={{display:"inline-flex"}}>
      <Users idComp={idCompleted} newUser={newUser} displayAddUser={addUser} displayTasks={setID} />
      {showTasks?< Tasks userID={idTasks} idCompleted={allCompletedId} />:null}
      {showAddUser?<AddUser newUser={setNewUser} userID={idTasks} cancel={cancelAddUser} />:null}
      
    </div>
      

  )
}

export default App
