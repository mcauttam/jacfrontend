import React, {useState, useEffect} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";
import dotenv from 'dotenv';
import {useHistory} from "react-router-dom";
// import {useEffect} from "@types/react";
dotenv.config()
const AddCaste=()=>{
    const history=useHistory();
    const [caste,setCaste]=useState({
        caste_name:"",caste_description:"",caste_issuedby:"",caste_belongsto_jharkhand:false,
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setCaste({...caste,[eleName]:value});
    }

    const [categories,setCategories]=useState([]);
    useEffect(()=>{
        if(!categories || categories.length === 0){
            getCategories();
            // debugger
        }
    });
    const getCategories=async ()=>{
        // console.log(`${process.env.REACT_APP_URI}/college`);
        const res=await Axios.get(`${process.env.REACT_APP_URI}caste/category`);
        // debugger
        const getclg= res.data;
        setCategories(getclg);
        console.log('----', getclg);
        // console.log(colleges);
    }
    let message="";
    let ismessage=false;
    const postCasteDetails=async (e)=>{
        e.preventDefault();
        const {caste_name,description}=caste;
        //check the api call here
        const api_name=process.env.REACT_APP_URI;
        const res=await Axios.post(`${api_name}caste/`,{
            caste_name:caste.caste_name,
            caste_description:caste.caste_description,
            caste_issuedby:caste.caste_issuedby,
            caste_belongsto_jharkhand:caste.caste_belongsto_jharkhand,
            category_id:caste.category_id
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
            ismessage=true;
            message=res.data.message;
            console.log(res.data);
            if(!res){
                alert("Either the Caste is already exist or something went wrong. Please contact to your administrator.")
                return;
            }
            else{
                history.push("/admin/success/Caste/true");
            }
        });


    }
    return(
        <>
            {/*Check Admin Role Here and return back to home if adequate rights doesn't have by the user*/}
            {/*Todo Code to check the admin Role */}

            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Add New Caste</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-caste">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Caste Name</label>
                                                <input type="text" name="caste_name" className="form-control"
                                                       value={caste.caste_name} onChange={handleInputs}
                                                />
                                            </div>

                                            <div className="col-md-12 ">
                                                <label>Caste Belongs to Jharkhand</label>
                                                <select name="caste_belongsto_jharkhand" className="form-control"
                                                       value={caste.caste_belongsto_jharkhand} onChange={handleInputs}
                                                >
                                                    <option value="false">No</option>
                                                    <option value="true">Yes</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Caste Issued by</label>
                                                <input type="text" name="caste_issuedby" className="form-control"
                                                       value={caste.caste_issuedby} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Category</label>
                                                <select  name="category_id" className="form-control"
                                                         onChange={handleInputs}>
                                                    {categories.map(item => {
                                                        console.log(item);
                                                        return <option key={item.category_id} value={item.category_id}> {item.category_name}</option>
                                                    })}
                                                </select>

                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Description</label>
                                                <textarea name="caste_description" className="form-control"
                                                       value={caste.caste_description} onChange={handleInputs}
                                                />
                                            </div>


                                            <button onClick={postCasteDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div>{ismessage?message:""}</div>
                    </div>
                    <div className="col-md-3">&nbsp;</div>
                </div>
            </div>
        </>
    )
}

export default AddCaste;