import React from 'react';
import Axios from "axios";

{/*Get all college*/}
export const getColleges=async ()=>{
    const res=await Axios.get(`${process.env.REACT_APP_URI}college`);
    console.log(res.data);
}