import React, {useState,useEffect} from 'react';
import Axios from "axios";
import {ReactSession} from "react-client-session";
import {Link, useHistory} from "react-router-dom";
// import {useEffect} from "@types/react";
{/*Steps to be done by the students
1. For every new stream student need to pay registration fee.
2. after successful registration fee payment student will be able to apply for the stream */}

const StudentApplied=()=>{
    const history=useHistory();
    ReactSession.setStoreType("localStorage");
    {/*Setup an object holding every object value fecthed from the DB regarding the reg fee*/}
    const [registrationFeeStatus,setRegistrationFeeStatus]=useState(false)
    const [convFeeStatus,setConvFeeStatus]=useState(false);
    const [studentid,setStudentID]=useState(0);
    const [streamid,setStreamID]=useState(0);
    const [collegeid,setCollegeID]=useState(0);
    const [stream,setStream]=useState([{
        stream_id:0,stream_name:"",stream_description:""
    }]);
    // const[streamid,setStreamID]=useState(0);
    const[streams,setStreams]=useState([]);
    //get Stream Details college wise
    const getStreamOffers=async (e)=>{

        const college_id=e.target.value;

        const uri=`${process.env.REACT_APP_URI}college/coffers/${college_id}`;
        alert(uri)
        const getclgstream=await Axios.get(uri);
        const data=getclgstream.data;
        console.log(getclgstream);
        setCollegeID(college_id);
        ReactSession.set("collegeid",college_id);
        setStreams(data);
        getConvFeeStatus();
        console.log(college_id)
        console.log(data);
    }
    // let eleName,value;
    // const handleInputs=(e)=>{
    //     eleName=e.target.name;
    //     value=e.target.value;
    //     setStream({...stream,[eleName]:value});
    // }

    useEffect(() => {
        if(ReactSession.get("student_id")===null)
        {
            alert("You are not logged in please do login");
            history.push("/")
        }
            getColleges();

            //getRegistrationFeeStatus();
            //getConvFeeStatus();
    },[])


    const getStreamDetails=async (stream_id)=>{
        const api=`${process.env.REACT_APP_URI}stream/${stream_id}`;
        const streamDetails=await Axios.get(api);
        return streamDetails.data
    }



    const [colleges,setColleges]=useState([]);
    const getColleges=async ()=>{
        const res=await Axios.get(`${process.env.REACT_APP_URI}college`);
        const getclg= res.data;
        setColleges(getclg);
    }


    const getConvFeeStatus=async (e)=>{
        if(ReactSession.get("student_id")===null)
        {
            alert("You are not logged in please do login");
            history.push("/")
        }
        const collegeid=ReactSession.get("collegeid")
        const uri=`${process.env.REACT_APP_URI}fee/conv/status/${ReactSession.get("student_id")}/${collegeid}`;
        console.log(uri);
        const convFeeStatus=await Axios.get(uri);
        setConvFeeStatus(convFeeStatus.data.isConvPaid);
        ReactSession.set("ConvFeeStatus",convFeeStatus.data.isConvPaid);
    }

    const getRegistrationFeeStatus=async (e)=>{
        if(e.target.name==="stream_id") {
            const streamid1 = e.target.value;
            alert(streamid1);
            setStreamID(streamid1)
            alert("We are redirecting you to next page for the payment.")
            ReactSession.set("streamid", streamid1);//perfectly fine till
            //streamid is not reflecting
            const uri = `${process.env.REACT_APP_URI}fee/reg/status/${ReactSession.get("student_id")}/${e.target.value}/${collegeid}`;
            console.log(uri);
            const regFeeStatus = await Axios.get(uri);
            ReactSession.set("RegFeeStatus", regFeeStatus.data.isPaid);
            setRegistrationFeeStatus(regFeeStatus.data.isPaid);
            console.log(registrationFeeStatus);
        }
        else{
            console.log("No Stream Selected")
        }
    }



    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">&nbsp;</div>
                    <div className="col-md-6">
                        <div className="card border-secondary mt-3 text-justify">
                            <div className="card-header"><h4 className="card-title"> Apply for Stream</h4></div>
                            <div className="card-body">
                                <div className="container form-floating">
                                    <form method="POST" id="form-admin" >
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <label>College Name</label>
                                                <select  name="college_id" className="form-control"
                                                         // onChange={handleInputs} value={selectDefault}
                                                    onChange={getStreamOffers}
                                                    >
                                                    <option value="0">--Select College--</option>
                                                    {colleges.map(item => {
                                                        console.log(item);
                                                        return <option key={item.college_id} value={item.college_id}> {item.college_name}</option>
                                                    })}
                                                </select>
                                            </div>
                                            {/*Streams offered by the college*/}
                                            <div className="col-md-6 ">
                                                <label>Stream Offers</label>
                                                <select  name="stream_id" className="form-control"
                                                    onChange={getRegistrationFeeStatus}
                                                >
                                                    <option value="0">--Select Stream--</option>
                                                    { streams.length>0?
                                                        streams.map(item => {
                                                     ///   console.log(item);
                                                        return <option key={item.stream_id} value={item.stream_id}> {item.stream_name}</option>
                                                    }): <option > No Stream Found</option>
                                                        }
                                                </select>
                                            </div>

                                            <div className="col-md-6 ">
                                                <label>Convenience Fee Status</label><br/>
                                                {

                                                    convFeeStatus?
                                                        <Link to="#" name="confee_status" className="btn btn-sm btn-success btn-block"
                                                            // onChange={handleInputs} value={selectDefault}
                                                        >Conv. Fee Paid Successfully
                                                        </Link>:
                                                        <Link to={`/student/ConvFee/Payment/${ReactSession.get("student_id")}/${ReactSession.get("collegeid")}`}  name="confee_status" className="btn btn-sm btn-danger btn-block"
                                                            // onClick={gotoConvFeeOption}
                                                        >Proceed for Conv. Fee Payment
                                                        </Link>
                                                }

                                                {/*check the registration fee status
                                                    1. if Paid then show Already Paid and display the amount
                                                    2. if unpaid then show pay first option then goto step 3
                                                    3. after successfull payment all the information stored into the local storage and change the state.*/}


                                            </div>
                                            <div className="col-md-6 ">
                                                <label>Prospectus Fee Status</label><br/>
                                                {

                                                        convFeeStatus && registrationFeeStatus?
                                                            <Link to="#" name="fee_status" className="btn btn-sm btn-success btn-block"
                                                                // onChange={handleInputs} value={selectDefault}
                                                            >Already Applied
                                                            </Link>:
                                                            <Link to={`/student/RegFee/Payment/${ReactSession.get("student_id")}/${streamid}/${ReactSession.get("collegeid")}`}  name="fee_status" className="btn btn-sm btn-danger btn-block"
                                                                // onClick={gotoConvFeeOption}
                                                            >Proceed for Payment
                                                            </Link>
                                                    }

                                                    {/*check the registration fee status
                                                    1. if Paid then show Already Paid and display the amount
                                                    2. if unpaid then show pay first option then goto step 3
                                                    3. after successfull payment all the information stored into the local storage and change the state.*/}


                                            </div>


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

export default  StudentApplied;