import React, { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
// import {getUserToken} from '../utils/authToken';
import { clearUserToken } from "../../utils/authToken";

import { UserContext } from "../../context/UserContext"
import CartModal from "../../components/Feed/CartModal"
import CartMenuQty from "../../components/Feed/CartMenuQty"
//REACT-ICONS
import { SiCodechef } from 'react-icons/si'
import { GiCook } from 'react-icons/gi'
import { GiShoppingCart } from 'react-icons/gi'
import { MdManageAccounts } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
//CSS/SASS
import '../../Styles/Navbar.css'

export default function FeedNavbar (props) {
    // const path = props.location.pathname
    const { user, setUser }  = useContext(UserContext)
    const uId = props.uId
    const cart = props.cart
    const cartNum = props.cartNum

    const [sidebar, setSidebar] = useState(false)

    const sidebarData = [
        {
            title: 'Home',
            path: `/${uId}/feed`,
            icon: <BiHome className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Cook',
            // path: `/${uId}/chef/${cId}`,
            icon: <GiCook className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Cart',
            path:  `/${uId}/checkout`,
            icon: <GiShoppingCart className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Account',
            path: `/${uId}/profile`,
            icon: <MdManageAccounts className='nav-icons'/>,
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
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", ()=>setIsOpen(false))
        return () => 
        window.removeEventListener("scroll", setIsOpen(false))
    }, [])
    

    return(
        <>  
            <div className='navbar'>
                <div className='menu-bars'>
                    <FaBars onClick={showSideBar} id='burger'/>
                    <a href='/' id='code'> code<SiCodechef id='logo'/>chef </a>
                </div>
                <div className='cart-nav'>
                    {
                        cartNum !== undefined ?
                        <>
                            <input
                                id='cartBtn' 
                                type='button' 
                                value={`${cartNum} Cart`}
                                onClick={() => setIsOpen(true)}
                            />
                            <CartModal open={isOpen} onClose={() => setIsOpen(false)}>
                                <div className='container pt-3 pb-3'>
                                    {
                                        cart && cart.map((item, idx) => (
                                        <div key={idx} className='row'>
                                            <div className='col-md-3'>
                                                <CartMenuQty 
                                                    id={item._id} 
                                                    qty={item.qty} 
                                                    history={props.history}  
                                                    getUser={props.getUser}    
                                                />
                                            </div>
                                            <div className='col-md-7'>
                                                <p>{item.item.title}</p>
                                            </div>
                                            <div className='col-md-2 d-flex justify-content-end'>
                                                <p>${item.total}</p>
                                            </div>
                                        </div>
                                        ))
                                    }
                                </div>
                                <Link
                                    to={`/${uId}/checkout`}
                                >
                                    <input
                                        type='button'
                                        value={`Checkout`}
                                    />
                                </Link>
                            </CartModal>
                        </>
                        :
                        <>
                            <input
                                id='cartBtn' 
                                type='button' 
                                value='Cart'
                            />
                        </>
                    }
                </div>
                {/* sidenav */}
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <div onClick={showSideBar} className='nav-menu-items'>
                        <div className='navbar-toggle'>
                            <div className='menu-bars'>
                                <FaBars id='burger'/> 
                            </div>
                        </div>
                        <ul>
                        {sidebarData.map(side => {
                            return (
                                <>
                                    <li key={side._id} className={side.cName}>
                                        <Link to={side.path}>{side.icon}<span>{side.title}</span></Link>
                                    </li>
                                </>
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