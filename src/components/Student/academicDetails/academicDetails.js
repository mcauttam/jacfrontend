import React, {useEffect, useState} from "react";
import {ReactSession} from 'react-client-session';
// import {useHistory} from "react-router";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import ArrowHeader from "../arrowHeader";
// import {withRouter} from "react-router-dom";


const AcademicDetails=props=>{
    const [elementItem,setElementItem]=useState(0);
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

    const getAcademicDetails=async ()=>{
        const academicDetails=await Axios.get(`${process.env.REACT_APP_URI}student/academic/marks/byid/${ReactSession.get("student_id")}`).then((res)=>{
            if(res.data.length>0){
                history.push('/student/applied/stream');
            }
        })
    }

    useEffect(()=>{
        getSchools();
        getSubjectType();
        getAcademicDetails();
    },[])
    const history=useHistory();
    let eleName,value;
    const handleInputs=(i,e)=>{
        // eleName=e.target.name;
        // value=e.target.value;
        // setAcademicDetails({...academicDetails,[eleName]:value});
        let newAcademicDetails=[...formValues];
        newAcademicDetails[i][e.target.name]=e.target.value;
        setFormValues(newAcademicDetails);

    }
    const [school,setSchool]=useState(0);
    const handleSelect=(e)=>{
        //eleName="school_id";
        console.log(e.target.value);
        value=e.target.value;
        setSchool(e.target.value);
        if(e.target.value==-1){
            // alert("fill the new school detail");
            history.push("/student/previous/school")
        }else{
            ReactSession.set("prevschool_id",e.target.value);
        }

    }
    const [isAcademicCompleted,setIsAcademicCompleted]=useState(false);
    const getAcademicData=async ()=>{
        try {
            console.log(`${process.env.REACT_APP_URI}student/detail/all/${ReactSession.get("student_id")}`)
            const getProfile = await Axios.get(`${process.env.REACT_APP_URI}student/detail/all/${ReactSession.get("student_id")}`)
                .then((res) => {
                    if (res.data.length > 4) {
                        console.log(res.data);
                        setIsAcademicCompleted(true);
                    }
                    else{
                        alert('Please Complete the Academic Details and confirm that all 5 subjects must be filled')
                        return;
                    }
                }).catch(err => {
                    console.log(err.message)
                })
        }catch (err){
            console.log(err.message);
        }

    }

    const [schools,setSchools]=useState([{}]);
    const getSchools=async ()=>{

        const allschools=await Axios.get(`${process.env.REACT_APP_URI}student/student/prev/school`).then((res)=>{
            // debugger
            setSchools(res.data);
            console.log(res);
        }).catch(err=>{
            console.log(err.message);
        });
        console.log(allschools);
    }

    let addMoreFields=()=>{
        setFormValues([...formValues,{
            standard_name:"",subject_name:"",
            subject_maxmarks:0,subject_marksobtained:0,subject_type:0
        }]);
        let num=elementItem+1;
        setElementItem(num);
    }
    const [buttonTitle,setButtonTitle]=useState('Submit Academic Details');
    const [isDisabled,setIsDisabled]=useState(false);
    const [subjecttypes,setSubjectTypes]=useState([{}]);
    const getSubjectType=async ()=>{
        const subject_types=await Axios.get(`${process.env.REACT_APP_URI}subject/subject-types`).then((res)=>{
            setSubjectTypes(res.data);
            console.log(res.data);
        }).catch(err=>{
            console.log(err.message);
        })
    }

    const nextPage=()=>{
        history.push('/student/applied/stream');
    }

    const posAcademicDetails=async (e)=>{
        e.preventDefault();
        console.log(formValues)
        const {student_id,school_id,standard_name,subject_name,
        subject_maxmarks,subject_marksobtained,subject_type}=academicDetails;
        {/*Array Data post iteratively*/}
        // const formBody=new FormData()
        const studentid=ReactSession.get("student_id");
        const schoolid=ReactSession.get("prevschool_id");
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

                }).then((res)=>
                {
                    console.log(res);
                    setButtonTitle('Information Saved');
                    setIsDisabled(true);
                }).catch(err=>{
                    console.log(err);
                });
            }});

    }
    return(
        <>
            <ArrowHeader form="academic"  />
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
                                                <select name="prevschool_id" className="form-control"
                                                        value={school}
                                                        onChange={handleSelect}
                                                >
                                                    <option value={0}>--select School--</option>
                                                    <option value={-1}> Add New School Information </option>
                                                    {
                                                        schools.map(item=>{
                                                            console.log(item)
                                                            return <option key={item.prevschool_id} value={item.prevschool_id}>{item.school_name}</option>
                                                        })
                                                    }
                                                </select>
                                               </div>
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
                                                <select name="subject_type" className="form-control"
                                                       value={academicDetails.subject_type} onChange={e=>handleInputs(index,e)}
                                                >
                                                    <option value={0}>--Select Subject Type--</option>
                                                    {
                                                        subjecttypes.map(item=>{
                                                            return <option key={item.subjecttype_id} value={item.subjecttype_id}>{item.subjecttype_name}</option>
                                                        })
                                                    }

                                                </select>

                                            </div>
                                        </div>
                                            )
                                            )}
                                            <button type="button" onClick={addMoreFields} className="btn btn-sm btn-primary mt-3 mx-2">Add Subject Information</button>
                                        {
                                            elementItem<4?
                                                <button onClick={posAcademicDetails} className="btn btn-sm btn-success mt-3 mx-2" disabled> Submit Academic Details</button>
                                                :
                                                <button onClick={posAcademicDetails} className="btn btn-sm btn-success mt-3 mx-2" disabled={isDisabled} > {buttonTitle} </button>
                                        }
                                        {
                                            isDisabled?
                                                <button onClick={nextPage} className="btn btn-sm btn-warning mt-3 mx-2" > Apply for Stream and College</button>
                                                :
                                                <p></p>
                                        }


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