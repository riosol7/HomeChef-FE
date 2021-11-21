import React, {useState, useEffect } from "react";
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
    const [userData, setUserData] = useState({})
    // const [isLoading, setIsLoading] = useState(true)

    const getUser = async () => {
        try { 
            const user = await fetch(`http://localhost:9999/${uId}`)
            const parsedUser = await user.json()
            console.log("getUser:", parsedUser)
            setUserData(parsedUser)
            // setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const cartNum = userData.cart && userData.cart.length
    console.log("cartNum:",cartNum)

    useEffect(() => {
        getUser()
        console.log("userData(ufx):",userData)
        // eslint-disable-next-line  
    }, [])

    return (
        <>
            <SideNavbar uId={uId} />
            {/* POST BAR */}
            <div className='container-fluid pb-3 pt-5'>
                <div className='row'>
                    <div className='col-lg-1'>

                    </div>
                    <div className='col-lg-10'>
                    <div className='row'>
                    <div className='col-md-3 p-3'>
                        <div className='post-header'>
                            Start Cooking
                        </div>
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
                    <div className='col-md-3 p-3'>
                        <img 
                            src={delivery}
                            alt='delivery'
                            className='post'
                            id='delivery'
                        />
                    </div> 
                    <div className='col-md-3 p-3'>
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
                    <div className='col-md-3 p-3'>
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
                    <div className='col-lg-1'>

                    </div> 
                </div>     
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-1'>

                    </div>
                    <div className='col-lg-10'>
                        {/* TAG BAR */}
                        <IconBar />
                    </div>
                    <div className='col-lg-1'>

                    </div>
                </div>
                <div className='row'>
                        {/* ALL CHEF ITEMS */}
                        <ItemList history={props.history} getUser={getUser}/>
                 
                        {/* SIDEBAR */}
                        <SideBar />
              
                </div>
            </div>  
        </>
    )
}