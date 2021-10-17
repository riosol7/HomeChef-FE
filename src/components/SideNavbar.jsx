import React, { useState } from 'react'
import { Link } from "react-router-dom";
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
    const [sidebar, setSidebar] = useState(false)

    const sidebarData = [

        {
            title: 'Home',
            path: `/${props.uId}/feed`,
            icon: <BiHome className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Cook',
            path: `/${props.uId}/chef`,
            icon: <GiCook className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Cart',
            path: `/${props.uId}/cart`,
            icon: <GiShoppingCart className='nav-icons'/>,
            cName: 'nav-text'
        },
        {
            title: 'Account',
            path: `/${props.uId}/newChef`,
            icon: <MdManageAccounts className='nav-icons'/>,
            cName: 'nav-text'
        },
    ]

    const showSideBar = () => {
        setSidebar(!sidebar)
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
                                <li key={side._id} className={side.cName}>
                                    <Link to={side.path}>{side.icon}<span>{side.title}</span></Link>
                                </li>
                            )
                        })}
                        </ul>
                    </div>
                </nav>
            </div>
        </>
       
    )
}