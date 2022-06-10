import React, { useState} from "react";
import {ReactSession} from 'react-client-session';
// import {useHistory} from "react-router";
import Axios from "axios";
import {useHistory} from "react-router-dom";
// import {withRouter} from "react-router-dom";


const AcademicDetails=props=>{
    ReactSession.setStoreType("localStorage");
    const [formValues,setFormValues]=useState([{
        school_id:0,standard_name:"",subject_name:"",
        subject_maxmarks:0,subject_marksobtained:0,subject_type:0
    }])
    const [academic,setAcademic]=useState([]);
    const [academicDetails,setAcademicDetails]=useState({
        student_id:0,school_id:0,standard_name:"",subject_name:"",
        subject_maxmarks:0,subject_marksobtained:0,subject_type:0
    })
    const history=useHistory();
    let eleName,value;
    const handleInputs=(i,e)=>{
        // eleName=e.target.name;
        // value=e.target.value;
        // setAcademicDetails({...academicDetails,[eleName]:value});
        let newAcademicDetails=[...formValues];
        newAcademicDetails[i][e.target.name]=e.target.value;
        setFormValues(newAcademicDetails)
    }

    let addMoreFields=()=>{
        setFormValues([...formValues,{
            standard_name:"",subject_name:"",
            subject_maxmarks:0,subject_marksobtained:0,subject_type:0
        }])
    }


    const posAcademicDetails=async (e)=>{
        e.preventDefault();
        console.log(formValues)
        const {student_id,school_id,standard_name,subject_name,
        subject_maxmarks,subject_marksobtained,subject_type}=academicDetails;
        {/*Array Data post iteratively*/}
        // const formBody=new FormData()
        const studentid=ReactSession.get("student_id");
        const schoolid=1;
        await formValues.forEach(item=>{
            if(item.standard_name!==""){
                console.log(item);
                const res=Axios.post(`${process.env.REACT_APP_URI}student/academic/marks`,{
                    student_id:studentid,
                    school_id:schoolid,
                    standard_name:item.standard_name,
                    subject_name:item.subject_name,
                    subject_maxmarks:item.subject_maxmarks,
                    subject_marksobtained:item.subject_marksobtained,
                    subject_type:item.subject_type
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
                }).catch(err=>{
                    console.log(err);
                });
            }})
    }
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">&nbsp;</div>
                    <div className="col-md-12">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Previous Academic Details</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-studentbasic">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label className="mt-3">Select your Previous School</label>
                                                {/*Select option here*/}</div>
                                        </div>
                                        {formValues.map((academicDetails,index)=>(
                                        <div className="row">

                                            <div className="col-md-3 ">
                                                <label className="mt-3">Standard Name</label>
                                                <input type="number" name="standard_name" className="form-control"
                                                       value={academicDetails.standard_name} onChange={e=>handleInputs(index,e)}
                                                />
                                            </div>
                                            <div className="col-md-3 ">
                                                <label className="mt-3">Subject Name</label>
                                                <input type="text" name="subject_name" className="form-control"
                                                       value={academicDetails.subject_name} onChange={e=>handleInputs(index,e)}
                                                />
                                            </div>
                                            <div className="col-md-2 ">
                                                <label className="mt-3">Max marks</label>
                                                <input type="text" name="subject_maxmarks" className="form-control"
                                                       value={academicDetails.subject_maxmarks} onChange={e=>handleInputs(index,e)}
                                                />
                                            </div>
                                            <div className="col-md-2 ">
                                                <label className="mt-3">Marks Obtained</label>
                                                <input type="text" name="subject_marksobtained" className="form-control"
                                                       value={academicDetails.subject_marksobtained} onChange={e=>handleInputs(index,e)}
                                                />
                                            </div>
                                            <div className="col-md-2 ">
                                                <label className="mt-3">Subject Type</label>
                                                <input type="text" name="subject_type" className="form-control"
                                                       value={academicDetails.subject_type} onChange={e=>handleInputs(index,e)}
                                                />
                                            </div>
                                        </div>
                                            )
                                            )}
                                            <button type="button" onClick={addMoreFields} className="btn btn-sm btn-secondary mt-3 mx-2">Add More Rows</button>
                                            <button onClick={posAcademicDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Academic Details</button>


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

export default AcademicDetails;