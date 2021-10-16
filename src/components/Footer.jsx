import React from "react";
//REACT-ICONS
import { SiCodechef } from 'react-icons/si'
//ICONIFY
import { Icon } from '@iconify/react';

export default function Footer () {

    return(
        <>
            <footer className="container-fluid pt-5 pb-5">
                <div className="row pb-3">    
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8 p-3">
                        <a href='/' id='footer-title'> code<SiCodechef id='footer-logo'/>chef </a>
                        <div className="row pt-5">
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                                <h5 className='pb-3'>Future Implementations</h5>
                                <div className='row'>
                                    <p className='mx-4'> <Icon icon="logos:paypal" className='footer-icons mx-1'/> Paypal API </p> 
                                </div>
                                <div className='row'>
                                    <p className='mx-4'> <Icon icon="ic:baseline-directions-bike" className='footer-icons mx-1'/> Delivery Account </p>
                                </div>
                                <div className='row'>
                                    <p className='mx-4'> <Icon icon="flat-color-icons:google" className='footer-icons mx-1'/>  Google Auth </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">

                    </div>
                </div>
                <div className="container border-top pt-3">
                    <div className="row">
                        <div className="col-md-2">
                            <a href="https://www.linkedin.com/in/piraiojeda/"><Icon icon="akar-icons:linkedin-fill" className='footer-icons mx-1'/></a>
                            <a href="https://github.com/riosol7"><Icon icon="bytesize:github" className='footer-icons mx-1'/></a>
                        </div>
                        <div className="col-md-8">
                        </div>
                        <div className="col-md-2 d-flex justify-content-end"> 
                            <p className='text-muted'>© 2021 Code Chef Inc.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}