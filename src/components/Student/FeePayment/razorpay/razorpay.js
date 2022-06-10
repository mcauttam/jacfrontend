import React, {useState} from 'react';
import {ReactSession} from "react-client-session";

const RazorPayComponent=(props)=>{
    ReactSession.setStoreType("localStorage");
    const amt=ReactSession.get("amount")>=0?ReactSession.get("amount"):"";
    const ft=ReactSession.get("fee-type");
    const [amount,setState]=useState(amt);
    const [feetype,setFeeType]=useState(ft);
    const handlePayment=()=>{
        //e.preventDefault();
        if(amount===""){
            alert("Please contact to your administrator regarding the fee details.")
            return;
        }
        else if(amount===0){
            //proceed to registration confirmation fee page
        }
        else{
            //proceed to payment gateway
            var options={
                key:"rzp_test_aFg9So4EqiXVap",
                key_secret:"YvmAwuC4pdnvqKI2QtUHdD6C",
                amount:amount*100,
                currency:"INR",
                name:"Convenience Fee",
                description:"This fee is charged for the convenience only.",
                handler:function(response){
                    console.log(response.razorpay_payment_id);
                    // fetch(``)
                },
                prefill:{
                    student_name:ReactSession.get("student_name"),
                    student_email:ReactSession.get("student_email"),
                    student_mobile:ReactSession.get("student_mobile"),

                },
                theme:{
                    color:'#006491',
                },
            };

            var paymentObject=new window.Razorpay(options);
            paymentObject.open();
        }
    }
    return(
        <>
            <h4>Please click on the confirm button to confirm the payment</h4>
            <button onClick={handlePayment}>confirm to pay</button>
        </>
    )
}

export default RazorPayComponent;