import React, {useEffect, useState} from "react";
// import IsAdmin from "../isAdmin";
import Axios from "axios";
import {useHistory} from "react-router-dom";
{/*This module will target to Fee Details*/}


const AddFee=()=>{
    const history=useHistory();
    const [fee,setFee]=useState({});
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setFee({...fee,[eleName]:value});
    }
    const [colleges,setColleges]=useState([]);
    const [streams,setStreams]=useState([]);
    const [castes,setCastes]=useState([]);

    useEffect(()=>{
        if(!colleges || colleges.length === 0){
            getColleges();
            getStreams();
            getCaste();
            // debugger
        }
    });
    const getColleges=async ()=>{
        // console.log(`${process.env.REACT_APP_URI}/college`);
        const res=await Axios.get(`${process.env.REACT_APP_URI}college`);
        // debugger
        const getclg= res.data;
        setColleges(getclg);
        console.log('----', getclg);
        // console.log(colleges);
    }

    const getStreams=async ()=>{
        // console.log(`${process.env.REACT_APP_URI}/college`);
        const res=await Axios.get(`${process.env.REACT_APP_URI}stream`);
        // debugger
        const getclg= res.data;
        setStreams(getclg);
        console.log('----', getclg);
        // console.log(colleges);
    }

    const getCaste=async ()=>{
        // console.log(`${process.env.REACT_APP_URI}/college`);
        const res=await Axios.get(`${process.env.REACT_APP_URI}caste`);
        // debugger
        const getclg= res.data;
        setCastes(getclg);
        console.log('----', getclg);
        // console.log(colleges);
    }

    const postFeeDetails=async (e)=>{
        e.preventDefault();
        //const {fee_name,description}=fee;
        console.log(fee);
        const res=await Axios.post(`${process.env.REACT_APP_URI}admin/set/fee`,{
            feemaster_name:fee.feemaster_name,
            feemaster_amount:fee.feemaster_amount,
            college_id:fee.college_id,
            stream_id:fee.stream_id,
            category_id:fee.category_id,
            description:fee.description
        }).then((res)=>
        {
            console.log(res.data);
            if(!res || res.data.message==="Fee Already has been set"){
                alert("Either the Fee is already exist or something went wrong. Please contact to your administrator.")
                return;
            }
            else{
                history.push("/admin/success/Fee/true");
            }
        });
        console.log(await res);

    }
    return(
        <>
            {/*Check Admin Role Here*/}
            {/*Todo Code to check the admin Role */}

            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Add New Fee</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-fee">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Fee Name</label>
                                                <input type="text" name="feemaster_name" className="form-control"
                                                       value={fee.feemaster_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Fee Amount</label>
                                                <input type="number" name="feemaster_amount" className="form-control"
                                                       value={fee.feemaster_amount} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>College Name</label>
                                                <select  name="college_id" className="form-control"
                                                         onChange={handleInputs} value={fee.college_id}>
                                                    <option value={0}>--Select College--</option>
                                                    {colleges.map(item => {
                                                        console.log(item);
                                                        return <option key={item.college_id} value={item.college_id}> {item.college_name}</option>
                                                    })}
                                                </select>

                                            </div>

                                            <div className="col-md-12 ">
                                                <label>Stream Name</label>
                                                <select  name="stream_id" className="form-control"
                                                         onChange={handleInputs} value={fee.stream_id}>
                                                    <option value={0}>--Select Stream--</option>
                                                    {streams.map(item => {
                                                        console.log(item);
                                                        return <option key={item.stream_id} value={item.stream_id}> {item.stream_name}</option>
                                                    })}
                                                </select>

                                            </div>

                                            <div className="col-md-12 ">
                                                <label>Caste Name</label>
                                                <select  name="caste_id" className="form-control"
                                                         onChange={handleInputs} value={fee.caste_id}>
                                                    <option value={0}>--Select Caste--</option>
                                                    {castes.map(item => {
                                                        console.log(item);
                                                        return <option key={item.caste_id} value={item.caste_id}> {item.caste_name}</option>
                                                    })}
                                                </select>

                                            </div>


                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="description" className="form-control"
                                                           value={fee.description} onChange={handleInputs}
                                                />
                                            </div>
                                            <button onClick={postFeeDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">&nbsp;</div>
                </div>
            </div>
        </>
    )
}

export default AddFee;