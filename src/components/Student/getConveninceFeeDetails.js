import React, {useState} from 'react';
import Axios from 'axios';
import ReactSession from 'react-client-session';
{/*Logic to find the conv fee details, it returns true if fee is paid, otherwise false*/}
const getConvenienceFeeDetails=()=>{
    [convFeePaid,setConvFeePaid]=useState({paid:false,paidAmount:0});
    [studentID,setStudentID]=useState(ReactSession.get("student_id"));
    const getStudent=()=>{
        const student=Axios.get(''); {/*get student Details as per given student ID*/}
    }
    const getConvFeePaidDetails=()=>{
        {/*get convenience fee details*/}
        const convFee=Axios.get(''); {/*API to get details*/}
    }

}

export default getConvenienceFeeDetails;