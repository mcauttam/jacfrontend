import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {ReactSession} from "react-client-session";
import ArrowHeader from "./arrowHeader";
// import {useHistory} from "react-router";
// import {withRouter} from "react-router-dom";

const StudentDetail=props=>{
    const history=useHistory();
    ReactSession.setStoreType("localStorage")
    useEffect(()=>{
        alert("Please note Only newly entered information will get affect.")
        getStudentBasic();
        getCategories();
    },[])
    const [student,setStudent]=useState({
        student_name:"",student_fathername:"",student_dob:"",student_gender:"",
        student_mobile:"",student_email:"",student_batch:"",student_id:0
    });

    const[studentd,setStudentd]=useState({
        student_mothername:"", student_caste:"",student_address:"",student_aadhar:""
    })
    //let errorsObj={stduent_email:'',student_password:''};
    //const [errors,setErrors]=useState(errorsObj);

    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setStudentd({...studentd,[eleName]:value});
    }
    const[categories,setCategories]=useState([{}]);
    const getCategories=async ()=>{
        const allCastes=await Axios.get(`${process.env.REACT_APP_URI}caste/category`).then((res)=>{
            setCategories(res.data);
        }).catch(err=>{
            console.log(err.message);
        });
        console.log(categories);
    }
    const getStudentBasic=async ()=>{
        const student_id=ReactSession.get("student_id");
        const student1=await Axios.get(`${process.env.REACT_APP_URI}student/byid/${student_id}`).then((res)=>{
            setStudent(res.data);
            console.log(res.data);
        });
        console.log(student);
    }

    const getStudentDetail=()=>{

    }

    const postStudentDetail=async (e)=>{
        var response={};
        e.preventDefault();
        const {student_name,student_fatherName,student_dob,student_gender,
            student_mobile,student_email,student_batch}=student;
        const res=await Axios.post(`${process.env.REACT_APP_URI}student/detail`,{
            student_id:ReactSession.get("student_id"),
            student_mothername :studentd.student_mothername,
            student_caste :studentd.student_caste,
            student_address :studentd.student_address,
            student_aadhar:studentd.student_aadhar,
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
        console.log(response);
        if(!response || response.status>=400){
            console.log(response);
            alert("Please check the form again");
        }else{
            if(response.isUpdated) {
                //console.log(response)
                alert("Information updated Successfully");
            }
            else{
                alert('Last saved information retained');
            }
            history.push("/student/previous/academic");
            //fill the academic details
        }

    }
    return(
        <>
            <ArrowHeader form="detail"  />
            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Student's Personal Details</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-studentdetail">
                                        <div className="row">
                                            <div className="col-md-6 ">
                                                <label>Student Name</label>
                                                <input type="text" name="student_name" className="form-control"
                                                       value={student.student_name} onChange={handleInputs} readOnly
                                                />
                                            </div>
                                            <div className="col-md-6 ">
                                                <label className="mt-3">Father's Name</label>
                                                <input type="text" name="student_fatherName" className="form-control"
                                                       value={student.student_fatherName} onChange={handleInputs} readOnly={true}
                                                />
                                            </div>
                                            <div className="col-md-6 ">
                                                <label className="mt-3">Mother's Name</label>
                                                <input type="text" name="student_mothername" className="form-control"
                                                       value={studentd.student_mothername} onChange={handleInputs}
                                                />
                                            </div>
                                            {/*get the list of caste*/}
                                            <div className="col-md-6 ">
                                                <label className="mt-3">Category</label>
                                                <select name="student_caste" className="form-control"
                                                       value={studentd.student_caste} onChange={handleInputs}
                                                >
                                                    <option value={0}>--select caste--</option>
                                                    {
                                                        categories.map(item=>{
                                                            return <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                                                            // return <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-6 ">
                                                <label className="mt-3">Aadhar Number</label>
                                                <input type="text" name="student_aadhar" className="form-control"
                                                       value={studentd.student_aadhar} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-6 ">
                                                <label className="mt-3">Address</label>
                                                <textarea  name="student_address" className="form-control"
                                                       value={studentd.student_address} onChange={handleInputs}
                                                ></textarea>
                                            </div>

                                            {/*<div className="col-md-6 ">*/}
                                            {/*    <label className="mt-3">Date of Birth</label>*/}
                                            {/*    <input type="date" name="student_dob" className="form-control"*/}
                                            {/*           value={student.student_dob} onChange={handleInputs}*/}
                                            {/*    />*/}
                                            {/*</div>*/}
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
                                                       value={student.student_mobile} onChange={handleInputs} readOnly={true}
                                                />
                                            </div>

                                            <div className="col-md-12 ">
                                                <label className="mt-3">Email ID</label>
                                                <input type="email" name="student_email" className="form-control"
                                                       value={student.student_email} onChange={handleInputs} readOnly={true}
                                                />
                                            </div>



                                            <button onClick={postStudentDetail} className="btn btn-sm btn-success mt-3 mx-2" ><i className="fa fa-save"></i> Submit Information</button>

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

export default StudentDetail;