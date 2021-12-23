import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserToken } from "../utils/authToken";
import Slider from "react-slick"

import FeedNavbar from "../components/Feed/FeedNavbar"

//REACT ICONS
import { AiOutlineShoppingCart } from "react-icons/ai"

export default function ItemDetails (props) {
    const {uId} = useParams()
    const itemId = props.match.params.id 

    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
    }

    const [selectedOptions, setSelectedOptions] = useState([])

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

    useEffect(()=>{
        getUser()
        getItem()
        getChefByItem()
        // eslint-disable-next-line   
    }, [])


    //FETCH - USER adds item(s) to their cart
    const [input, setInput] = useState({
        _id: itemId,
        qty:1,
        total:0,
        options:selectedOptions
    })

    let price = roundToHundredth(input.qty * Number(item.price))
    // console.log("price:", price)
    const [ updatedPrice, setUpdatedPrice ] = useState(price)
    // console.log("updatedPrice:", updatedPrice)

    useEffect(() => {
        if(selectedOptions.length >= 1){
            const selectedOptionsPrices = selectedOptions.map(option => option.price)
            const optionTotal = selectedOptionsPrices.reduce((a, b) => Number(a) + Number(b), 0)
            const roundOptionTotal = roundToHundredth(optionTotal)
            console.log("roundOptionTotal:", roundOptionTotal)
            setUpdatedPrice(roundToHundredth(price + (input.qty * roundOptionTotal)))
        } else {
            setUpdatedPrice(price)
        }
        // eslint-disable-next-line 
    }, [price])

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
            props.getUser()
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

    const addOption = (idxToAdd) => {
        const selectedItemArr = item.options.filter((_, idx) => idx === idxToAdd)
        const selectedItem = selectedItemArr[0]
        const checkOption = selectedOptions.filter(item => item === selectedItem)
        if(checkOption.length >= 1) {
            const removedOptionArr = selectedOptions.filter(item => item !== selectedItem)
            setSelectedOptions(removedOptionArr) 
            console.log(selectedItem.price)
            console.log(price)
            setUpdatedPrice(roundToHundredth(updatedPrice - (input.qty * Number(selectedItem.price))))
        } else {
            console.log(selectedItem.price)
            console.log(price)
            setSelectedOptions([...selectedOptions, selectedItem])
            setUpdatedPrice(roundToHundredth(updatedPrice + (input.qty *  Number(selectedItem.price))))
        }
    }

    useEffect(() => {
        setInput({...input,
            options: selectedOptions, 
        })
         // eslint-disable-next-line 
    }, [selectedOptions])
   

    return (
        <>
            <FeedNavbar 
                uId={uId} 
                history={props.history} 
                cartNum={cartNum}
                cart={cart}
                getUser={getUser}
            />
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
                                        <div className='col-lg-6'>
                                            <p>Description: {item.description}</p>
                                        </div>
                                        <div className='col-lg-6'>
                                            <img
                                                src={item.image}
                                                alt='item-detail-img'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row pt-4 pb-4'>
                                    <div className='container pt-3 pb-3'>
                                        {
                                            item.options === undefined ?
                                            <>
                                            </>
                                            :
                                            item && item.options.map((option, idx) => (
                                                <div key={idx}>
                                                    <div className='row'>
                                                        <div className='col-md-2 d-flex align-items-center justify-content-end'>
                                                            <input
                                                                type='checkbox'
                                                                onClick={() => addOption(idx)}
                                                            />
                                                        </div>
                                                        <div className='col-md-10'>
                                                            <div className='container'>
                                                                <div className='d-flex align-items-center justify-content-between'>
                                                                    <h6>{option.name}</h6>
                                                                    <p>{option.price}</p>
                                                                </div>
                                                                <p>{option.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* Item Box */}
                            <div className='col-lg-3'>
                                <div className='row'>
                                    <div className='col-lg-3'></div>
                                    <div className='col-lg-6'>

                                    <section style={{position:"fixed"}}>
                                        <div className='container p-3 border border-dark'>
                                            <div className='d-flex justify-content-start'>
                                                <h5>${updatedPrice || item.price}</h5>
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <p>{item.timeDuration}</p>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className=''>
                                                    <form onSubmit={handleSubmit}>
                                                        <input
                                                            id='qty'
                                                            name="qty"
                                                            type="Number"
                                                            min='1'
                                                            max='20'
                                                            value={input.qty}
                                                            onChange={handleChange}
                                                        />
                                                    </form>
                                                </div>
                                                <div className=''>
                                                    <form>
                                                        <button className='cartBtn'>
                                                            <AiOutlineShoppingCart  
                                                                id='cart'
                                                                name="_id"
                                                                value={input._id}
                                                                onChange={handleChange}
                                                                type="submit">
                                                            </AiOutlineShoppingCart>
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
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
                            <Slider {...settings}>
                            {filterItems && filterItems.map((item, idx) => (
                                <div key={item._id} className='col-md-2 p-3'>
                                    <div className='container'>                                      
                                        <img
                                            src={item.image}
                                            alt='otherChefItemImg'
                                            className='chef-img'
                                        />                       
                                    </div>
                                    <div className='pt-2 border-top'>
                                        <a 
                                            href={`/${uId}/item/${item._id}`}
                                            className="text-decoration-none" 
                                            > 
                                            <h5>{item.title}</h5>
                                        </a> 
                                        <h6 className='d-flex justify-content-end'>${item.price}</h6>
                                        <div className='container'>
                                            <p className='text'>{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </Slider>
                        </div>
                    </div>
                    <div className='col-lg-1'></div>
                </div>
            </div>
        </>
    )
}