import React, {useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";
import {useHistory} from "react-router-dom";

const AddStream=()=>{
    const history=useHistory();
    const [stream,setStream]=useState({
        stream_name:"",description:"",
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setStream({...stream,[eleName]:value});
    }
    const postStreamDetails=async (e)=>{
        e.preventDefault();
        const {stream_name,description}=stream;
        const res=await Axios.post(`${process.env.REACT_APP_URI}stream`,{
            stream_name:stream.stream_name,
            description:stream.description,
        },{

            headers:{
                "Content-Type":"application/json",
            },
            // body:JSON.stringify({
            //     student_name,student_fathername,student_dob,student_gender,
            //     student_mobile,student_email,student_batch
            // })
        }).then((res)=>
        {
            console.log(res.data);
            if(!res){
                alert("Either the Stream is already exist or something went wrong. Please contact to your administrator.")
                return;
            }
            else{
                history.push("/admin/success/Stream/true");
            }
        });


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
                            <div className="card-header"><h4 className="card-title"> Add New Stream</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-stream">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Stream Name</label>
                                                <input type="text" name="stream_name" className="form-control"
                                                       value={stream.stream_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="description" className="form-control"
                                                           value={stream.description} onChange={handleInputs}
                                                />
                                            </div>

                                            <button onClick={postStreamDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default AddStream;