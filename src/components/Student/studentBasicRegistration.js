import React, {useEffect, useState} from "react";
import {Link, Redirect, Route, Router, useHistory} from "react-router-dom";
import Axios from "axios";
import env from 'react-dotenv';
import Home from "./Home";
import NewApp from "./newApp";
import {Navigate} from "react-router";
import {ReactSession} from "react-client-session";
//dotenv.config();

const StudentBasicRegistration=()=>{
    const [loginStatus, setLoginStatus]=useState(false);
    const [student,setStudent]=useState({student_email:"",student_password:""});
    // const [student_password,setStudent_Password]=useState('');

    // const submitHandler=(e)=>{
    //     e.preventDefault();
    //     onStudentLogin(e)
    // }
    let history=useHistory();
    let eleName,value;
    ReactSession.setStoreType("localStorage");
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setStudent({...student,[eleName]:value});
    }
    useEffect(()=>{
        setLoginStatus(true);
    },[])
    const onStudentLogin=(e)=>{
        e.preventDefault();
        Axios.post(`${process.env.REACT_APP_URI}auth/student/login`,{
            student_email:student.student_email,
            student_password:student.student_password
        }).then((res)=>{
            if(res.data.auth)
            {
                localStorage.clear();
                ReactSession.set("login_status",loginStatus);
                ReactSession.set("student_id",res.data.data.student_id);
                history.push("/student/dashboard");
            }else{
                return <Redirect to="/"/>
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-2">&nbsp;</div>
                <div className="col-md-8">
                    <div className="card border-secondary mt-3 text-justify">
                        <div className="card-header"><h4 className="card-title"> Step 1:
                                <a href="/newApp" > Click here </a>
                            to create Student ID</h4></div>
                        <div className="card-body">
                            <h4 className="card-title">Step 2: Login to Apply </h4>
                            <div className="container mt-lg-5">
                                <div className="row">
                                    <form onSubmit={onStudentLogin}>
                                    <div className="col-md-12 ">
                                        <label>Student Email</label>
                                        <input type="text" className="form-control" name="student_email"
                                               value={student.student_name} onChange={handleInputs}
                                        />
                                        <label className="mt-3">Verification Code/Password:</label>
                                        <input type="password" className="form-control" name="student_password"
                                               value={student.student_password} onChange={handleInputs}
                                        />
                                        <button type="submit" className="btn btn-sm btn-success mt-3 mx-2" >Login</button>
                                        <button className="btn btn-sm btn-warning mt-3 mx-2" >Forgot Password</button>
                                        <button className="btn btn-sm btn-danger mt-3 mx-2" >Print Prospectus Receipt</button>
                                        <div className="container mt-4">
                                            <span className="text-danger"> Total Number of Submitted Forms - Arts	 	&lt; No. of Arts Application &gt;<br/>
                                            Total Number of Submitted Forms - Science Math	 	&lt;No. of Sci Math Application &gt;<br/>
                                            Total Number of Submitted Forms - Science Biology	 	&lt;No. of Sci Biology Application &gt;<br/>
                                            Total Number of Submitted Forms	 	&lt;No. of Total Application &gt;<br/></span><br/>
                                            यह सिर्फ आवदेन है नामांकन का दावा नहीं है |<br/>
                                            नामांकन मेधा सूचि के आधार पर झारखण्ड सरकार के आरक्षण नियमों के आधार पर होगा |<br/>
                                            नामांकन के समय जाति प्रमाण पत्र प्रस्तुत करने पर ही उसका लाभ मिलेगा |<br/>
                                            विज्ञान संकाय में 50% से नीचे उत्तीर्ण छात्राएं / छात्र को बायोलॉजी दिया जायेगा |<br/>


                                            किसी प्रकार की समस्या होने पर इस ई-मेल आई ड़ी --onlineascollege@gmail.com पर संपर्क करें |
                                        </div>


                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Route exact path="/">*/}
                {/*    {loginStatus?<Redirect to="/student/home" component={()=><Home/>} />:<NewApp/>}*/}
                {/*</Route>*/}
                <div className="col-md-2">&nbsp;</div>
            </div>
        </div>

    )
}

export default StudentBasicRegistration;