import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {getUserToken} from '../../utils/authToken'

import DetailsNavbar from "../../components/ItemDetails/DetailsNavbar"
import MiniIconBar from "../../components/Chef/MiniIconBar"
import AllItems from "../../components/Chef/Allitems"
import Ad from "../../components/Chef/Ad"
import ReviewsCol from "../../components/Chef/ReviewsCol"

// import ItemModal from "../../components/Feed/ItemModal";
import CartCol from "../../components/ItemDetails/CartCol";

import { Icon } from '@iconify/react';

export default function Chef(props) {
    const {uId} = useParams()
    const chefId = props.match.params.id 
    const [cartColOpen, setCartColOpen] = useState(false)
    const [cart, setCart] = useState([])
    const [user, setUser] = useState({})
    const [chefData, setData] = useState({})
    // const [isChefLoading, setIsChefLoading] = useState(true)

    // const [isOpen, setIsOpen] = useState(false)
    // const [itemModal, setItemModal] = useState({})

    // const viewItemModalClick = (data) => {
    //     setIsOpen(true)
    //     setItemModal(data)
    // }

    // const closeModal = () => {
    //     setIsOpen(false)
    //     setItemModal({})
    // }

    const getUser = async () => {
        try{
            const user = await fetch(`http://localhost:9999/${uId}`)
            const parsedUser = await user.json()
            setUser(parsedUser)
        } catch (err) {
            console.log(err)
        };
    };

    const getCart = async (data) => {
        try{
            const config = {
                method:"GET",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `bearer ${getUserToken()}`
                }
            };
            const cartItems = await fetch(`http://localhost:9999/${uId}/cart`, config)
            const parsedCartItems = await cartItems.json()
            setCart(parsedCartItems)
        } catch(err) {
            console.log(err)
        };
    };
    

    const cartNum = cart && cart.length

    const getChef = async () => {
        try{
            const chef = await fetch(`http://localhost:9999/${uId}/chef/${chefId}`)
            const parsedChef = await chef.json()
            setData(parsedChef)
            // setIsChefLoading(false)
        } catch (err) {
            console.log(err)
        };
    };

    // console.log('chefData:',chefData)
    console.log('user:',user)
    

     useEffect(()=>{
        getUser()
        getCart()
        getChef()
        // eslint-disable-next-line   
    }, [])
    return (
        <>
            <div className='d-flex'>   
                <div className={cartColOpen ? 'col-lg-10' : 'col-lg-12'}>
                    <DetailsNavbar 
                        uId={uId} 
                        cartNum={cartNum}
                        cart={cart}
                        getUser={getUser}
                        getCart={getCart}
                        cartColOpen={cartColOpen}
                        setCartColOpen={setCartColOpen}
                        history={props.history}
                    />
                    <div className='d-flex px-5 pt-3 pb-5'>
                        <div className='col-lg-2'>
                            <div
                                className=''
                                style={{
                                    height:'40rem',
                                    borderRadius:'1rem',
                                    position:'sticky', 
                                    top:'0',
                                }}
                            >
                                <div className='pt-3'>
                                    <img
                                        src={chefData.image}
                                        className='border border-dark'
                                        alt='chefImg'
                                        style={{
                                            width:'100%',
                                            borderRadius:'1rem',
                                        }}
                                    />
                                </div>
                                <div 
                                    className='pt-2 '
                                    style={{
                                        width:'100%',
 
                                    }}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Icon 
                                            icon='healthicons:i-schedule-school-date-time' 
                                            style={{fontSize:'2rem'}}
                                        />
                                        <h5 className='pt-1 px-1'>Hours</h5>
                                    </div>
                                    <p className='text-muted' style={{fontSize:'15px'}}>{chefData.availability}</p>
                                </div>
                                <div 
                                    className='my-4 border border-dark container'
                                    style={{
                                        width:'100%',
                                        height:'4rem',
                                        borderRadius:'1rem',
                                    }}
                                >

                                </div>
                                <div 
                                    className='my-4 border border-dark container'
                                    style={{
                                        width:'100%',
                                        height:'4rem',
                                        borderRadius:'1rem',
                                    }}
                                >
                                    <div className='pt-3 d-flex align-items-center justify-content-center'>
                                        <Icon 
                                            icon='whh:restaurantmenu' 
                                            style={{
                                                fontSize:"2rem", 
                                                marginBottom:'6px'
                                            }}
                                        />
                                        <h4 className='px-2'>Menu</h4>
                                    </div>

                                </div>
                                <div 
                                    className='my-4 border border-dark container'
                                    style={{
                                        width:'100%',
                                        height:'4rem',
                                        borderRadius:'1rem',
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-8 px-5'>
                                <div className='d-flex justify-content-between pb-2'>
                                    <h1 className='display-2'>{chefData.name}</h1>
                                    <div
                                        className='d-flex align-items-center justify-content-center'
                                        style={{
                                            background:'#f4f6f8',
                                            borderRadius:'12px',
                                            width:'4rem',
                                            height:'4rem',
                                        }}
                                    >
                                        <Icon
                                            icon='akar-icons:search'
                                            style={{
                                                fontSize:'2rem',

                                            }}
                                        />
                                    </div>
                                </div>
                                <MiniIconBar/>
                                <AllItems
                                    uId={uId}
                                    chefData={chefData}
                                />
                      
                        </div>
                        <div className='col-lg-2'>
                            <Ad
                                chefData={chefData}
                            />
                            <ReviewsCol
                                chefData={chefData}
                            />
                        </div>
                    </div>
                </div>
                {
                    cartColOpen ?
                    <CartCol
                        uId={uId}
                        cart={cart}
                        getUser={getUser}
                        getCart={getCart}
                    />
                    :
                    <>
                    </>
                }
            </div>  
            {/* <ItemModal 
                open={isOpen} 
                onClose={() => closeModal()}
                item={itemModal}
                uId={uId}
                getUser={getUser}
                userData={user}
                chefsData={chefData}
                getItems={getItem}
            />  */}
        </>
    )
}
    
