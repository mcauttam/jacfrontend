import React, { useState} from "react";
import {ReactSession} from 'react-client-session';
// import {useHistory} from "react-router";
import Axios from "axios";
import {useHistory} from "react-router-dom";
// import {withRouter} from "react-router-dom";


const Login=props=>{
    ReactSession.setStoreType("localStorage");
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
        const res=await Axios.post(`${process.env.REACT_APP_URI}auth/student/login`,{
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
                ReactSession.set("student_email",res.data.data.student_email);
                ReactSession.set("student_token",res.data.token);
                ReactSession.set("student_id",res.data.data.student_id);
                ReactSession.set("auth",true);
                alert("Login Successful");
                // console.log(process.env);
                // console.log(ReactSession.get("student_email"))
                history.push("/student/dashboard");
            }
        });
    }
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Student Login</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-studentbasic">
                                        <div className="row">

                                            <div className="col-md-12 ">
                                                <label className="mt-3">Email ID</label>
                                                <input type="email" name="student_email" className="form-control"
                                                       value={student.student_email} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Password</label>
                                                <input type="password" name="student_password" className="form-control"
                                                       value={student.student_password} onChange={handleInputs}
                                                />
                                            </div>
                                            <button onClick={postLoginCredentials} className="btn btn-sm btn-success mt-3 mx-2" > Get Login</button>

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

export default Login;