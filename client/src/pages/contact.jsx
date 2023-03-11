import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import emailjs from 'emailjs-com'
import { useRef } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import useTitle from '../hooks/useTitle';

function Contact() {
    useTitle('Contact | Cosmic Management')
    const form = useRef();

    const navigate = useNavigate()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_mh2ahf9', 'template_h4mtetb', form.current, '8UZnZL5QfIcbgvfdU')
            .then((result) => {
                console.log(result.text);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Message Sent, I will send you my message soon',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    navigate(0)
                }, 1500)
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <main className='contact'>
            <div className='contact-info'>
                <ul className='contact-list'>
                    <li>
                        <EmailIcon />
                        <p>andresdieztuberquia@gmail.com</p>
                    </li>
                    <li>
                        <LocalPhoneIcon />
                        <p>+57 3206038171</p>
                    </li>
                    <li>
                        <LinkedInIcon />
                        <a href="https://www.linkedin.com/in/andressantiagodiez/">LinkedIn</a>
                    </li>
                </ul>
            </div>
            <div className='contact-form-container'>
                <div className='contact-title'>
                    <h1>Let's <span>Talk</span></h1>
                </div>
                <form ref={form} onSubmit={sendEmail} className='contact-form'>
                    <div className='contact-form-top'>
                        <input type="text"
                            name='user_name'
                            placeholder='Your Name'
                            required
                        />
                        <input type="email"
                            name='user_email'
                            placeholder='Your email'
                            required
                        />
                    </div>
                    <div className='contact-form-bottom'>
                        <textarea name="message"
                            cols="30" rows="5"
                            placeholder='Your message'
                            required
                        ></textarea>
                    </div>
                    <div className='contact-btn'>
                        <button className='contact-submit' type='submit' >Send</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Contact
