import React, {useEffect, useState} from "react";
// import IsAdmin from "../isAdmin";
import Axios from "axios";
import {useHistory} from "react-router-dom";
{/*This module will target to ConvenienceFee Details*/}



const AddConvenienceFee=()=>{
    const history=useHistory();
    const [conveniencefee,setConvenienceFee]=useState({});
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setConvenienceFee({...conveniencefee,[eleName]:value});
    }
    const [colleges,setColleges]=useState([]);
    useEffect(()=>{
        if(!colleges || colleges.length === 0){
            getColleges();
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


    const postConvenienceFeeDetails=async (e)=>{
        e.preventDefault();
        //const {conveniencefee_name,description}=conveniencefee;
        const res=await Axios.post(`${process.env.REACT_APP_URI}admin/set/convfee`,{
            conveniencefeemaster_name:conveniencefee.conveniencefeemaster_name,
            conveniencefeemaster_amount:conveniencefee.conveniencefeemaster_amount,
            college_id:conveniencefee.college_id,
            description:conveniencefee.description
        }).then((res)=>
        {
            console.log(res.data);
            if(!res || res.data.message==="Fee Already has been set"){
                alert("Either the Fee is already exist or something went wrong. Please contact to your administrator.")
                return;
            }
            else{
                history.push("/admin/success/Conv. Fee/true");
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
                            <div className="card-header"><h4 className="card-title"> Add New ConvenienceFee</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-conveniencefee">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>ConvenienceFee Name</label>
                                                <input type="text" name="conveniencefeemaster_name" className="form-control"
                                                       value={conveniencefee.conveniencefeemaster_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Fee Amount</label>
                                                <input type="number" name="conveniencefeemaster_amount" className="form-control"
                                                       value={conveniencefee.conveniencefeemaster_amount} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>College Name</label>
                                                <select  name="college_id" className="form-control"
                                                         onChange={handleInputs} value={conveniencefee.college_id}>
                                                    {colleges.map(item => {
                                                        console.log(item);
                                                        return <option key={item.college_id} value={item.college_id}> {item.college_name}</option>
                                                    })}
                                                </select>

                                            </div>

                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="description" className="form-control"
                                                           value={conveniencefee.description} onChange={handleInputs}
                                                />
                                            </div>
                                            <button onClick={postConvenienceFeeDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default AddConvenienceFee;