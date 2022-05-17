import React, {useRef} from "react";
import emailjs from '@emailjs/browser';

export const ContactUS=()=>{
    const form=useRef();
    var min=1000;
    var max=9999;
    var rand =  min + parseInt(Math.random() * (max-min));
    const sendEmail=()=>{
        // e.preventDefault();

        emailjs.send('service_blr0m7s','template_502hfoe',{otp:rand},'U-YSM0AIexYivIW0l')
            .then((result)=>{
                console.log(result);
            }).catch(err=>{
                console.log(err);
        })
    };
    sendEmail();
    return(
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="otp" />
            <input type="submit" value="Send" />
        </form>
    )
}