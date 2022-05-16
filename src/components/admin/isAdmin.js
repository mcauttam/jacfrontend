import React, {useState} from "react";
const IsAdmin=(props)=>{
    let [admin,setAdmin]=useState({IsAdmin:false,Role:"student"});
    return(
        props.IsAuth={admin}
    )
}
export default IsAdmin;