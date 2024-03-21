import React from 'react'

export default function UserAddress(props) {
  return (
    <div style={{verticalAlign:"middle", marginTop:25,marginBottom:25,paddingTop:25,paddingLeft:25,borderRadius:30,paddingBottom:25,border:"1px solid black",width:300}}>
        Street: <input type="text" onChange={e=>props.changestreet(e.target.value)} defaultValue={props.myaddress.strt} /><br />
        City: <input type="text" onChange={e=>props.changecity(e.target.value)} defaultValue={props.myaddress.cty} /><br />
        Zip Code: <input type="text" onChange={e=>props.changezipcode(e.target.value)} defaultValue={props.myaddress.zpcod} /><br />
    </div>
  )
}
