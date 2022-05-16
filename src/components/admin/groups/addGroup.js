import React, {useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";

const AddGroup=()=>{
    const [group,setGroup]=useState({
        group_title:"",stream_id:"",description:""
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setGroup({...group,[eleName]:value});
    }
    const postGroupDetails=async (e)=>{
        e.preventDefault();
        const {group_name,description}=group;
        const res=await Axios.post('http://localhost:5100/subject/group',{
            group_title:group.group_title,
            stream_id:group.stream_id,
            description:group.description,
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
                                                <label>Group Title</label>
                                                <input type="text" name="group_title" className="form-control"
                                                       value={group.group_title} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Stream</label>
                                                <select name="stream_id" className="form-control"
                                                       value={group.stream_id} onChange={handleInputs}
                                                >
                                                    <option value="0">--Select Stream--</option>
                                                    <option value="1">Stream 1</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="description" className="form-control"
                                                           value={group.description} onChange={handleInputs}
                                                />
                                            </div>

                                            <button onClick={postGroupDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default AddGroup;