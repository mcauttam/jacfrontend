import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router, Link, Redirect, Switch, Route} from "react-router-dom";
import {Container,Row,Col,Form,FormLabel,FormControl, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import {ReactSession} from "react-client-session";
import {getUID} from "bootstrap/js/src/util";

const PayUresponse= ()=>{
    ReactSession.setStoreType("localStorage");
    const [txnid, setTxnId] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [paid,setPaid]=useState(false);
    useEffect(  () => {
        let paid1=false;
        Axios.get(`${process.env.REACT_APP_URI}fee/payu/getresponse`).then(res=>{
            setTxnId(res.data.txnid);
            setAmount(res.data.amount);
            setStatus(res.data.status);
            console.log(res);
            if(res.data.status==="success") {
                setPaid(true);
                paid1 = true;
                console.log(txnid);
                // while(elements[1]==='undefined'){}
                const elements=txnid.split('_')
                console.log(elements[1]);

                Axios.put(`${process.env.REACT_APP_URI}fee/reg/details/${elements[1]}`, {
                    payment_status: "success",
                }).then(()=>{
                    ReactSession.set("RegFeeStatus",true);
                }).catch(err=>console.log(err));
                //update Applied Stream Prospectus Fee Status
                // Axios.put(`${process.env.REACT_APP_URI}fee/reg/update/${elements[1]}`, {
                //     payment_status: "success",
                // }).then(()=>{
                //     res.send({
                //         message:"Update Applied Stream Table successfully",
                //     })
                //     // ReactSession.set("RegFeeStatus",true);
                // }).catch(err=>console.log(err));
            }
        }).catch(err=>{
            console.log(err);
        });
        console.log(paid);
        getFurtherDetails();
    }, [txnid, amount, status]);

    const [college,setCollege]=useState('');
    const [stream,setStream]=useState('')
    const getFurtherDetails=async ()=>{
        const collegeid=ReactSession.get("collegeid");
        const streamid=ReactSession.get("streamid");
        await Axios.get(`${process.env.REACT_APP_URI}college/${collegeid}`).then((res)=>{
            setCollege(res.data.college_name);
        }).catch(err=>{
            console.log(err);
        })
        await Axios.get(`${process.env.REACT_APP_URI}stream/${streamid}`).then((res)=>{
            setStream(res.data.stream_name);
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        // <Container>
        //     <Row>
        //         <Col>TxnId</Col>
        //         <Col>{txnid}</Col>
        //     </Row>
        //     <Row>
        //         <Col>Amount</Col>
        //         <Col>{amount}</Col>
        //     </Row>
        //     <Row>
        //         <Col>Status</Col>
        //         <Col>{status}</Col>
        //     </Row>
        //     {/*{*/}
        //     {/*    redirect?*/}
        //     {/*        <Redirect to={'/'} >Test</Redirect>*/}
        //     {/*}*/}
        // </Container>
        <div className="container">
            <div className="row">
                {/*table.table.table-hover>tr.table-dark>td**/}
                <div className="col-md-3">&nbsp;</div>
                <div className="col-md-6">
                    <div className="container">
                        <div className="row mt-4">
                            <div className="container text-center">
                                <h4 className="fw-bold  form-control">Amount Paid: &nbsp;&nbsp;&nbsp;{amount}</h4>
                            </div>

                            <div className="card bg-light mb-3" >
                                <div className="card-header text-center"><h4>{ReactSession.get("student_name")}</h4></div>
                                <div className="card-body">
                                    <div className="container text-left">
                                        <div className="row">
                                            <div className="fw-bold col-md-12">Transaction ID: <span className="fw-normal"> {txnid}</span></div>
                                            <div className="fw-bold col-md-5">Stream:</div>
                                            <div className="col-md-6">{stream}</div>
                                            <div className="fw-bold col-md-5">College:</div>
                                            <div className="col-md-6">{college}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <button onClick={()=>window.print()} className="btn btn-sm btn-success">Print</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">&nbsp;</div>
            </div>
        </div>
    );
}

export default PayUresponse