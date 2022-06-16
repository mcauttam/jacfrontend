import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {ReactSession} from "react-client-session";
import {Container,Row,Col,Form,FormLabel,FormControl, Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import ArrowHeader from "../arrowHeader";
// import {useState} from "react";

const ConvFeePayment=(props)=>{
    ReactSession.setStoreType("localStorage");
    const history=useHistory();
    useEffect(()=>{
        generateTxnID();
        convPayment();
        getDetails();
    },[]);

    const [student_id,setStudent_ID]=useState(props.match.params.stid);
    // const [stream_id,setStream_ID]=useState(props.match.params.strid);
    const [college_id,setCollege_ID]=useState(props.match.params.clgid);
    const [feePayable,setFeePayable]=useState(0);
    const [feeDetails,setFeeDetails]=useState({
        student_name:"",college_name:"",stream_name:""
    })

    const getDetails=async ()=>{
        const student=await Axios.get(`${process.env.REACT_APP_URI}student/byid/${student_id}`);
        const college=await Axios.get(`${process.env.REACT_APP_URI}college/${college_id}`);
        // const stream=await Axios.get(`${process.env.REACT_APP_URI}stream/${stream_id}`);
        const obj={
            student_name:student.data.student_name,college_name:college.data.college_name,
            student_mobile:student.data.student_mobile,
            student_email:student.data.student_email
        }
        // ReactSession.set("student_name",obj.student_name);
        ReactSession.set("student_name",obj.student_name);
        ReactSession.set("student_mobile",obj.student_mobile);
        ReactSession.set("student_email",obj.student_email);
        console.log(obj);
        setFeeDetails(obj);

    }
    const convPayment=async ()=>{
        const student_id=props.match.params.stid;
        // const stream_id=props.match.params.strid;
        const college_id=props.match.params.clgid;
        //get Fee Details and shown payment button
        const feeDetails=await Axios.get(`${process.env.REACT_APP_URI}fee/conv/pay/${college_id}`)
            .then((res)=>{
                console.log(res.data);
                ReactSession.set("amount_paid",res.data.conveniencefeemaster_amount);
                ReactSession.set("conveniencefeemaster_id",res.data.conveniencefeemaster_id);
                setFeePayable(res.data.conveniencefeemaster_amount);
                ReactSession.set("amount_bal",res.data.conveniencefeemaster_amount-ReactSession.get("amount_paid"));
            }).catch(err=>{
                console.log(err.message);
            });



    }

    const generateTxnID=async ()=>{
        const txnid1=await Axios.get(`${process.env.REACT_APP_URI}fee/conv/id`).then((res)=>{
            console.log(res.data)
            let id=res.data.id+1;
            // setTxnId("reg_"+id);
            ReactSession.set("txnid",id)
        });

    }
    const redirectToPay=(e)=>{
        history.push("/payu/make/payment/conv");
    }


    return(
        <>
            <ArrowHeader form="pay"  />
            <div className="container text-lg-center mt-4">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Applied College Name</th>
                        <th>Fee Paid to be</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{feeDetails.student_name}</td>
                        <td>{feeDetails.college_name}</td>
                        <td>{feePayable}</td>
                    </tr>
                    </tbody>
                </table>
                <button className="btn btn-sm btn-primary mt-4" onClick={(e)=>redirectToPay(e)}>Confirm to pay {feePayable}</button>
            </div>
        </>
    )
}

export default ConvFeePayment;