import React, {useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";

const AddFee=()=>{
    const [fee,setFee]=useState({
        fee_name:"",description:"",
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setFee({...fee,[eleName]:value});
    }
    const postFeeDetails=async (e)=>{
        e.preventDefault();
        const {fee_name,description}=fee;
        const res=await Axios.post('http://localhost:5100/fee',{
            fee_name:fee.fee_name,
            description:fee.description,
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
                            <div className="card-header"><h4 className="card-title"> Add New Fee</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-fee">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Fee Name</label>
                                                <input type="text" name="fee_name" className="form-control"
                                                       value={fee.fee_name} onChange={handleInputs}
                                                />
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