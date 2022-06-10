import React, {useState} from "react";
import IsAdmin from "../isAdmin";
import Axios from "axios";
import {useHistory} from "react-router-dom";

const AddCategory=()=>{
    const history=useHistory();
    const [category,setCategory]=useState({
        category_name:"",category_description:"",
    });
    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setCategory({...category,[eleName]:value});
    }
    const postCategoryDetails=async (e)=>{
        e.preventDefault();
        const {category_name,category_description}=category;
        const res=await Axios.post(`${process.env.REACT_APP_URI}caste/category`,{
            category_name:category.category_name,
            category_description:category.category_description,
        },{

            headers:{
                "Content-Type":"application/json",
            },

        }).then((res)=>
        {
            console.log(res.data);
            if(!res){
                alert("Either the Category is already exist or something went wrong. Please contact to your administrator.")
                return;
            }
            else{
                history.push("/admin/success/Category/true");
            }
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
                            <div className="card-header"><h4 className="card-title"> Add New Category</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-category">
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>Category Name</label>
                                                <input type="text" name="category_name" className="form-control"
                                                       value={category.category_name} onChange={handleInputs}
                                                />
                                            </div>
                                            <div className="col-md-12 ">
                                                <label className="mt-3">Description</label>
                                                <textarea  name="category_description" className="form-control"
                                                           value={category.category_description} onChange={handleInputs}
                                                />
                                            </div>

                                            <button onClick={postCategoryDetails} className="btn btn-sm btn-success mt-3 mx-2" > Submit Information</button>

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

export default AddCategory;