import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserToken } from "../../utils/authToken";
import Slider from "react-slick"

import FeedNavbar from "../../components/Feed/FeedNavbar"
import LikeItem from "../../components/ItemDetails/LikeItem"
import QA from "../../components/ItemDetails/QA"
import Reviews from "../../components/ItemDetails/Reviews"

import ItemModal from "../../components/Feed/ItemModal";

//CONTEXT
import { useChefsAPI } from "../../context/ChefsContext"

import { Icon } from '@iconify/react';

export default function ItemDetails (props) {
    const {uId} = useParams()
    const itemId = props.match.params.id 
    const { chefsData } = useChefsAPI()

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

    const addOption = (idxToAdd) => {
        const selectedItemArr = item.options.filter((_, idx) => idx === idxToAdd)
        const selectedItem = selectedItemArr[0]
        const checkOption = selectedOptions.filter(item => item === selectedItem)
        if(checkOption.length >= 1) {
            const removedOptionArr = selectedOptions.filter(item => item !== selectedItem)
            setSelectedOptions(removedOptionArr) 
            setUpdatedPrice(roundToHundredth(updatedPrice - (input.qty * Number(selectedItem.price))))
        } else {
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

    const [isOpen, setIsOpen] = useState(false)
    const [itemModal, setItemModal] = useState({})

    const viewItemModalClick = (data) => {
        setIsOpen(true)
        setItemModal(data)
    }

    const closeModal = () => {
        setIsOpen(false)
        setItemModal({})
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
            <div className='container-fluid px-4'>
                <div className='row'>   
                    <div className='col-lg-10'>
                        <div className='row pb-3 border-bottom'>
                            <div className='col-lg-2'>
                                <div className='d-flex align-items-center'>
                                    <h3 
                                        style={{
                                            fontSize:'3rem',
                                            color:'#f53783',
                                        }}
                                        >
                                        {item.title}
                                    </h3>
                                    <LikeItem
                                        uId={uId}
                                        userData={userData}
                                        item={item}
                                        getItem={getItem}
                                    />
                                </div>
                                <div className='d-flex align-items-center'>
                                    <h3 className='mx-2'>
                                        ${item.price}
                                    </h3>
                                    <Icon 
                                        icon='ls:cookpad' 
                                        style={{
                                            fontSize:"1.6rem",
                                            marginBottom:"10px",
                                        }}
                                    />
                                    <p className='px-1'>{chef.name}</p>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <p 
                                    style={{
                                        fontWeight:'bold',
                                        paddingTop:'0.5rem',
                                        marginBottom:'0.5px'
                                    }}
                                    >About this item
                                </p>
                                <p>{item.description}</p>
                            </div>
                            <div className='col-lg-4'>

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
                            <div className='pt-3 pb-3'>
                            {
                                item.options === undefined ?
                                <>
                                </>
                                :
                                item && item.options.map((option, idx) => (
                                    <div key={idx}>
                                        <div className='row'>
                                            <div className='col-md-1 d-flex align-items-center justify-content-end'>
                                                <input
                                                    type='checkbox'
                                                    onClick={() => addOption(idx)}
                                                />
                                            </div>
                                            <div className='col-md-11'>
                                                <div className='container'>
                                                    <div className='d-flex align-items-center justify-content-between pt-3'>
                                                        <div>
                                                            <h6>{option.name}</h6>
                                                            <p className='text-muted'>{option.description}</p>
                                                        </div>
                                                        <p>${option.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        <div className='row pt-4 pb-4'>
                            <h5 className='pb-2'>Customer's questions and reviews</h5>
                            <div className='col-md-4'>
                                <QA
                                    userData={userData}
                                    item={item}
                                />
                            </div>
                            <div className='col-md-8'>
                                <Reviews
                                    userData={userData}
                                    item={item}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Item Box */}
                    <div className='col-lg-2 d-flex justify-content-center'>
                        <section 
                            style={{
                                position:'fixed',
                                background:'black',
                                color:'white',
                                borderRadius:'1.5rem'
                            }}
                        >
                            <div className='p-4'>
                                <h4 
                                    className='d-flex justify-content-start'
                                >
                                    ${updatedPrice || item.price}
                                </h4>
                                <p 
                                    className='text-muted d-flex justify-content-end'
                                >
                                    {item.timeDuration}
                                </p>
                                <div 
                                    className='d-flex justify-content-between align-items-center'
                                        style={{
                                            background: "#f98030",
                                            border:"#f98030",
                                            borderRadius: "3px",
                                        }}
                                >
                                    <div className=''>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                id='qtyDetail'
                                                name='qty'
                                                type='Number'
                                                min='1'
                                                max='20'
                                                value={input.qty}
                                                onChange={handleChange}
                                                style={{
                                                    width: "100%",
                                                    padding:"2px",
                                                    marginLeft:"3px",
                                                    textAlign: "center",
                                                }}
                                            />
                                        </form>
                                    </div>
                                    <div className=''>
                                        <form onSubmit={handleSubmit}>
                                            <button 
                                                style={{
                                                    background: "#f98030",
                                                    color: "whitesmoke",
                                                    border:"#f98030",
                                                    paddingInline: "8px",
                                                    paddingTop:"5px",
                                                    paddingBottom:"5px",
                                                    width: "100%",
                                                }}
                                            >
                                                <Icon
                                                    icon='whh:addtocart'
                                                    id='cart'
                                                    name="_id"
                                                    type="submit"
                                                />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>      
                    </div>    
                </div>
                {/* More Chef's Items */}
                <div className='row'>
                    <h5 className='pb-2'>More {chef.name}'s items</h5>
                    <div className='px-5'>
                        <div className='row pt-4 pb-4'>
                            <Slider {...settings}>
                            {filterItems && filterItems.map((item, idx) => (
                                <div key={idx} className='col-md-2 p-3'>
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
                                            <h5  
                                                style={{
                                                    color:'#f53783',
                                                }}
                                            >
                                                {item.title}
                                            </h5>
                                        </a> 
                                        <p className='text'>{item.description}</p>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <h5>${item.price}</h5>
                                            <Icon 
                                                icon="akar-icons:circle-plus-fill" 
                                                style={{fontSize: "2.5rem"}}
                                                onClick={() => viewItemModalClick(item)}    
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            <ItemModal 
                open={isOpen} 
                onClose={() => closeModal()}
                item={itemModal}
                uId={uId}
                getUser={getUser}
                userData={userData}
                chefsData={chefsData}
                getItems={getItem}
            /> 
        </>
    )
}