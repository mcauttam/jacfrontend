import React, {useEffect, useState} from "react";

// import {useHistory} from "react-router";
import Axios from "axios";
import {Link, Redirect, useHistory} from "react-router-dom";
import {ReactSession} from "react-client-session";
// import {isAdmin} from "./isAdmin";
// import {withRouter} from "react-router-dom";


const AdminDashboard=props=>{
    ReactSession.setStoreType("localStorage");
    const history=useHistory();
    if(localStorage.length===0){
        history.push("/admin/");
    }

    const logout=()=>{
        localStorage.clear();
        history.push('/admin')
    }



    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Menu bars</h4></div>
                            <div className="card-body">
                                <a className="btn btn-sm btn-danger" onClick={logout}>Logout</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Admin Dashboard</h4></div>
                            <div className="card-body">
                                {
                                    ReactSession.get("role") === "collegeadmin" ?
                                        <div className="container mt-2 mb-2">

                                            <div className="row">

                                                <div
                                                    className="col-md-4 bg-success p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/addCollege"}
                                                              className="text-light text-capitalize text-decoration-none">Add
                                                        New College</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-secondary p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/addCaste"}
                                                              className="text-light text-capitalize text-decoration-none">Add
                                                        New Caste</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-primary p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/addAdmin"}
                                                              className="text-light text-capitalize text-decoration-none">Add
                                                        New Admin</Link></h5>
                                                </div>
                                            </div>

                                            <div className="row mt-1">
                                                <div
                                                    className="col-md-4 bg-info p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/addSubjectType"}
                                                              className="text-light text-capitalize text-decoration-none">Add
                                                        Subject Type</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-warning p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/addSubject"}
                                                              className="text-dark text-capitalize text-decoration-none">Add
                                                        New Subject</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-danger p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/addStream"}
                                                              className="text-light text-capitalize text-decoration-none">Create
                                                        Stream</Link></h5>
                                                </div>
                                            </div>

                                            <div className="row mt-1">
                                                <div
                                                    className="col-md-4 bg-primary p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/addGroup"}
                                                              className="text-light text-capitalize text-decoration-none">Create
                                                        Group</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-danger p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/addSubject"}
                                                              className="text-light text-capitalize text-decoration-none">Subject
                                                        Groups</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-success p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/subject/group"}
                                                              className="text-light text-capitalize text-decoration-none">Add
                                                        Subject into Group</Link></h5>
                                                </div>
                                            </div>

                                            <div className="row mt-1">
                                                <div
                                                    className="col-md-4 bg-warning p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/add/convfee"}
                                                              className="text-dark text-capitalize text-decoration-none">Add Conv. Fee                                                     Group</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-secondary p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/add/regfee"}
                                                              className="text-light text-capitalize text-decoration-none">Add Prospectus Fee</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-primary p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/add/fee"}
                                                              className="text-light text-capitalize text-decoration-none">Add Admission Fee</Link></h5>
                                                </div>
                                            </div>

                                            <div className="row mt-1">
                                                <div
                                                    className="col-md-4 bg-danger p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/add/category"}
                                                              className="text-light text-capitalize text-decoration-none">Add new Category</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-secondary p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/add/regfee"}
                                                              className="text-light text-capitalize text-decoration-none">Add Prospectus Fee</Link></h5>
                                                </div>
                                                <div
                                                    className="col-md-4 bg-primary p-5  text-lg-center border-1 border-light">
                                                    <h5><Link to={"/admin/add/fee"}
                                                              className="text-light text-capitalize text-decoration-none">Add Admission Fee</Link></h5>
                                                </div>
                                            </div>

                                        </div>
                                        :
                                        <>
                                            <div className="container mt-2 mb-2">
                                                College Admin Dashboard here
                                            </div>
                                        </>
                                }

                            </div>

                        </div>
                    </div>



                    <div className="col-md-3">&nbsp;</div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;