import React, {useEffect, useState} from "react";
// import IsAdmin from "../isAdmin";
import Axios from "axios";
import {useHistory} from "react-router-dom";
{/*This module will target to RegistrationFee Details*/}
{/*This module target to RegistrationFee Model.
* 1. Every College decide their own registration fee.
* 2. If any college denied to apply reg fee. set it to 0.
* 3. Student has paid or not paid the fee is decided by the balanced fee.*/}
const AddRegistrationFee=()=>{
    const history=useHistory();
    const [registrationfee,setRegistrationFee]=useState({});
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setRegistrationFee({...registrationfee,[eleName]:value});
    }
    const [colleges,setColleges]=useState([]);
    const [streams,setStreams]=useState([]);

    useEffect(()=>{
        if(!colleges || colleges.length === 0){
            getColleges();
            getStreams();
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


    const postRegistrationFeeDetails=async (e)=>{
        e.preventDefault();
        //const {registrationfee_name,description}=registrationfee;
        console.log(registrationfee);
        const res=await Axios.post(`${process.env.REACT_APP_URI}admin/set/regfee`,{
            paymentmaster_name:registrationfee.paymentmaster_name,
            paymentmaster_amount:registrationfee.paymentmaster_amount,
            college_id:registrationfee.college_id,
            stream_id:registrationfee.stream_id,
            description:registrationfee.description
        }).then((res)=>
        {
            console.log(res.data);
            if(!res || res.data.message==="Fee Already has been set"){
                alert("Either the Fee is already exist or something went wrong. Please contact to your administrator.")
                return;
            }
            else{
                history.push("/admin/success/Prospectus Fee/true");
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
                            <div className="card-header"><h4 className="card-title"> Add New RegistrationFee</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-registrationfee">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Propectus Fee Name</label>
                                                <input type="text" name="paymentmaster_name" className="form-control"
                                                       value={registrationfee.paymentmaster_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Fee Amount</label>
                                                <input type="number" name="paymentmaster_amount" className="form-control"
                                                       value={registrationfee.paymentmaster_amount} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>College Name</label>
                                                <select  name="college_id" className="form-control"
                                                         onChange={handleInputs} value={registrationfee.college_id}>
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
                                                         onChange={handleInputs} value={registrationfee.stream_id}>
                                                    <option value={0}>--Select Stream--</option>
                                                    {streams.map(item => {
                                                        console.log(item);
                                                        return <option key={item.stream_id} value={item.stream_id}> {item.stream_name}</option>
                                                    })}
                                                </select>

                                            </div>

                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="description" className="form-control"
                                                           value={registrationfee.description} onChange={handleInputs}
                                                />
                                            </div>
                                            <button onClick={postRegistrationFeeDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default AddRegistrationFee;
