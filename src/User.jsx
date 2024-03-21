import React from 'react'
import axios from 'axios'
import './App.css'
import { useEffect,useState } from 'react'
import UserAddress from './UserAddress'


export default function User(props){
  const[allCompleted, setAllCompleted]=useState()
  const [showAddress,setShowAdrees] = useState(false)
  const [name,setName]=useState(props.use.name)
  const [email,setEmail]=useState(props.use.email)
  const [street,setStreet]=useState(props.use.address.street)
  const [city,setCity]=useState(props.use.address.city)
  const [zipcode,setZipcode]=useState(props.use.address.zipcode)
  const [isComponentChose,setIsComponentChose] = useState(false)

  useEffect(()=>{
    allCompited()
  },[])

  useEffect(()=>{
    set()
  },[props.backcolor])

  useEffect(()=>{
    allTasksCompleted(props.idComp)
  },[props.idComp])

  const allCompited=async ()=>{
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${props.use.id}`)
      const tasks=response.data.filter(task=>!task.completed)
      tasks.length==0?setAllCompleted(true):setAllCompleted(false)
  }

  const allTasksCompleted=(id)=>{
    if(props.use.id==id[0]){
      allCompleted?setAllCompleted(false):(id[1]=="allcompleted"?setAllCompleted(true):setAllCompleted(false))
    }
  }

  const set = ()=>{
    setIsComponentChose(false)
  }
  
  const todelete=async()=>{
    props.del(props.use)
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${props.use.id}`)
    console.log(response.data) 
  }

  const update=async()=>{
    const user = props.use
    user.name = name
    user.email = email
    user.address.street = street 
    user.address.city = city
    user.address.zipcode = zipcode
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${props.use.id}`,user)
    console.log(response.data)
    
  }

  const showTasks = ()=>{
    props.restertColor()
    setTimeout(() => {
      setIsComponentChose(!isComponentChose)
    }, 100);
    props.displayTasks(props.use.id)
  }
 
  return (
    <div style={{backgroundColor:isComponentChose?(allCompleted?"lightgreen":"lightsalmon"):"white",color:"black",border:allCompleted?"2px solid green":"2px solid red",marginBottom:8,paddingLeft:7}}>
      <br />
      <span onClick={showTasks}>ID: {props.use.id} </span> <br />
       Name: <input type="text" defaultValue={props.use.name} onChange={e=>setName(e.target.value)}/> <br />
       Email: <input type="text"defaultValue={email} onChange={e=>setEmail(e.target.value)}/> <br /><br />
       <span onMouseOver={()=>setShowAdrees(true)} onClick={()=>setShowAdrees(false)} style={{backgroundColor:"gray", color:"black", fontSize:13, paddingLeft:10, paddingRight:10,  paddingBottom:10, paddingTop:3}}>Other Data</span>
       {showAddress?<UserAddress myaddress={{strt:street,cty:city,zpcod:zipcode}} changecity={setCity} changestreet={setStreet }changezipcode={setZipcode}/>:null}
       <button onClick={update} style={{marginLeft:"130px",verticalAlign:-10,height:"25px",borderRadius:"0",fontSize:14, paddingBottom:23,paddingTop:"3px",backgroundColor: "burlywood",paddingLeft:"15px",paddingRight:"15px", border:"2px solid lightgray"}}>Update</button>
       <button onClick={todelete} style={{marginLeft:"0px",verticalAlign:-10,height:"25px",borderRadius:"0",fontSize:14, paddingBottom:23,paddingTop:"3px",backgroundColor: "burlywood",paddingLeft:"15px",paddingRight:"20px", border:"2px solid lightgray"}}>Delete</button>      
    </div>
  )
}
