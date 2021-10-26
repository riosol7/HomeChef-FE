import React from "react";
import { useParams } from "react-router-dom";
//COMPONENTS
import SideNavbar from "../components/SideNavbar"
import IconBar from "../components/IconBar";
import ItemList from "../components/ItemList";
import SideBar from "../components/SideBar";


export default function Feed (props) {
    const {uId} = useParams()


    return (
        <>
            <SideNavbar uId={uId} />
            {/* POST BAR */}
            <div className='pb-3 pt-5 m-5'>
                <div className='row'>
                    <div className='col-sm-1'>
                        {/* LEAVE EMPTY */}
                    </div>
                        <div className='col-lg-10'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <a 
                                        href={`/${uId}/chef`}   
                                    >
                                    <img 
                                        src="https://i.pinimg.com/originals/23/cc/52/23cc5291fa261322336a405e45fc0cf7.gif"
                                        alt='post'
                                        className='post'
                                        id='cook' 
                                    />
                                    </a>    
                                </div> 
                                <div className='col-md-3 '>
                                    <img 
                                        src="https://wallpaperaccess.com/full/6221127.jpg"
                                        alt='post'
                                        className='post'
                                        id='delivery'
                                    />
                                </div> 
                                <div className='col-md-3 '>
                                    <a 
                                        href={`/${uId}/newChef`}
                                        alt='profile'
                                    >
                                    <img 
                                        src="https://i.pinimg.com/originals/9e/65/0e/9e650eec5e16ec899c75ce363ec66061.gif"
                                        alt='post'
                                        className='post'
                                        id='profile'
                                    /></a>
                                </div> 
                                <div className='col-md-3 '>
                                    <img 
                                        src="https://cdn.dribbble.com/users/992181/screenshots/5378811/cart.gif"
                                        alt='post'
                                        className='post'
                                        id='cart'
                                    />
                                </div> 
                            </div>
                        </div>
                    <div className='col-sm-1'>
                        {/* LEAVE EMPTY */}
                    </div>
                </div>    
            </div>
            <div className='container'>
                {/* TAG BAR */}
                <IconBar />
                <br/>
                <div className='row'>
                    {/* ALL CHEF ITEMS */}
                    <ItemList />
                    {/* SIDEBAR  */}
                    <SideBar />
                </div>
            </div>  
        </>
    )
}