import React, {useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";

const AddSubject=()=>{
    const [subject,setSubject]=useState({
        subject_name:"",subject_code:"",subjecttype_id:0,
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setSubject({...subject,[eleName]:value});
    }
    let message="";
    let ismessage=false;
    const postSubjectDetails=async (e)=>{
        e.preventDefault();
        const {subject_name,description}=subject;
        //check the api call here
        const res=await Axios.post('http://localhost:5100/subject/',{
            subject_name:subject.subject_name,
            subject_code:subject.subject_code,
            subjecttype_id:subject.subjecttype_id
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
                            <div className="card-header"><h4 className="card-title"> Add New Subject</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-subject">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Subject Code</label>
                                                <input type="text" name="subject_code" className="form-control"
                                                       value={subject.subject_code} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Subject Name</label>
                                                <input type="text" name="subject_name" className="form-control"
                                                       value={subject.subject_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <select name="subjecttype_id" onChange={handleInputs} className="form-control">
                                                    <option value="0">--select subject type--</option>
                                                    {/*This is hard coded list of Subject type:
                                                     Need to write code here to fetch the list of subjecttype from DB*/}
                                                    <option value="1">Core Subject</option>
                                                </select>
                                            </div>

                                            <button onClick={postSubjectDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default AddSubject;