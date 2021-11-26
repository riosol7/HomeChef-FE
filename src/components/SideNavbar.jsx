import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
// import {getUserToken} from '../utils/authToken';
import { clearUserToken } from "../utils/authToken";

import { UserContext } from "../context/UserContext"
//REACT-ICONS
import { SiCodechef } from 'react-icons/si'
import { GiCook } from 'react-icons/gi'
import { GiShoppingCart } from 'react-icons/gi'
import { MdManageAccounts } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
//CSS/SASS
import '../Styles/Navbar.css'

export default function SideNavbar (props) {
    // const path = props.location.pathname
    const {setUser}  = useContext(UserContext)
    const uId = props.uId
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
            path: `/${uId}/chef`,
            icon: <GiCook className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Cart',
            path: '#',
            // path: `/${props.uId}/cart`,
            icon: <GiShoppingCart className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Account',
            path: '#',
            // path: `/${props.uId}/profile`,
            icon: <MdManageAccounts className='nav-icons'/>,
            cName: 'nav-text'
        },
    ]

    const showSideBar = () => {
        setSidebar(!sidebar)
    }

    const handleLogout = async () => {
        try{
            const config = {
                method:"GET",
                body: JSON.stringify(),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${clearUserToken()}`
                }
            };
            const logout = await fetch(`http://localhost:9999/auth/logout`, config) 
            const parsedLogout = await logout.json();
            console.log("parsedLogout:",parsedLogout)
            setUser({
                currentUser: null, 
                isAuth: false,
                token: ""
            })
            clearUserToken()
            props.history.push("/")
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <>  
            <div className='navbar'>
                <div className='menu-bars'>
                    <FaBars onClick={showSideBar} id='burger'/>
                    <a href='/' id='code'> code<SiCodechef id='logo'/>chef </a>
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