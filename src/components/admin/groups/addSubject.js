import React, {useEffect, useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";
import {useHistory} from "react-router-dom";

const AddSubjecttoGroup=()=>{
    const history=useHistory();
    const [groupsubdetails,setGroupSubDetails]=useState({
        group_id:"",subject_id:"",description:""
    });
    const [allSubjects,setAllSubjects]=useState([{}]);
    const [allGroups,setAllGroups]=useState([{}]);
    let eleName,value;
    var [grpid,setGrpid]=useState(0);
    var [subid,setSubid]=useState(0);

    useEffect(()=>{
        getAllSubjects();
        getAllGroups();
    },[])

    const getAllSubjects=async ()=>{
        //code to get all stream from the DB
        const subjects=await Axios.get(`${process.env.REACT_APP_URI}subject`);
        const getSubjects= subjects.data;
        setAllSubjects(getSubjects);
        console.log('----', getSubjects);
    }

    const getAllGroups=async ()=>{
        //code to get all stream from the DB
        const groups=await Axios.get(`${process.env.REACT_APP_URI}subject/group`);
        const getGroups= groups.data;
        setAllGroups(getGroups);
        console.log('----', getGroups);
    }

    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setGroupSubDetails({...groupsubdetails,[eleName]:value});
        console.log(groupsubdetails);
    }
    const postGroupSubjectDetails=async (e)=>{
        e.preventDefault();
        alert("Subject si going to added into Group");
        const {group_id,subject_id}=groupsubdetails;
        const res=await Axios.post(`${process.env.REACT_APP_URI}subject/group/add-subject/${subject_id}/${group_id}`,{

            headers:{
                "Content-Type":"application/json",
            },

        }).then((res)=>
        {
            console.log(res.data);
            if(!res){
                alert("Either the Subject is already exist in this group or something went wrong. Please contact to your administrator.")
                return;
            }
            else{
                if(res.data.isUpdate) {
                    history.push("/admin/success/Subject Group Pair/true");
                }
                alert("Either the Subject is already exist in this group or something went wrong. Please contact to your administrator.")
                return;
            }
        });
        //const response=await res.json();
        // if(!response || response.status>=400){
        //     alert("Please check the form again");
        // }else{
        //     alert("Group Added Successfully");
        // }

    }
    return(
        <>
            {/*Check Admin Role Here*/}
            {/*Todo Code to check the admin Role */}

            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Add New Group</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-group">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Subject Name</label>
                                                {/*Put here code to select the subject from a list*/}
                                                <select name="group_id" className="form-control"
                                                        value={groupsubdetails.group_id} onChange={handleInputs}
                                                >
                                                    <option value="0">--Select Group--</option>
                                                    {/*
                                                    Code to select all stream from the DB
                                                    */}
                                                    {allGroups.map(item => {
                                                        // console.log(item);
                                                        return <option key={item.subjectgroup_id} value={item.subjectgroup_id}> {item.group_title}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Subject</label>
                                                <select name="subject_id" className="form-control"
                                                        value={allSubjects.subject_id} onChange={handleInputs}
                                                >
                                                    <option value="0">--Select Subject--</option>
                                                    {/*
                                                    Code to select all stream from the DB
                                                    */}
                                                    {allSubjects.map(item => {
                                                        // console.log(item);
                                                        return <option key={item.subject_id} value={item.subject_id}> {item.subject_name}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="description" className="form-control"
                                                           value={groupsubdetails.description} onChange={handleInputs}
                                                />
                                            </div>

                                            <button onClick={postGroupSubjectDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default AddSubjecttoGroup;