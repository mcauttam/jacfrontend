import React, {useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";

const AddSubjectType=()=>{
    const [subjectType,setSubjectType]=useState({
        subjectType_name:"",description:"",
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setSubjectType({...subjectType,[eleName]:value});
    }
    const postSubjectTypeDetails=async (e)=>{
        e.preventDefault();
        const {subjectType_name,description}=subjectType;
        const res=await Axios.post('http://localhost:5100/subjectType',{
            subjectType_name:subjectType.subjectType_name,
            description:subjectType.description,
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
            {/*Check Admin Role Here and return back to home if adequate rights doesn't have by the user*/}
            {/*Todo Code to check the admin Role */}

            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Add New SubjectType</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-subjectType">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>SubjectType Name</label>
                                                <input type="text" name="subjectType_name" className="form-control"
                                                       value={subjectType.subjectType_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="description" className="form-control"
                                                           value={subjectType.description} onChange={handleInputs}
                                                />
                                            </div>

                                            <button onClick={postSubjectTypeDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default AddSubjectType;