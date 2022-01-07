import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import CartModal from "../../components/Feed/CartModal"
import CartModalItem from "./CartModalItem"
import UserNavMenu from "../../components/UserNavMenu"
import { Icon } from '@iconify/react';

//CSS/SASS
import '../../Styles/Navbar.css'

export default function FeedNavbar (props) {
    const uId = props.uId
    const userData= props.userData
    const cart = props.cart
    const cartNum = props.cartNum

    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }
    
    //CART NAV MENU
    const [isOpen, setIsOpen] = useState(false)

    const totalAmount = cart && cart.map(item => item.total)
    const subTotal = cart && totalAmount.reduce((a, b) => Number(a) + Number(b), 0)
    
    const [userNav, setUserNav] = useState(false)
    const openUserNav = () => {
        setUserNav(true)
    }
    const closeUserNav = () => {
        setUserNav(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", ()=>setIsOpen(false))
        return () => 
        window.removeEventListener("scroll", setIsOpen(false))
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", ()=>setUserNav(false))
        return () => 
        window.removeEventListener("scroll", setUserNav(false))
    }, [])

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
                        <div className='d-flex align-items-center' onMouseEnter={openUserNav} onMouseLeave={closeUserNav}> 
                            <p className='m-0 mx-2'>{userData.user}</p>
                            <Icon 
                                icon='zmdi:account-circle'
                                style={{
                                    fontSize:'2.2rem',
                                    marginRight:'2rem',
                                }}
                            />
                            {
                                userNav ? 
                                <UserNavMenu 
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
                                onClick={() => setIsOpen(true)}
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
                            <CartModal open={isOpen} onClose={() => setIsOpen(false)}>
                                <div className='container pt-3 pb-3'>
                                    {
                                        cart && cart.map((item, index) => (
                                            <CartModalItem
                                                key={index}
                                                cartItem={item}
                                                id={item._id} 
                                                qty={item.qty} 
                                                history={props.history}  
                                                getUser={props.getUser}    
                                            />
                                        ))
                                    }
                                </div>
                                <Link
                                    to={`/${uId}/checkout`}
                                >
                                    <input
                                        type='button'
                                        value={`Checkout $${roundToHundredth(subTotal)}`}
                                    />
                                </Link>
                            </CartModal>
                        </>
                        :
                        <>
                            <button
                                id='cartBtn' 
                                onClick={() => setIsOpen(true)}
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