import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {ReactSession} from "react-client-session";
import {Container,Row,Col,Form,FormLabel,FormControl, Button} from "react-bootstrap";



const MakePayment=(props)=>{
    ReactSession.setStoreType("localStorage");
    const [baseURL] = useState(`${process.env.PAYU_URI}`);
    const [title] = useState('Redirect to Payment Gateway');
    const [key, setKey] = useState('gtKFFx');
    const [salt] = useState('wia56q6O');
    var [txnid, setTxnId] = useState("reg_" + ReactSession.get("txnid"));
    if(props.name==="prospectus") {
        setTxnId("reg_" + ReactSession.get("txnid"));
    }else if(props.name==="convenience"){
        setTxnId("conv_" + ReactSession.get("txnid"));
    }else if(props.name==="admission"){
        setTxnId("adm_" + ReactSession.get("txnid"));
    }
    //txnID will be get fromt he props
    const [amount, setAmount] = useState(ReactSession.get("amount"));
    const [firstname, setFirstName] = useState(ReactSession.get("student_name"));
    const [email, setEmail] = useState(ReactSession.get("student_email"));
    const [phone, setPhone] = useState(ReactSession.get("student_mobile"));
    //product info is also get from the props
    const [productinfo, setProductInfo] = useState('Registration');
    if(props.name==="prospectus"){
        setProductInfo('Registration');
    }else if(props.name==="convenience")
    {
        setProductInfo('Convenience');
    }else if(props.name==="admission"){
        setProductInfo('Admission');
    }
    const [surl] = useState(`${process.env.REACT_APP_URI}fee/payu/response`);
    const [furl] = useState(`${process.env.REACT_APP_URI}fee/payu/response`);
    const [hash, setHash] = useState('');

    useEffect(() => {

        if(ReactSession.get("amount")!=="" || ReactSession.get("amount")!==null || ReactSession.get("amount")!==undefined) {
            setAmount(ReactSession.get("amount"))
        }
        Axios.post(`${process.env.REACT_APP_URI}fee/payu/hash`, {key, txnid, amount, productinfo, firstname, email, salt}).then(res=>{
            setHash(res.data.hash);
        });
    }, [key, txnid, amount, productinfo, firstname, email, salt]);






    const calcHash =async (e) => {
        const paymentDetails=await Axios.post(`${process.env.REACT_APP_URI}fee/reg/details`,{
            paymentdetail_id:ReactSession.get("txnid"),paid_amount:amount,payment_status:"Pending",
            college_id:ReactSession.get("collegeid"),
            stream_id:ReactSession.get("streamid"),
            student_id:ReactSession.get("student_id"),
            paymentmaster_id:ReactSession.get("paymentmaster_id")
        });
        alert("We are redirecting you to payment gateway. Kindly follow the procedure to complete the transaction.",paymentDetails)
        console.log(paymentDetails);
        let name = e.target.name;
        let value = e.target.value;
        if(ReactSession.get("amount")!=="" || ReactSession.get("amount")!==null || ReactSession.get("amount")!==undefined) {
            setAmount(ReactSession.get("amount"))
        }
        if(ReactSession.get("student_name")!=="" || ReactSession.get("student_name")!==null || ReactSession.get("student_name")!==undefined) {
            setFirstName(ReactSession.get("student_name"));
            // console.log(ReactSession.get("student_name"));
        }
        if(ReactSession.get("student_email")!=="" || ReactSession.get("student_email")!==null || ReactSession.get("student_email")!==undefined) {
            setEmail(ReactSession.get("student_email"));
        }
        if(ReactSession.get("student_mobile")!=="" || ReactSession.get("student_mobile")!==null || ReactSession.get("student_mobile")!==undefined) {
            setPhone(ReactSession.get("student_mobile"));
        }

    }

    const [confirm1,setConfirm1]=useState(false);
    const Confirmation1=(e)=>{
        alert("Proceed to pay")
        setConfirm1(true);

    }

    // const startPayment=()=> {
    //     alert('Will proceed for the payment');
    //     //Create new payment details. if it is successful then get paymentdetail_id to generate the txnID
    //     //Store all details into the localStorage to make n easy fetch request
    //     //Payment Code placed here
    // }

    return(
        <div className="container text-lg-center mt-4">
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Applied College Name</th>
                    <th>Applied Stream Name</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                </tbody>
            </table>
            <Form action={baseURL} method="post" onSubmit={calcHash}>
                <Form.Control type="hidden" name="key" value={key} onChange={calcHash}></Form.Control>
                <FormControl type="hidden" name="salt" value={salt} onChange={calcHash}></FormControl>
                <FormControl type="hidden" name="txnid" value={txnid} onChange={calcHash}></FormControl>
                <FormControl type="hidden" name="amount" value={amount} onChange={calcHash}></FormControl>
                <FormControl type="hidden" name="firstname" value={firstname} onChange={calcHash}></FormControl>
                <FormControl type="hidden" name="email" value={email} onChange={calcHash}></FormControl>
                <FormControl type="hidden" name="phone" value={phone} onChange={calcHash}></FormControl>
                <FormControl type="hidden" name="productinfo" value={productinfo} onChange={calcHash}></FormControl>
                <FormControl type="hidden" name="surl" value={surl} readOnly></FormControl>
                <FormControl type="hidden" name="furl" value={furl} readOnly></FormControl>
                <FormControl type="hidden" name="hash" value={hash} readOnly></FormControl>
                <button type="submit" className="btn btn-success btn-sm btn-block">Pay</button>
            </Form>
            {/*Registration Fee Payment Module*/}
        </div>
    )
}

export default MakePayment;