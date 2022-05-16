import React, {useState} from "react";
import {Link, Router} from "react-router-dom";
import styled from "styled-components";


const StudentProfile=props=> {

    const [imagePath, setImagePath] =useState("");

    const [studentb,setStudentb]=    useState({
        student_name: "Uttam Singh",
        student_regid:"12345",
        student_fathername: "PS Bist",
        student_dob: "",
        student_id: "",
        student_gender: "",
        student_mobile: "",
        student_email: "mca.uttam@gmail.com",
        student_batch: "",
    });
    const[studentd,setStudentd]=useState({
        student_mothername:"", student_caste:"",student_address:"",student_aadhar:""
    })


    return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center"><h4>Student Profiling Page</h4></div>
                    {/*Student Basic Infomration Page */}
                    <div className="col-md-3 card bg-light">
                        <div className="container-fluid ">
                            <div className="div row">
                                <div className="col-md-12">
                                    <img src={imagePath} className="img img-thumbnail img-responsive rounded-circle h-auto"></img>
                                    <div className="text-center">
                                        <h5>{studentb.student_name}</h5>
                                        <h6>{studentb.student_email}</h6>
                                        <h6>{studentb.student_regid}</h6>
                                    </div>

                                </div>
                                <div className="container">
                                    <nav className="navbar vh-100">
                                        <ul className="nav navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"> Update Information </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"> Apply for Stream and College </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"> Application Status </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"> Registration Status </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"> Payment Details </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"> Change Password </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li className="nav-item">
                                                <a className="btn btn-sm btn-danger" href="#"> Logout </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 mt-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <fieldset>
                                        <legend>Basic Information</legend>
                                        <div className="container">
                                            <div className="row shadow p-3">
                                                <div className="col-md-12 mt-2"> <label>Father's Name: <span className="text-uppercase font-weight-bold"> {studentb.student_fathername}</span></label></div>
                                                <div className="col-md-12 mt-2"> <label>Mother's Name: <span className="text-uppercase font-weight-bold">{studentd.student_mothername}</span></label></div>
                                                <div className="col-md-6 mt-2">  <label>Date of birth: {studentb.student_dob}</label></div>
                                                <div className="col-md-6 mt-2">  <label>Gender: {studentb.student_gender}</label></div>
                                                <div className="col-md-6 mt-2">  <label>Year of Admission: {studentb.student_batch}</label></div>
                                            </div>
                                        </div>
                                       <br/>
                                       <br/>

                                    </fieldset>
                                </div>
                                <div className="col-md-5">

                                </div>
                                <div className="col-md-12 mt-4">Stream Information</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default StudentProfile;