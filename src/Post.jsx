import React from 'react'

export default function (props) {
  return (
    <div style={{marginBottom:20,marginLeft:10,marginRight:10,marginTop:20, border:"3px solid purple",font:"small-caption"}}>
        <div style={{display:"inline-flex",marginTop:10,marginBottom:10,marginRight:5,marginLeft:5}}>
            
        Title:  
        <div style={{marginLeft:8}}>
        {props.task.title} 
        </div>
        <br />
        </div>
        <div style={{display:"inline-flex",marginBottom:20,marginRight:5,marginLeft:5}}>
        Body:
        <div style={{marginLeft:5}}>
        {props.task.body}
        </div>
        
        </div>
    </div>
  )
}
