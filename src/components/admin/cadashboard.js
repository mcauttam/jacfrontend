import React, {useEffect, useState} from 'react';
import {ReactSession} from "react-client-session";
import Axios from "axios";

const CollegeAdmin=()=>{
    //count number of Applicants for Arts in Selected College
    const [collegeid,setCollegeID]=useState(ReactSession.get("college_id"));
    const [countarts,setCountArts]=useState(0);
    useEffect(()=>{
        Arts();
        SM();
        SB();
        Total();
        Comm();
    },[])
    const Arts=async ()=>{
        const getCounts=await Axios.get(`${process.env.REACT_APP_URI}admin/get/count/${collegeid}/2`);
        setCountArts(getCounts.data.count);
    }

    //count number of Applicants for Science Math in Selected College
    const [countsm,setCountSM]=useState(0);
    const SM=async ()=>{
        const getCounts=await Axios.get(`${process.env.REACT_APP_URI}admin/get/count/${collegeid}/2`);
        setCountSM(getCounts.data.count);
    }
    //count number of Applicants for Science Biology in Selected College
    const [countsb,setCountSB]=useState(0);
    const SB=async ()=>{
        const getCounts=await Axios.get(`${process.env.REACT_APP_URI}admin/get/count/${collegeid}/2`);
        setCountSB(getCounts.data.count);
    }
    //Total number of Applicants for Commerce in Selected College
    const [countcomm,setCountComm]=useState(0);
    const Comm=async ()=>{
        const getCounts=await Axios.get(`${process.env.REACT_APP_URI}admin/get/count/${collegeid}/2`);
        setCountComm(getCounts.data.count);
    }

    //Total number of Applications in all courses
    const [count,setCounts]=useState(0);
    const Total=async ()=>{
        const getCounts=await Axios.get(`${process.env.REACT_APP_URI}admin/get/allcount/${collegeid}`);
        setCounts(getCounts.data.count);
    }

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 bg-success text-light text-center rounded-3 mx-3">
                        <p></p>
                        <h1 >Total Applied</h1>
                        <i className="fa fa-graduation-cap fa-2x" aria-hidden="true"></i>
                        <h1 className=" text-light fw-bold">{count}</h1>
                        <p></p>
                    </div>
                    <div className="col-md-3 bg-warning text-center rounded-3 m-3">
                        <p></p>
                        <h6 >Applied in Arts</h6>
                        <i className="fa fa-graduation-cap fa-2x" aria-hidden="true"></i>
                        <h1 className=" text-light fw-bold">{countarts}</h1>
                        <p></p>
                    </div>
                    <div className="col-md-3 bg-primary text-light text-center rounded-3 m-3">
                        <p></p>
                        <h6 >Applied in Science with Maths</h6>
                        <i className="fa fa-graduation-cap fa-2x" aria-hidden="true"></i>
                        <h1 className=" text-light fw-bold">{countsm}</h1>
                        <p></p>
                    </div>
                    <div className="col-md-3 bg-secondary text-light text-center rounded-3 m-3">
                        <p></p>
                        <h6 >Applied in Science with Biology</h6>
                        <i className="fa fa-graduation-cap fa-2x" aria-hidden="true"></i>
                        <h1 className=" text-light fw-bold">{countsb}</h1>
                        <p></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CollegeAdmin;