import React from "react";
import { useParams } from "react-router-dom";
//COMPONENTS
import SideNavbar from "../components/SideNavbar"
import IconBar from "../components/IconBar";
import ItemList from "../components/ItemList";
import SideBar from "../components/SideBar";

import cook from "./../assets/cook.gif";
import delivery from "./../assets/delivery.jpeg"; 
import profile from "./../assets/profile.gif";
import cart from "./../assets/cart.gif";


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
                                        src={cook}
                                        alt='cook'
                                        className='post'
                                        id='cook' 
                                    />
                                    </a>    
                                </div> 
                                <div className='col-md-3'>
                                    <img 
                                        src={delivery}
                                        alt='delivery'
                                        className='post'
                                        id='delivery'
                                    />
                                </div> 
                                <div className='col-md-3'>
                                    <a 
                                        href={`/${uId}/newChef`}
                                        alt='profile'
                                    >
                                    <img 
                                        src={profile}
                                        alt='profile'
                                        className='post'
                                        id='profile'
                                    /></a>
                                </div> 
                                <div className='col-md-3'>
                                    <a 
                                        href={`/${uId}/checkout`}
                                        alt='cart'
                                    >
                                    <img 
                                        src={cart}
                                        alt='cart'
                                        className='post'
                                        id='cart'
                                    /></a>
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
                    <ItemList history={props.history}/>
                    {/* SIDEBAR  */}
                    <SideBar />
                </div>
            </div>  
        </>
    )
}