import React, {useEffect, useState} from "react";
import Axios from "axios";
import {ReactSession} from "react-client-session";
import {Redirect} from "react-router-dom";
// import {useState} from "react";

const ConvFeePayment=()=>{
    ReactSession.setStoreType("localStorage");
    const [convFee,setConvFee]=useState(0); //State to define the Conv. Fee
    const [isConvFeePaid,setIsConvFeePaid]=useState(false); //Whether Fe is paid or not

    useEffect(()=>{
        ConvFeeStatus();
        // setConvFee(50);
    },[]);
    const displayMessage=()=> {
        console.log("Convenience Fee Payment Module the fee is: ", convFee);
    }

    const ConvFeeStatus=async ()=>{

        const student_email=ReactSession.get("student_email");
        const Student=await Axios.get(`${process.env.REACT_APP_URI}student/${student_email}`);
        // alert(Student.data.student_id);
        // const
        const getFeeStatus=await Axios.get(`${process.env.REACT_APP_URI}fee/conv/status/${ReactSession.get("student_id")}`)
        // console.log("Declared Fee is paid or not",getFeeStatus);
        setIsConvFeePaid(getFeeStatus.data.isConvPaid)
        // console.log(isConvFeePaid);
    }
    return(
        <>
            {
                isConvFeePaid?
                    <Redirect to="/student/dashboard">Redirect to Dashboard</Redirect>:
                    <button onClick={ConvFeeStatus}>Button</button>
            }


        </>
    )
}

export default ConvFeePayment;