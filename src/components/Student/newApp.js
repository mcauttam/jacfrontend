import React, { useState} from "react";
import {useHistory} from "react-router";
import Axios from "axios";
// import {useHistory} from "react-router";
// import {withRouter} from "react-router-dom";

const NewApp=props=>{
    const [student,setStudent]=useState({
        student_name:"",student_fathername:"",student_dob:"",student_gender:"",
        student_mobile:"",student_email:"",student_batch:"",
    });
    //let errorsObj={stduent_email:'',student_password:''};
    //const [errors,setErrors]=useState(errorsObj);

    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setStudent({...student,[eleName]:value});
    }

    const postStudentBasic=async (e)=>{
        e.preventDefault();
        const {student_name,student_fatherName,student_dob,student_gender,
            student_mobile,student_email,student_batch}=student;
        const res=await Axios.post('http://localhost:5100/student/basic',{
            student_name:student.student_name,
            student_fatherName:student.student_fatherName,
            student_dob:student.student_dob,
            student_gender:student.student_gender,
            student_mobile:student.student_mobile,
            student_email:student.student_email,
            student_batch:student.student_batch,
            student_password:" ",
        },{

            headers:{
                "Content-Type":"application/json",
            },
            // body:JSON.stringify({
            //     student_name,student_fathername,student_dob,student_gender,
            //     student_mobile,student_email,student_batch
            // })
        }).then(()=>
        {
            console.log(res.data);
        });
        const response=await res.json();
        if(!response || response.status>=400){
            alert("Please check the form again");
        }else{
            alert("Registration Successful");
        }

    }
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> New Student Registration</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-studentbasic">
                                    <div className="row">
                                        <div className="col-md-12 ">
                                            <label>Student Name</label>
                                            <input type="text" name="student_name" className="form-control"
                                            value={student.student_name} onChange={handleInputs}
                                            />
                                        </div>
                                        <div className="col-md-12 ">
                                            <label className="mt-3">Father's Name</label>
                                            <input type="text" name="student_fatherName" className="form-control"
                                                   value={student.student_fatherName} onChange={handleInputs}
                                            />
                                        </div>
                                        <div className="col-md-6 ">
                                            <label className="mt-3">Date of Birth</label>
                                            <input type="date" name="student_dob" className="form-control"
                                                   value={student.student_dob} onChange={handleInputs}
                                            />
                                        </div>
                                        <div className="col-md-6 ">
                                            <label className="mt-3">Gender</label>
                                            <input type="text" name="student_gender" className="form-control"
                                                   value={student.student_gender} onChange={handleInputs}
                                            />
                                        </div>
                                        <div className="col-md-6 ">
                                            <label className="mt-3">Mobile No.</label>
                                            <input type="text" name="student_mobile" className="form-control"
                                                   value={student.student_mobile} onChange={handleInputs}
                                            />
                                        </div>
                                        <div className="col-md-6 ">
                                            <label className="mt-3">Session/Batch</label>
                                            <input type="number" name="student_batch" className="form-control"
                                                   value={student.student_batch} onChange={handleInputs}
                                            />
                                        </div>
                                        <div className="col-md-12 ">
                                            <label className="mt-3">Email ID</label>
                                            <input type="email" name="student_email" className="form-control"
                                                   value={student.student_email} onChange={handleInputs}
                                            />
                                        </div>
                                            <button onClick={postStudentBasic} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default NewApp;