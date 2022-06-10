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
import {ContactUS} from "./components/email/email";
import Login from "./components/Student/login";
import StudentDashboard from "./components/Student/dashboard/dashboard";
import convenienceFee from "./components/admin/convenience-fee/convenienceFee";
import AddConvenienceFee from "./components/admin/convenience-fee/convenienceFee";
import RegistrationForm from "./components/Student/dashboard/RegistrationForm";
import AcademicDetails from "./components/Student/academicDetails/academicDetails";
import StudentApplied from "./components/Student/apply/apply";
import ConvFeePayment from "./components/Student/FeePayment/convenienceFee";
import RegFeePayment from "./components/Student/FeePayment/registrationFee";
import PytmPG from "./components/Student/FeePayment/ptmpg";
import Welcome from "./components/Student/welcome";
import RazorPayComponent from "./components/Student/FeePayment/razorpay/razorpay";
import Success from "./components/admin/success";
import AdminDashboard from "./components/admin/dashboard";
import AddSubjecttoGroup from "./components/admin/groups/addSubject";
import PaymentPayU from "./components/Student/FeePayment/payu/payufront";
import payuresponse from "./components/Student/FeePayment/payu/payuresponse";
import PayUresponse from "./components/Student/FeePayment/payu/payuresponse";
import AdminLogin from "./components/admin/login/login";
import AddRegistrationFee from "./components/admin/registration-fee/registrationFee";
import AddFee from "./components/admin/admission-fee/admission";
import AddCategory from "./components/admin/category/addCategory";
import MakePayment from "./components/Student/FeePayment/payu/redirectToPay";



function App(){
    let history=useHistory();
    return(

        <>
            <Router history={history}>
                <Navbar/>
                {/*<RazorPayComponent/>*/}
                <Switch>
                    <Route exact path="/welcome" component={Welcome}/>
                    {/*Student Block for Admission Process*/}
                    <Route exact path="/" component={StudentBasicRegistration}/>
                    <Route exact path="/newApp" component={NewApp}/>
                    {/*Student Dashboard*/}
                    <Route exact path="/student/dashboard" component={StudentDashboard}/>
                    {/*Login Student*/}
                    <Route exact path="/student/login" component={Login}/>
                    <Route exact path="/student/profile/:id" component={StudentProfile}/>
                    {/*<Route exact path="/student/home" component={()=><Home/>}/>*/}
                    {/*<Route exact path="/student/convenience-fee" component={getConvenienceFeeDetails}/>*/}
                    {/*<Route exact path="/student/registration" component={RegistrationForm}/>*/}
                    <Route exact path="/student/previous/academic" component={AcademicDetails}/>
                    {/*Student Applied for the Stream*/}
                    <Route exact path="/student/applied/stream" component={StudentApplied}/>
                    {/*Convenience Fee Payment module*/}
                    {/*Payment Routes*/}
                    {/*<Route exact path="/payment/student" component={PaymentPayU}/>*/}
                    <Route exact path="/payment/payu/response" component={PayUresponse}/>
                    <Route exact path="/student/ConvFee/Payment" component={ConvFeePayment}/>
                    {/*Registration Fee Payment module*/}
                    <Route exact path="/student/RegFee/Payment/:stid/:strid/:clgid" component={RegFeePayment}/>

                    {/*Make payment online through payu money*/}
                    <Route exact path="/payu/make/payment" component={MakePayment}/>

                    {/*Email Realted Services*/}
                    <Route exact path="/admin/email" component={ContactUS}/>



                    {/*All Admin Routes*/}
                    <Route exact path="/admin" component={AdminLogin}/>
                    <Route exact path="/admin/addCollege" component={AddCollege}/>
                    <Route exact path="/admin/addSubjectType" component={AddSubjectType}/>
                    <Route exact path="/admin/addAdmin" component={AddAdmin}/>{/*College list fetch, pending work*/}
                    <Route exact path="/admin/upAdmin/:id" component={UpdateAdmin}/>
                    <Route exact path="/admin/addStream" component={AddStream}/>
                    <Route exact path="/admin/addSubject" component={AddSubject}/>
                    <Route exact path="/admin/addGroup" component={AddGroup}/>
                    <Route exact path="/admin/addCaste" component={AddCaste}/>
                    <Route exact path="/admin/success/:name/:isSuccess" component={Success}/>
                    <Route exact path="/admin/dashboard" component={AdminDashboard}/>
                    <Route exact path="/admin/subject/group" component={AddSubjecttoGroup}/>
                    <Route exact path="/admin/add/convfee" component={AddConvenienceFee}/>
                    <Route exact path="/admin/add/regfee" component={AddRegistrationFee}/>
                    <Route exact path="/admin/add/fee" component={AddFee}/>
                    <Route exact path="/admin/add/category" component={AddCategory}/>



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
