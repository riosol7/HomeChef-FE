import React from 'react'
import cookGIF from "../../assets/cook.gif";
import delivery from "../../assets/delivery.jpeg"; 
import profileGIF from "../../assets/profile.gif";
// import cartGIF from "../../assets/cart.gif";
//ICONIFY
import { Icon } from '@iconify/react';

export default function Banner(props) {
    const uId = props.uId
    const matchChefUser = props.matchChefUser
    const matchChefUserId = props.matchChefUserId
    return (
        <div className='row'>
            <div className='col-md-3 p-4'>
                {
                    (matchChefUserId === uId)?
                    <a 
                        href={`/${uId}/admin/${matchChefUser._id}`}   
                    >
                    <img 
                        src={cookGIF}
                        alt='cook'
                        className='post'
                        id='cook' 
                    />
                    </a> 
                    :
                    <a 
                    href={`/${uId}/newChef`}   
                    >
                    <img 
                        src={cookGIF}
                        alt='cook'
                        className='post'
                        id='cook' 
                    />
                    </a>  
                }
            </div> 
            <div 
                // id='delivery' 
                className='col-md-6 pt-2'   
                // style={{
                //     background:'#feffcd',
                //     borderRadius:'4px',
                // }}
            >
                <div 
                id='delivery' 
                    className='d-flex p-2'
                    style={{
                        background:'#feffcd',
                        borderRadius:'4px',
                    }}
                >
                    <div className='col-lg-6 p-2 pt-5'>
                        <h4 
                            className='display-1 pt-5 px-1'
                            style={{
                                fontSize:'2.4rem',
                                // color:'#f53783',
                            }}
                        >
                            Start Delivering Today
                        </h4>
                        <div className='d-flex px-1'>
                            <Icon 
                                icon="ic:baseline-directions-bike" 
                                style={{
                                    fontSize:'1.2rem',

                                }}
                            />
                            <p className='text-muted m-0 mx-2'>Feature Coming Soon</p>
                        </div>
                    </div>
                    <div
                    style={{
                        width:'28rem',
                    
                    }}
                    >
                        <img 
                            src={delivery}
                            alt='delivery'
                            className='post'
                            id='deliveryGIF'
                        />
                    </div>
                </div>
            </div> 
            <div className='col-md-3 p-4'>
                <a 
                    href={`/${uId}/profile`}
                    alt='profile'
                >
                <img 
                    src={profileGIF}
                    alt='profile'
                    className='post'
                    id='profile'
                /></a>
            </div> 
            {/* <div className='col-md-3 p-2'>
                <a 
                    href={`/${uId}/checkout`}
                    alt='cart'
                >
                <img 
                    src={cartGIF}
                    alt='cart'
                    className='post'
                    id='cart'
                /></a>
            </div> */}
        </div>  
    )
}
