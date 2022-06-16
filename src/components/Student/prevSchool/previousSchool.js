import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {ReactSession} from "react-client-session";
import ArrowHeader from "../arrowHeader";
// import {useHistory} from "react-router";
// import {withRouter} from "react-router-dom";

const PreviousSchool=props=>{
    const history=useHistory();
    const [school,setSchool]=useState({
        school_name:'',board_name:'',
    });
    ReactSession.setStoreType("localStorage");
    const[schoolid,setSchoolID]=useState(0);
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setSchool({...school,[eleName]:value});
    }
    useEffect(()=>{
        ReactSession.set("prevschool_id",schoolid);
    },[])

    const postSchool=async (e)=>{
        var response={};
        e.preventDefault();
        const {school_name,board_name}=school;
        const res=await Axios.post(`${process.env.REACT_APP_URI}student/academic/school`,{
            school_name:school.school_name,
            board_name:school.board_name,
        },{
            headers:{
                "Content-Type":"application/json",
            },
        }).then((res)=>
        {
            response=res.data;
            console.log(res);
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
            <ArrowHeader form="school"  />
            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> New School Information</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-studentbasic">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>School Name</label>
                                                <input type="text" name="school_name" className="form-control"
                                                       value={school.school_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Board Name</label>
                                                <input type="text" name="board_name" className="form-control"
                                                       value={school.board_name} onChange={handleInputs}
                                                />
                                            </div>

                                            <button onClick={postSchool} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default PreviousSchool;