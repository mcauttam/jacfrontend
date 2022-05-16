import React,{Component, useState,} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Redirect, Switch, useHistory, Link} from "react-router-dom";
import Navbar from "./navigation/navbar";
import StudentBasicRegistration from "./components/Student/studentBasicRegistration";
import Home from "./components/Student/Home";
import NewApp from "./components/Student/newApp";
import Error404 from "./components/404";
import StudentProfile from "./components/Student/studentProfile";
import AddCollege from "./components/admin/college/addCollege";
import AddSubjectType from "./components/admin/subject-type/addSubjectType";
import AddAdmin from "./components/admin/collegeadmin/addAdmin";
import AddStream from "./components/admin/stream/addStream";
import AddSubject from "./components/admin/subject/addSubject";
import AddGroup from "./components/admin/groups/addGroup";
import AddCaste from "./components/admin/caste/addCaste";
import UpdateAdmin from "./components/admin/collegeadmin/upAdmin";



function App(){
    let history=useHistory();
    return(

        <>
            <Router history={history}>
                {/*<Navbar/>*/}
                <Switch>
                    <Route exact path="/" component={StudentBasicRegistration}/>
                    <Route exact path="/newApp" component={NewApp}/>
                    <Route exact path="/profile/:id" component={()=><StudentProfile/>}/>
                    <Route exact path="/student/home" component={()=><Home/>}/>
                    {/*All Admin Routes*/}
                    <Route exact path="/admin/addCollege" component={AddCollege}/>
                    <Route exact path="/admin/addSubjectType" component={AddSubjectType}/>
                    <Route exact path="/admin/addAdmin" component={AddAdmin}/>{/*College list fetch, pending work*/}
                    <Route exact path="/admin/upAdmin/:id" component={UpdateAdmin}/>
                    <Route exact path="/admin/addStream" component={AddStream}/>
                    <Route exact path="/admin/addSubject" component={AddSubject}/>
                    <Route exact path="/admin/addGroup" component={AddGroup}/>
                    <Route exact path="/admin/addCaste" component={AddCaste}/>
                    {/*All Student's Routes*/}

                    <Route path="*" component={()=><Error404/>}/>
                </Switch>
            </Router>

        </>
    )
}

// function App(){
//     return(
//         <div>
//             <Navbar/>
//             <StudentBasicRegistration/>
//         </div>
//     )
// }



// function App(){
//     const [student_email, setStudent_email]=useState('');
//     const [student_password, setStduent_Password]=useState('');
//
//     const [loginStatus,setLoginStatus]=useState("");
//     const Login=()=>{
//         Axios.post('http://localhost:5000/auth/student/login',{
//             student_email:student_email,
//             student_password:student_password
//         }).then((response)=>{
//             if(response.data.message){
//                 setLoginStatus(response.data.message);
//             }
//             else{
//                 Axios.post('http://localhost::5000/student/get',{
//                     headers:{
//                         authTokenStudent:response.data.student_token,
//                     }
//                 });
//                 console.log(response.data)
//                 //setLoginStatus(response.data.student_name)
//             }
//         }).catch(err=>{
//             console.log(err);
//         })
//         //alert('Hello')
//     }
//
// return(
//
// )
// }


export default App;
