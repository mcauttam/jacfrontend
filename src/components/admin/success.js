import React, {useEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";

const Success=(props)=>{
    const history=useHistory();
    const isSuccess=props.match.params.isSuccess;
    const componentName=props.match.params.name;
    useEffect(()=>{
        wait(3000);
        //history.push("/admin/dashboard");
    },[])
    const wait=(t)=>{
        return new Promise(resolve => setTimeout(resolve, t))
    }
    return(
        <>
            {
                isSuccess && componentName!==""?
                    <div className="alert alert-success" role="alert">
                        {componentName} has been added successfully.
                    </div>:
                    <div className="alert alert-danger" role="alert">
                        {componentName} has not been added successfully.
                    </div>
            }

            <h5>Please <Link to={"/admin/dashboard"}>Click Here</Link> to move back to Admin Dashboard</h5>

        </>
    )
}

export default Success;