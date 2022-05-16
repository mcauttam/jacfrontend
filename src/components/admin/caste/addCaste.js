import React, {useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";

const AddCaste=()=>{
    const [caste,setCaste]=useState({
        caste_name:"",caste_description:"",caste_issuedby:"",caste_belongsto_jharkhand:false,
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setCaste({...caste,[eleName]:value});
    }
    let message="";
    let ismessage=false;
    const postCasteDetails=async (e)=>{
        e.preventDefault();
        const {caste_name,description}=caste;
        //check the api call here
        const res=await Axios.post('http://localhost:5100/caste/',{
            caste_name:caste.caste_name,
            caste_description:caste.caste_description,
            caste_issuedby:caste.caste_issuedby,
            caste_belongsto_jharkhand:caste.caste_belongsto_jharkhand
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
            ismessage=true;
            message=res.data.message;
            console.log(res.data);

        });


    }
    return(
        <>
            {/*Check Admin Role Here and return back to home if adequate rights doesn't have by the user*/}
            {/*Todo Code to check the admin Role */}

            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Add New Caste</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-caste">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Caste Name</label>
                                                <input type="text" name="caste_name" className="form-control"
                                                       value={caste.caste_name} onChange={handleInputs}
                                                />
                                            </div>

                                            <div className="col-md-12 ">
                                                <label>Caste Belongs to Jharkhand</label>
                                                <select name="caste_belongsto_jharkhand" className="form-control"
                                                       value={caste.caste_belongsto_jharkhand} onChange={handleInputs}
                                                >
                                                    <option value="false">No</option>
                                                    <option value="true">Yes</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Caste Issued by</label>
                                                <input type="text" name="caste_issuedby" className="form-control"
                                                       value={caste.caste_issuedby} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Description</label>
                                                <textarea name="caste_description" className="form-control"
                                                       value={caste.caste_description} onChange={handleInputs}
                                                />
                                            </div>


                                            <button onClick={postCasteDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div>{ismessage?message:""}</div>
                    </div>
                    <div className="col-md-3">&nbsp;</div>
                </div>
            </div>
        </>
    )
}

export default AddCaste;