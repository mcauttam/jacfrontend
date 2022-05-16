import React, {useState} from "react";
import IsAdmin from "./isAdmin";
import Axios from "axios";

const AddCollege=()=>{
    const [college,setCollege]=useState({
        college_name:"",description:"",
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setCollege({...college,[eleName]:value});
    }
    const postCollegeDetails=async (e)=>{
        e.preventDefault();
        const {college_name,description}=college;
        const res=await Axios.post('http://localhost:5100/college',{
            college_name:college.college_name,
            description:college.description,
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
            console.log(res.data);
        });
        //const response=await res.json();
        // if(!response || response.status>=400){
        //     alert("Please check the form again");
        // }else{
        //     alert("College Added Successfully");
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
                                <div className="card-header"><h4 className="card-title"> Add New College</h4></div>
                                <div className="card-body">
                                    <div className="container form-floating">
                                        <form method="POST" id="form-college">
                                            <div className="row">
                                                <div className="col-md-12 ">
                                                    <label>College Name</label>
                                                    <input type="text" name="college_name" className="form-control"
                                                           value={college.college_name} onChange={handleInputs}
                                                    />
                                                </div>
                                                <div className="col-md-12 ">
                                                    <label className="mt-3">Description</label>
                                                    <textarea  name="description" className="form-control"
                                                           value={college.description} onChange={handleInputs}
                                                    />
                                                </div>

                                                <button onClick={postCollegeDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default AddCollege;