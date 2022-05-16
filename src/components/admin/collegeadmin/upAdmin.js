import React, {useEffect, useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";
import {useParams} from "react-router-dom";

const UpdateAdmin=()=>{

    const [admin,setAdmin]=useState({
        admin_id:0,admin_name:"",description:"",college_id:0,admin_password:"",role:"collegeadmin"
    });
    const [selectDefault, setSelectDefault] = useState("")
    admin.admin_id=useParams();

    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setAdmin({...admin,[eleName]:value});
    }

    useEffect(() => {
        if(!admin || admin.admin_name==="") {
            getAdmin();
            getColleges();
            // getCollege();
        }
        // console.log(collegid);
        setSelectDefault(admin.college_id)
    },[])
    var collegid=admin.college_id;
    var getAdminData={};
    const getAdmin=async ()=>{
        const res=await Axios.get(`http://localhost:5100/admin/user/${admin.admin_id.id}`);
        getAdminData=res.data;
        setAdmin({admin,...res.data});
        console.log(admin);
    }
    const [colleges,setColleges]=useState([]);
    const getColleges=async ()=>{
        const res=await Axios.get('http://localhost:5100/college');
        const getclg= res.data;
        setColleges(getclg);
        console.log('----', getclg);
        // console.log(colleges);
    }
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
        console.log(admin.admin_id.id);
        const {admin_name,admin_password,college_id,description,role,admin_id}=admin;

        // console.log("Hello");
        // console.log(`http://localhost:5100/admin/user/${admin.admin_id.id}`);
        const res=await Axios.put(`http://localhost:5100/admin/user/${admin.admin_id.id}`,{
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
        }).catch(e=>{
            console.log(e);
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
                                                       onFocus={getAdmin}
                                                />
                                            </div>
                                           

                                            <div className="col-md-12 ">
                                                <label>College Name</label>
                                                <select  name="college_id" className="form-control"
                                                         onChange={handleInputs} value={selectDefault}>
                                                    {colleges.map(item => {
                                                        console.log(item);
                                                        return <option key={item.college_id} value={item.college_id}> {item.college_name}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="description" className="form-control"
                                                           value={admin.description} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Role</label>
                                                <input type="text"  name="role" className="form-control"
                                                           value={admin.role} onChange={handleInputs}
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

export default UpdateAdmin;