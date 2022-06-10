import React, {useEffect, useState} from "react";
import {ReactSession} from 'react-client-session';
// import {useHistory} from "react-router";
import Axios from "axios";
import {useHistory} from "react-router-dom";
// import {withRouter} from "react-router-dom";


const AdminLogin=props=>{
    ReactSession.setStoreType("localStorage");
    const [admin,setAdmin]=useState({
        admin_name:"", college_id:0,role:"collegeadmin",isAdmin:false,isLogged:false
    });

    const [colleges,setColleges]=useState([]);
    useEffect(()=>{
        if(!colleges || colleges.length === 0){
            getColleges();
            // debugger
        }
    });

    const getColleges=async ()=>{
        // console.log(`${process.env.REACT_APP_URI}/college`);
        const res=await Axios.get(`${process.env.REACT_APP_URI}college`);
        // debugger
        const getclg= res.data;
        setColleges(getclg);
        console.log('----', getclg);
        // console.log(colleges);
    }


    const history=useHistory();
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setAdmin({...admin,[eleName]:value});
    }

    const postLoginCredentials=async (e)=>{
        e.preventDefault();
        const {admin_name,admin_password,college_id}=admin;
        const res=await Axios.post(`${process.env.REACT_APP_URI}auth/admin/login`,{
            admin_name:admin.admin_name,
            admin_password:admin.admin_password,
            college_id:admin.college_id
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
                if(res.data.auth) {
                    ReactSession.set("admin_name", res.data.data.admin_name);
                    //ReactSession.set("isLoggedIn",res.data.auth);
                    ReactSession.set("college_id", res.data.data.college_id);
                    ReactSession.set("auth", true);
                    ReactSession.set("role","collegeadmin")
                    alert("Login Successful");
                    // console.log(process.env);
                    // console.log(ReactSession.get("student_email"))
                    history.push("/admin/dashboard");
                }
                else{
                    alert("Please check the login credentials again");
                }
            }
        }).catch(err=>{
            console.log(err)
        });
    }
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Admin Login</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-studentbasic">
                                        <div className="col-md-12 ">
                                            <label>College Name</label>
                                            <select  name="college_id" className="form-control"
                                                     onChange={handleInputs}>
                                                {colleges.map(item => {
                                                    // console.log(item);
                                                    return <option key={item.college_id} value={item.college_id}> {item.college_name}</option>
                                                })}
                                            </select>

                                        </div>
                                        <div className="row">

                                            <div className="col-md-12 ">
                                                <label className="mt-3">Admin Name</label>
                                                <input type="email" name="admin_name" className="form-control"
                                                       value={admin.admin_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Password</label>
                                                <input type="password" name="admin_password" className="form-control"
                                                       value={admin.admin_password} onChange={handleInputs}
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

export default AdminLogin;