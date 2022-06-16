import React, { useState} from "react";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {ReactSession} from "react-client-session";
import ArrowHeader from "./arrowHeader";
// import {useHistory} from "react-router";
// import {withRouter} from "react-router-dom";

const NewApp=props=>{
    const history=useHistory();
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
        var response={};
        e.preventDefault();
        const {student_name,student_fatherName,student_dob,student_gender,
            student_mobile,student_email,student_batch}=student;
        const res=await Axios.post(`${process.env.REACT_APP_URI}student/basic`,{
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
        }).then((res)=>
        {
            response=res.data;
             console.log(res);
            ReactSession.setStoreType("localStorage");
            ReactSession.set("session_status","Active");
            ReactSession.set("session_role","Student");
            ReactSession.set("student_email",student.student_email);
        });

        if(!response || response.status>=400){
            console.log(response);
            alert("Please check the form again");
        }else{

           history.push("/student/dashboard");
            alert("Registration Successful");
        }

    }
    return(
        <>
            <ArrowHeader form="basic"  />
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
                                            <select name="student_gender" className="form-control"
                                                   value={student.student_gender} onChange={handleInputs}
                                            >
                                                <option value="0">--select gender--</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Transgender">Transgender</option>
                                            </select>

                                        </div>
                                        <div className="col-md-6 ">
                                            <label className="mt-3">Mobile No.</label>
                                            <input type="text" name="student_mobile" className="form-control"
                                                   value={student.student_mobile} onChange={handleInputs}
                                            />
                                        </div>

                                        <div className="col-md-6 ">
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