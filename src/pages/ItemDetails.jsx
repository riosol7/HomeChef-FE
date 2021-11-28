import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { useLocation } from "react-router";
import { getUserToken } from "../utils/authToken";

// import SideNavbar from '../components/SideNavbar'
import FeedNavbar from "../components/Feed/FeedNavbar"

import {IoArrowBackCircleOutline} from 'react-icons/io5';
//REACT ICONS
import { AiOutlineShoppingCart } from "react-icons/ai"

export default function ItemDetails (props) {
    const {uId} = useParams()
    const itemId = props.match.params.id 

    // const location = useLocation()
    // const { cartNum } = location.state

    //GET USER
    const [userData, setUserData] = useState({})

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
    const cart = userData && userData.cart
    const cartNum = userData.cart && userData.cart.length
  
    //GET ITEM DETAIL
    const [item, setItem] = useState({})

    const getItem = async (e) => {
        try{
            const fetchItem = await fetch(`http://localhost:9999/${uId}/item/${e || itemId}`)
            const parsedItem = await fetchItem.json()
            setItem(parsedItem)
        } catch (err) {
            console.log(err)
        }
    }

    const [chef, setChef] = useState({})

    const getChefByItem = async () => {
        try {
            const foundChef =  await fetch(`http://localhost:9999/${uId}/chef/item/${itemId}`)
            const parsedChef = await foundChef.json()
            setChef(parsedChef)
        } catch (err) {
            console.log(err)
        }
    }

    const filterItems = chef.items && chef.items.filter(item => item._id !== itemId)

    const handleClick = (e) => {
        getItem(e)
    }

    useEffect(()=>{
        getUser()
        getItem()
        getChefByItem()
        // eslint-disable-next-line   
    }, [])

    console.log('getItem:', item)

     //FETCH - USER adds item(s) to their cart
     const [input, setInput] = useState({
        _id: itemId,
        qty:0,
        total:0,
    })
    
    const postCart = async (data) => {
        try{
            const config = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${getUserToken()}`,
                }
            };
            const addToCart = await fetch(`http://localhost:9999/${uId}/cart`, config)
            const parsedCart = await addToCart.json();
            console.log("parsedCart:",parsedCart)
            getUser()
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("input:",input)
        postCart(input)
    }

    return (
        <>
            <FeedNavbar 
                uId={uId} 
                history={props.history} 
                cartNum={cartNum}
                cart={cart}
                getUser={getUser}
            />
            <a 
                href={`/${uId}/feed`}
                id='goBack'
                className='text-decoration-none'
                >
                <IoArrowBackCircleOutline 
                    id='goBack' 
                    className='text-decoration-none'>
                </IoArrowBackCircleOutline>
            </a>
            <div className='container-fluid'>
                <div className='row pt-3'>
                    <div className='col-lg-1'></div>
                    <div className='col-lg-11'>
                        <div className='row'>
                            <div className='col-lg-9'>
                                <div className='row pb-3'>
                                    <div className='col-lg-3'>
                                        <h3>{item.title}</h3>
                                        <p>By: {chef.name}</p>
                                    </div>
                                    <div className='col-lg-6'>

                                    </div>
                                    <div className='col-lg-3'>
                                        <p>Likes:{item.likes}</p>
                                    </div>
                                </div>
                                <div className='row pt-4 pb-4'>
                                    <div className='container d-flex justify-content-center pt-3 pb-3'>
                                        <img
                                            src={item.image}
                                            alt='item-detail-img'
                                        />
                                    </div>
                                </div>
                                <div className='row pt-4 pb-4'>
                                    <div className='container pt-3 pb-3'>
                                        <p>Description: {item.description}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Item Box */}
                            <div className='col-lg-3'>
                                <div className='row'>
                                    <div className='col-lg-3'></div>
                                    <div className='col-lg-6'>
                                        <div className='container p-3 border border-dark'>
                                            <h5>${item.price}</h5>
                                            <form onSubmit={handleSubmit}>
                                                    <input
                                                        id='qty'
                                                        name="qty"
                                                        type="Number"
                                                        value={input.qty}
                                                        onChange={handleChange}
                                                    />
                                                <div className='row pt-2'>
                                                    <div className='col d-flex justify-content-start'>
                                                        <button className='cartBtn'>
                                                            <AiOutlineShoppingCart  
                                                                id='cart'
                                                                name="_id"
                                                                value={input._id}
                                                                onChange={handleChange}
                                                                type="submit">
                                                            </AiOutlineShoppingCart>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-1'></div>
                    <div className='col-lg-10'>
                        <div className='row pt-4 pb-4'>
                            {filterItems && filterItems.map(item => (
                                <div key={item._id} className='col-lg-2 px-3'>
                                    <div className='row'>
                                        <div className='container'>
                                            <a 
                                                href={`/${uId}/item/${item._id}`} 
                                                >
                                                    <button onClick={() => handleClick(itemId)}>
                                                <img
                                                    src={item.image}
                                                    alt='otherChefItemImg'
                                                    className='chef-img'
                                                />
                                                    </button>
                                            </a>                            
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <h6>{item.title}</h6> 
                                        <p className='d-flex justify-content-end'>{item.price}</p>
                                        <div className='container'>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-1'></div>
                </div>
            </div>
        </>
    )
}