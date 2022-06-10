import React, {useState} from 'react';
import 'bootstrap-steps/dist/bootstrap-steps.min.css';
import StudentBasicRegistration from "../studentBasicRegistration";
import NewApp from "../newApp";
import Login from "../login";
const RegistrationForm=()=>{
    // Vanilla JavaScript
    const [step,setStep]=useState(1);
    return(
        <>
            {
                step===1?<NewApp/>:step===2?<StudentBasicRegistration/>:<Login/>
            }
        </>
    )
}

export default  RegistrationForm;