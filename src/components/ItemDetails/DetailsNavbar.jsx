import React, { useState, useContext} from 'react'
import { Link } from "react-router-dom";

import { clearUserToken } from "../../utils/authToken";

import { UserContext } from "../../context/UserContext"

import { Icon } from '@iconify/react';

//CSS/SASS
import '../../Styles/Navbar.css'

export default function DetailsNavbar (props) {
    const { user, setUser }  = useContext(UserContext)
    const uId = props.uId
    // const cart = props.cart
    const cartNum = props.cartNum
    const cartColOpen = props.cartColOpen
    console.log(cartColOpen)

    // const roundToHundredth = (value) => {
    //     return Number(value.toFixed(2));
    // }

    const [sidebar, setSidebar] = useState(false)

    const sidebarData = [
        {
            title: 'Home',
            path: `/${uId}/feed`,
            icon: <Icon icon='bx:bx-home' className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Cart',
            path:  `/${uId}/checkout`,
            icon: <Icon icon='entypo:shopping-basket' className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Account',
            path: `/${uId}/profile`,
            icon: <Icon icon='ic:baseline-manage-accounts' className='nav-icons'/>,
            cName: 'nav-text'
        },
    ]

    const showSideBar = () => {
        setSidebar(!sidebar)
    }

    const handleLogout = async () => {
        try{
            const logout = await fetch(`http://localhost:9999/auth/logout`, user) 
            const parsedLogout = await logout.json();
            console.log("parsedLogout:",parsedLogout)
            setUser({
                currentUser: null, 
                isAuth: false,
                token: clearUserToken("")
            })
            clearUserToken("")
            props.history.push("/")
        } catch (err) {
            console.log(err)
        }
    }

    //CART NAV MENU
    // const [isOpen, setIsOpen] = useState(false)

    // const totalAmount = cart && cart.map(item => item.total)
    // const subTotal = cart && totalAmount.reduce((a, b) => Number(a) + Number(b), 0)

    // useEffect(() => {
    //     window.addEventListener("scroll", ()=>setIsOpen(false))
    //     return () => 
    //     window.removeEventListener("scroll", setIsOpen(false))
    // }, [])
    

    return(
        <>  
            <div className='navbar'>
                <div className='menu-bars'>
                    <Icon icon='fa-solid:bars' onClick={showSideBar} id='burger'/>
                    <a href={`/${uId}/feed`} id='code'> 
                        code
                        <Icon icon='simple-icons:codechef' id='logo'/>
                        chef 
                    </a>
                </div>
                {/* Cart Modal */}
                <div className='cart-nav'>
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
                {/* sidenav */}
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <div onClick={showSideBar} className='nav-menu-items'>
                        <div className='navbar-toggle'>
                            <div className='menu-bars'>
                                <Icon icon='fa-solid:bars' id='burger'/> 
                            </div>
                        </div>
                        <ul>
                        {sidebarData.map((side, idx) => {
                            return (
                                <li key={idx} className={side.cName}>
                                    <Link to={side.path}>{side.icon}<span>{side.title}</span></Link>
                                </li>
                            )
                        })}
                            <input
                                onClick={handleLogout}
                                type='button'
                                value='logout'
                            />
                        </ul>
                    </div>
                </nav>
            </div>
        </>
       
    )
}