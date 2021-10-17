import React from 'react'
// import { Link, useParams } from "react-router-dom";
//REACT-ICONS
import { SiCodechef } from 'react-icons/si'
// import { GiCook } from 'react-icons/gi'
// import { GiShoppingCart } from 'react-icons/gi'
// import { MdManageAccounts } from "react-icons/md";
// import { FaBars } from "react-icons/fa";
// import { BiHome } from "react-icons/bi";
//CSS/SASS
import '../Styles/Navbar.css'

export default function Navbar (props) {
    // const {uId} = useParams()
    // const [sidebar, setSidebar] = useState(false)

    // const sidebarData = [

    //     {
    //         title: 'Home',
    //         path: "/",
    //         icon: <BiHome/>,
    //         cName: 'nav-text'
    //     },
    //     {
    //         title: 'Cook',
    //         path: `/${uId}/chef`,
    //         icon: <GiCook/>,
    //         cName: 'nav-text'
    //     },
    //     {
    //         title: 'Cart',
    //         path: `/${uId}/cart`,
    //         icon: <GiShoppingCart/>,
    //         cName: 'nav-text'
    //     },
    //     {
    //         title: 'Account',
    //         path: `/${uId}/newChef`,
    //         icon: <MdManageAccounts/>,
    //         cName: 'nav-text'
    //     },
    // ]

    // const showSideBar = () => {
    //     setSidebar(!sidebar)
    // }

    return(
        <>  
            <div className='navbar-transparent'>
                <div className='menu-bars'>
                    {/* <FaBars onClick={showSideBar} id='burger'/> */}
                    <a href='/' id='code'> code<SiCodechef id='logo'/>chef </a>
                </div>
                {/* sidenav
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
                </nav> */}
            </div>
        </>
       
    )
}