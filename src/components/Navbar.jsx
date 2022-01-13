import React, { useState } from 'react'

import UserNavMenu from "./UserNavMenu"

import { Icon } from '@iconify/react';

//CSS/SASS
import '../Styles/Navbar.css'

export default function DetailsNavbar (props) {
    const uId = props.uId
    const userData= props.userData && props.userData
    // const cart = props.cart
    const cartNum = props.cartNum
    const cartColOpen = props.cartColOpen


    // const roundToHundredth = (value) => {
    //     return Number(value.toFixed(2));
    // }


    const [userNav, setUserNav] = useState(false)
    const openUserNav = () => {
        setUserNav(true)
    }
    const closeUserNav = () => {
        setUserNav(false)
    }
    

    return(
        <>  
            <div className='navbar'>
                <div className='menu-bars'>
                    <a href={`/${uId}/feed`} id='code'> 
                        code
                        <Icon icon='simple-icons:codechef' id='logo'/>
                        chef 
                    </a>
                </div>
                {/* Cart Modal */}
                <div className='cart-nav'>
                    <div className='d-flex align-items-center'>
                        <div 
                            className='d-flex align-items-center mx-2' 
                            onMouseEnter={openUserNav}
                            onMouseLeave={closeUserNav}
                        > 
                            <a 
                                href={`/${uId}/profile`} 
                                className='text-decoration-none text-reset d-flex align-items-center'
                                style={{
                                    zIndex:'2'
                                }}
                            > 
                                <p
                                    style={{
                                       
                                    }} 
                                    className='m-0 mx-2'
                                >{userData.user}</p>
                                <Icon 
                                    icon='zmdi:account-circle'
                                    style={{
                                        fontSize:'2.23rem',
                                        marginRight:'2rem',
                                       
                                    }}
                                />
                            </a>
                            {
                                userNav ? 
                                <UserNavMenu 
                                    userNav={userNav}
                                    setUserNav={setUserNav}
                                    userData={userData}
                                    cartColOpen={cartColOpen}
                                />
                                :
                                <>
                                </>
                            }
                        </div>
                    {
                        cartNum !== undefined ?
                        <>
                            <button
                                id='cartBtn' 
                                onClick={() => props.setCartColOpen(!cartColOpen)}
                            >
                                <Icon icon='entypo:shopping-basket' id='cart'/>
                                {
                                    cartNum === 0 ?
                                    <>
                                    </>
                                    :
                                    <p id='cartItemCount'>{cartNum}</p>
                                }
                            </button>
        
                        </>
                        :
                        <>
                            <button
                                id='cartBtn' 
                                onClick={() => props.setCartColOpen(!cartColOpen)}
                            >
                                <Icon icon='entypo:shopping-basket' id='cart'/>
                                {
                                    cartNum === 0 ?
                                    <>
                                    </>
                                    :
                                    <p id='cartItemCount'>{cartNum}</p>
                                }
                            </button>
                        </>
                    }
                    </div>
                </div>
            </div>
        </>
       
    )
}