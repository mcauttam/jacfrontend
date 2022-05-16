import React, {useEffect, useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";

const AddAdmin=()=>{
    const [admin,setAdmin]=useState({
        admin_name:"",description:"",college_id:0,admin_password:"",role:"collegeadmin"
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setAdmin({...admin,[eleName]:value});
    }
    const [colleges,setColleges]=useState([]);
    // useEffect(()=>{
    //     const getColleges=async ()=>{
    //         const res=await Axios.get('http://localhost:5100/college');
    //         const getclg=await JSON.stringify(res.data);
    //         setColleges(await getclg);
    //         console.log(colleges);
    //     }
    //     getColleges();
    // });

    const ComparePassword=(e)=>{
        if(admin.admin_password!==e.target.value){
            console.log("Password didn't Match");
        }
        else{
            console.log("Password Match")
        }
    }

    const postAdminDetails=async (e)=>{
        e.preventDefault();
        //console.log(admin);
        const {admin_name,description}=admin;
        const res=await Axios.post('http://localhost:5100/admin/user',{
            admin_name:admin.admin_name,
            admin_password:admin.admin_password,
            college_id:admin.college_id,
            description:admin.description,
            role:admin.role
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
                            <div className="card-header"><h4 className="card-title"> Add New Admin</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-admin">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Admin Name</label>
                                                <input type="text" name="admin_name" className="form-control"
                                                       value={admin.admin_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Admin Password</label>
                                                <input type="password" name="admin_password" className="form-control"
                                                       value={admin.admin_password} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>Admin Confirm Password</label>
                                                <input type="password" name="admin_cpassword" className="form-control"
                                                       value={admin.admin_cpassword} onChange={handleInputs}
                                                       onKeyUp={ComparePassword}

                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label>College Name</label>
                                                <select name="college_id" className="form-control"
                                                        onChange={handleInputs}
                                               >
                                                    <option value="0">--Select College--</option>
                                                    <option value="1">Test College</option>
                                                    {/*List of College Shown here*/}
                                                    {/*{*/}
                                                    {/*    colleges.map((getclg)=>{*/}
                                                    {/*            <option key={<getclg className="college_id"></getclg>} value={getclg.college_id}>{getclg.college_name}</option>*/}
                                                    {/*        }*/}
                                                    {/*    )*/}
                                                    {/*}*/}
                                                </select>
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="description" className="form-control"
                                                           value={admin.description} onChange={handleInputs}
                                                />
                                            </div>

                                            <button onClick={postAdminDetails} className="btn btn-sm btn-success
                                            mt-3 mx-2" > Submit Information</button>

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

export default AddAdmin;