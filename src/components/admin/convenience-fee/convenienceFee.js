import React, {useState} from "react";
// import IsAdmin from "../isAdmin";
import Axios from "axios";
{/*This module will target to ConvenienceFee Details*/}



const AddConvenienceFee=()=>{
    const [conveniencefee,setConvenienceFee]=useState({
        conveniencefee_name:"",description:""
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setConvenienceFee({...conveniencefee,[eleName]:value});
    }
    const postConvenienceFeeDetails=async (e)=>{
        e.preventDefault();
        const {conveniencefee_name,description}=conveniencefee;
        const res=await Axios.post('http://localhost:5100/conveniencefee',{
            conveniencefee_name:conveniencefee.conveniencefee_name,
            description:conveniencefee.description,
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
                            <div className="card-header"><h4 className="card-title"> Add New ConvenienceFee</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-conveniencefee">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>ConvenienceFee Name</label>
                                                <input type="text" name="conveniencefee_name" className="form-control"
                                                       value={conveniencefee.conveniencefee_name} onChange={handleInputs}
                                                />
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