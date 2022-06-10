import React, {useEffect, useState} from "react";
// import {useHistory} from "react-router";
import Axios from "axios";
import {Link, Redirect, useHistory} from "react-router-dom";
import {ReactSession} from "react-client-session";
// import {withRouter} from "react-router-dom";

const StudentDashboard=props=>{
    ReactSession.setStoreType("localStorage");
    const history=useHistory();
    if(localStorage.length===0){
        history.push("/");
    }
    const [appliedStreamCollege,setAppliedStreamCollege]=useState([{
    }])
    const [applicationDetails,setApplicationDetails]=useState([{}]);
    const [stream,setStream]=useState({
        stream_id:0,stream_name:"",stream_description:""
    })
    const [convFeePaid,setConvFeePaid]=useState(false);
    const [regFeePaid,setRegFeePaid]=useState(false);
    const [convFeeStatus,setConvFeeStatus]=useState(false);
    const getStreamDetail=async ()=>{
        const stream_id=1;
        const streamDetail=await Axios.get(`${process.env.REACT_APP_URI}stream/${stream_id}`);
        console.log(stream)
    }
    const getCollegeDetails=async ()=>{
        const college_id=1;
        const collegeDetail=await Axios.get(`${process.env.REACT_APP_URI}college/${college_id}`);
        console.log(stream)
    }
    const getAppliedStreamList=async ()=>{
        {/* get all information about the applied streams and colleges*/}
        const getStreamsApplied=await Axios.get(`${process.env.REACT_APP_URI}student/stream/apply/${ReactSession.get("student_id")}`)
        console.log(getStreamsApplied);
        setAppliedStreamCollege(getStreamsApplied.data.streamApplied)
        // ReactSession.set("college_id",)
    }
    //Logic to check CovFeePaid or Not
    // const
    //Logic to check RegistrationFee Paid of not

    const gotoConvPayment=()=>{
        console.log('Need to Pay Fee');
    }

    const gotoRegPayment=()=>{
        if(convFeeStatus)
        {
            console.log("Go to Pay Registration Fee")
        }
        else{
            console.log('Need to Pay Conv. Fee');
        }
        //
    }

    const getConvFeeStatus=async ()=>{
        // console.log("Hit me");
        // const collegeid=1;
        const collegeid=1;
        // console.log("clgid ->",clgid)
        const uri=`${process.env.REACT_APP_URI}fee/conv/status/${ReactSession.get("student_id")}/${collegeid}`;
        const convFeeStatus=await Axios.get(uri);
        // console.log(await convFeeStatus);
        setConvFeeStatus(convFeeStatus.data.isConvPaid);
        // return convFeeStatus.data.isConvPaid;
    }

    const getRegFeeStatus=async (clgid,strid)=>{
        // console.log("Hit me");
        // const collegeid=1;
        const collegeid=clgid;
        const streamid=strid;
        // console.log("clgid ->",clgid)
        const uri=`${process.env.REACT_APP_URI}fee/conv/status/${ReactSession.get("student_id")}/${collegeid}/${streamid}`;
        const convFeeStatus=await Axios.get(uri);
        // console.log(await convFeeStatus);
        setConvFeeStatus(convFeeStatus.data.isConvPaid);
    }

    const getConvFeeAmount=async ()=>{
        // console.log("Hit me");
        const uri=`${process.env.REACT_APP_URI}fee/conv/amount/${ReactSession.get("student_id")}`;
        const convFeeAmount=await Axios.get(uri);
        console.log(await convFeeAmount);
        // setConvFeeAmount(convFeeAmount.data);
    }

    useEffect(()=>{
        getAppliedStreamList();
        getConvFeeStatus();
        getConvFeeDetails();
        {/*Check whether the conv. fee paid or not*/}

        {/*Check where the prospectus (registration)node fee is paid or not*/}
    },[]);
    const [convFeeDetails,setConvFeeDetails]=useState([]);
    const getConvFeeDetails=async ()=>{
        const uri=`${process.env.REACT_APP_URI}fee/conv/details/${ReactSession.get("student_id")}`;
        // alert(uri);
        const college_ids=await Axios.get(uri);
        setConvFeeDetails(await college_ids.data);
        console.log("college->",college_ids.data);
    }

    const [student,setStudent]=useState({
        student_name:"",student_fathername:"",student_dob:"",student_gender:"",
        student_mobile:"",student_email:"",student_batch:"",
    });

    let eleName,value;
    const handleInputs=(e)=>{
        eleName=e.target.name;
        value=e.target.value;
        setStudent({...student,[eleName]:value});
    }
    const logout=()=>{
        localStorage.clear();
        history.push("/");
    }



    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Menu bars</h4></div>
                            <div className="card-body">
                                <a className="btn btn-sm btn-danger" onClick={logout}>Logout</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Applied Stream</h4></div>
                            <div className="card-body">
                                <div className="container mt-2 mb-2">

                                        <div className="row border">
                                            {
                                                convFeeStatus?
                                                    <label className="btn btn-sm btn-block btn-success">Conv. Fee Paid</label>:
                                                    <label className="btn btn-sm btn-block btn-danger"
                                                           onClick={getConvFeeStatus}>Pay Conv. Fee</label>
                                            }
                                        </div>

                                    <div className="row border">
                                        <div className="col-md-3">College Name</div>
                                        <div className="col-md-3">Stream Name</div>
                                        {/*<div className="col-md-3">Conv Fee Status</div>*/}
                                        {/*<div className="col-md-3">Reg Fee Status</div>*/}
                                    </div>
                                        {/*fetch all applied stream list
                                        college name->stream name->payment status*/}

                                    {
                                        appliedStreamCollege.map( (item)=> {
                                              return (<>
                                                      <div className="row border" >
                                                          <div className="col-md-3">{item.college_name}</div>
                                                          <div className="col-md-3">{item.stream_name}</div>
                                                          {/*<div className="col-md-3">{*/}
                                                          {/*    convFeeStatus?*/}
                                                          {/*    <label className="btn btn-sm btn-block btn-success">Conv Fee Successful</label> :*/}
                                                          {/*    <label className="btn btn-sm btn-block btn-danger" onClick={gotoRegPayment}>Pay Conv. Fee</label>}</div>*/}
                                                          {/*<div className="col-md-3">{item.registration_fee_paid?*/}
                                                          {/*    <label className="btn btn-sm btn-block btn-success">Registration Successful</label> :*/}
                                                          {/*    <label className="btn btn-sm btn-block btn-danger" onClick={gotoRegPayment}>Pay Reg. Fee</label>*/}
                                                          {/*}</div>*/}
                                                      </div>
                                                  {/*<label className="btn btn-sm btn-success"></label>*/}
                                              </>)
                                            }
                                        )
                                    }
                                </div>

                            </div>


                            <div className="card-header"><h4 className="card-title"> Student Dashboard</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <Link to="/student/applied/stream" className="btn btn-sm btn-primary mx-3" >Apply for New Stream</Link>
                                    {convFeePaid?
                                        <Link to="/student/profile" className="btn btn-sm btn-success">Proceed for Registration</Link>
                                        :
                                        <Link to="/student/profile" className="btn btn-sm btn-danger">My Profile</Link>
                                        // <Redirect to="/student/convenience-fee" >Test</Redirect>
                                    }
                                    <Link to="/student/profile" className="btn btn-sm btn-primary mx-3">My Profile</Link>
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

export default StudentDashboard;