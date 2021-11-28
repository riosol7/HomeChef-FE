import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//COMPONENTS
import FeedNavbar from "../components/Feed/FeedNavbar"
import IconBar from "../components/Feed/IconBar";
import ItemList from "../components/Feed/ItemList";
import SideBar from "../components/Feed/SideBar";

import { useChefAPI } from "../context/ChefsContext"

import cookGIF from "./../assets/cook.gif";
import delivery from "./../assets/delivery.jpeg"; 
import profileGIF from "./../assets/profile.gif";
import cartGIF from "./../assets/cart.gif";


export default function Feed (props) {
    const {uId} = useParams()
    const [userData, setUserData] = useState({})
    const { chefsData } = useChefAPI()
    // const [isLoading, setIsLoading] = useState(true)

    const matchChefUserArr = chefsData.filter(chef => chef.user === uId)
    const matchChefUser = matchChefUserArr[0] 
    const matchChefUserId = matchChefUser && matchChefUser.user

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

    //FOR NAVBAR TOTAL AMT OF ITEMS IN CART
    const cartNum = userData.cart && userData.cart.length

    useEffect(() => {
        getUser()
        console.log("userData(ufx):",userData)
        return () => {
            setUserData({});
        };  
          // eslint-disable-next-line
    }, [])

    return (
        <>
            <FeedNavbar 
                uId={uId} 
                history={props.history} 
                cartNum={cartNum} 
                cart={userData.cart} 
                getUser={getUser}
            />
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
                                {
                                    (matchChefUserId === uId)?
                                    <a 
                                    href={`/${uId}/chef`}   
                                    >
                                    <img 
                                        src={cookGIF}
                                        alt='cook'
                                        className='post'
                                        id='cook' 
                                    />
                                    </a> 
                                    :
                                    <a 
                                    href={`/${uId}/newChef`}   
                                    >
                                    <img 
                                        src={cookGIF}
                                        alt='cook'
                                        className='post'
                                        id='cook' 
                                    />
                                    </a>  
                                }
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
                                    href={`/${uId}/profile`}
                                    alt='profile'
                                >
                                <img 
                                    src={profileGIF}
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
                                    src={cartGIF}
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