import React, { useState} from "react";
// import {useHistory} from "react-router";
import Axios from "axios";
import {Link, Redirect, useHistory} from "react-router-dom";
// import {withRouter} from "react-router-dom";

const StudentDashboard=props=>{
    const [convFeePaid,setconvFeePaid]=useState(false);
    const [regFeePaid,setRegFeePaid]=useState(false);
    //Logic to check CovFeePaid or Not

    //Logic to check RegistrationFee Paid of not

    const [student,setStudent]=useState({
        student_name:"",student_fathername:"",student_dob:"",student_gender:"",
        student_mobile:"",student_email:"",student_batch:"",
    });
    //let errorsObj={stduent_email:'',student_password:''};
    //const [errors,setErrors]=useState(errorsObj);
    const history=useHistory();
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setStudent({...student,[eleName]:value});
    }

    const postLoginCredentials=async (e)=>{
        e.preventDefault();
        const {student_email,student_password}=student;
        const res=await Axios.post('http://localhost:5100/auth/student/login',{
            student_email:student.student_email,
            student_password:student.student_password,
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
            console.log(res);
            // if(res.data)
            // const token=res.data.student_token;
            const response=res.data;
            if(!response || response.status>=400){
                alert("Please check the login credentials again");
            }else{
                alert("Login Successful");
                history.push("/student/dashboard");
            }

        });


    }
    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Menu bars</h4></div>
                            <div className="card-body">
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Student Dashboard</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    {convFeePaid?
                                        <Link to="/student/profile" className="btn btn-sm btn-success">My Profile</Link>
                                        :
                                        <Link to="/student/profile" className="btn btn-sm btn-danger">My Profile</Link>
                                        // <Redirect to="/student/convenience-fee" >Test</Redirect>
                                    }
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

export default StudentDashboard;