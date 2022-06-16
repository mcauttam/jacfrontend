import React from "react";


const ArrowHeader=(props)=>{
    return(
        <div className="container-fluid text-center mt-5 border-bottom">

           <button className="btn btn-success mb-2 mx-1" disabled={props.form==="basic"?false:true}>Basic Information</button>
            <button className="btn btn-warning mb-2 mx-1" disabled={props.form==="detail"?false:true}>Personal Information</button>
            <button className="btn btn-info mb-2 mx-1" disabled={props.form==="school"?false:true}>Previous School </button>
            <button className="btn btn-primary mb-2 mx-1" disabled={props.form==="academic"?false:true}>Academic Details </button>
            <button className="btn btn-dark mb-2 mx-1" disabled={props.form==="stream"?false:true}>Apply for Stream </button>
            <button className="btn btn-success mb-2 mx-1" disabled={props.form==="pay"?false:true}>Payment Details</button>
            <button className="btn btn-danger mb-2 mx-1" disabled={props.form==="confirm"?false:true}>Confirm the Details</button>
        </div>
    )
}

export default ArrowHeader;