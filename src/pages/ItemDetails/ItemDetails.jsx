import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { getUserToken } from "../../utils/authToken";
import Slider from "react-slick"

import DetailsNavbar from "../../components/ItemDetails/DetailsNavbar"
import LikeItem from "../../components/ItemDetails/LikeItem"
import QA from "../../components/ItemDetails/QA"
import Reviews from "../../components/ItemDetails/Reviews"

import ItemModal from "../../components/Feed/ItemModal";
import CartCol from "../../components/ItemDetails/CartCol";

//CONTEXT
import { useChefsAPI } from "../../context/ChefsContext"

import { Icon } from '@iconify/react';

export default function ItemDetails (props) {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [location]);
    
    const {uId} = useParams()
    const itemId = props.match.params.id 
    const { chefsData } = useChefsAPI()

    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }

    const settings = {
        arrows:false,
        dots: true,
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

    let price = item && roundToHundredth(input.qty * Number(item.price))
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

    const [cartColOpen, setCartColOpen] = useState(false)

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
            setCartColOpen(!cartColOpen)
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
   
    const [showAddOns, setShowAddOns] = useState(true)
    const [showQAR, setShowQAR] = useState(true)
    const [showMoreItems, setShowMoreItems] = useState(true)
    const [arrowItems, setArrowItems] = useState(true)
    const [arrowAddOns, setArrowAddOns] = useState(true)
    const [arrowQAR, setArrowQAR] = useState(true)
    
    const showOpt = () => {
        setShowAddOns(!showAddOns)
        setArrowAddOns(!arrowAddOns)
    }

    const showQA = () => {
        setShowQAR(!showQAR)
        setArrowQAR(!arrowQAR)
    }

    const showItems = () => {
        setShowMoreItems(!showMoreItems)
        setArrowItems(!arrowItems)
    }

    return (
        <>
            <div className='d-flex'>   
                <div className={cartColOpen ? 'col-lg-10' : 'col-lg-12'}>
                    <DetailsNavbar 
                        uId={uId} 
                        cartNum={cartNum}
                        cart={cart}
                        getUser={getUser}
                        cartColOpen={cartColOpen}
                        setCartColOpen={setCartColOpen}
                        history={props.history}
                    />
                    <div 
                        className='d-flex justify-content-between px-4'
                        style={{
                            paddingTop:'2rem',
                            paddingBottom:'6rem',
                            background: "linear-gradient(360deg, rgba(246,246,246,1) 0%, rgba(255,255,255,1) 37%, rgba(250,241,237,1) 84%)"
                        }}    
                    >
                        <div className='col-lg-2'>
                            <h3 
                                className='display-1'
                                style={{
                                    fontSize:'3rem',
                                    // color:'#f53783',
                                    margin:'0',
                                }}
                                >
                                {item.title}
                            </h3>
                            <div className='d-flex align-items-center'>
                                <Icon 
                                    icon='ls:cookpad' 
                                    style={{
                                        fontSize:"1.6rem",
                                        marginBottom:"10px",
                                    }}
                                />
                                <Link 
                                    to={`/${uId}/chef/${chef._id}`} 
                                    className="text-decoration-none text-reset"
                                >
                                    <p className='px-1'>{chef.name}</p>
                                </Link>
                            </div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <img
                                src={item.image}
                                alt='item-detail-img'
                            />
                            <LikeItem
                                uId={uId}
                                userData={userData}
                                item={item}
                                getItem={getItem}
                            />
                        </div>
                        <section 
                            style={{
                                background:'black',
                                color:'white',
                                borderRadius:'1rem',
                                width:'12rem',
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
                                <p 
                                    style={{
                                        fontWeight:'bold',
                                        paddingTop:'0.5rem',
                                        marginBottom:'0.5px'
                                    }}
                                >
                                    Description
                                </p>
                                <p className='text-muted'>{item.description}</p>
                                <div className='col-lg-4 pb-2 pt-2'>
                                    <form onSubmit={handleSubmit}>
                                        <select 
                                            id="qtyDetail" 
                                            name="qty" 
                                            onChange={handleChange} 
                                            value={input.qty}
                                            style={{
                                                width:'100%', 
                                                background:'#f6f6f6',
                                                borderRadius:'12px',
                                                paddingLeft:'4px',
                                                fontSize:'1rem',
                                                paddingTop:'4px',
                                                paddingBottom:'4px',
                                            }}
                                        >
                                            {/* <option value="Remove">Remove</option> */}
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                            <option value={10}>10</option>
                                        </select>
                                    </form>
                                </div>
                                <div className='pt-2'>
                                    <form onSubmit={handleSubmit}>
                                        <button 
                                            style={{
                                                background: "#f98030",
                                                color: "whitesmoke",
                                                border:"#f98030",
                                                borderRadius:"4px",
                                                paddingInline: "1rem",
                                                paddingTop:"6px",
                                                paddingBottom:"6px",
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
                        </section> 
                    </div>
                    <div className=''>
                    {
                        item.options && item.options.length >= 1 ?
                        <>
                            <div 
                                className='d-flex align-items-center justify-content-between'
                                style={{
                                    background:'#f6f6f6',
                                    width:'100%',
                                }}
                            >
                            <h4 className='m-0 mx-2 pb-4 pt-4'>Add Ons</h4>
                            {
                                arrowAddOns ?
                                <Icon
                                    icon='akar-icons:circle-chevron-down'
                                    onClick={showOpt}
                                    style={{
                                        fontSize:'1.5rem',
                                        marginRight:'1rem'
                                    }}
                                />
                                :
                                <Icon
                                    onClick={showOpt}
                                    icon='akar-icons:circle-chevron-up'
                                    style={{
                                        fontSize:'1.5rem',
                                        marginRight:'1rem'
                                    }}
                                />
                            }
                            </div>
                            {
                                showAddOns ?
                                    item && item.options.map((option, idx) => (
                                        <div 
                                            key={idx} 
                                            className='px-3 d-flex align-items-center'
                                            style={{
                                                background:'white'
                                            }}
                                        >
                                            <input
                                                type='checkbox'
                                                onClick={() => addOption(idx)}
                                            />
                                            <div className='col px-3 d-flex align-items-center justify-content-between pt-3'>
                                                <div>
                                                    <h5>{option.name}</h5>
                                                    <p className='text-muted'>{option.description}</p>
                                                </div>
                                                <h6>${option.price}</h6>
                                            </div>
                                        </div>
                                    ))
                                :
                                <>
                                </>
                            }
                        </>
                        :
                        <>
                        </>  
                    }
                    </div>
                    <div className=''>
                        <div 
                            className='d-flex align-items-center justify-content-between'
                            style={{
                                background:'#f6f6f6',
                                width:'100%',
                            }}
                        >
                        <h4 className='m-0 mx-2 pb-4 pt-4'>Customer's questions and reviews</h4>
                        {
                            arrowQAR ?
                            <Icon
                                icon='akar-icons:circle-chevron-down'
                                onClick={showQA}
                                style={{
                                    fontSize:'1.5rem',
                                    marginRight:'1rem'
                                }}
                            />
                            :
                            <Icon
                                onClick={showQA}
                                icon='akar-icons:circle-chevron-up'
                                style={{
                                    fontSize:'1.5rem',
                                    marginRight:'1rem'
                                }}
                            />
                        }
                        </div>
                        {
                            showQAR ?
                            <div 
                                className='d-flex align-items-center px-2'
                                style={{
                                    background:'white'
                                }}
                            >
                                <QA
                                    userData={userData}
                                    item={item}
                                />
                                <Reviews
                                    userData={userData}
                                    item={item}
                                />
                            </div>
                            :
                            <>
                            </>
                        }
                    </div>
                    {/* More Chef's Items */}
                    <div 
                        className='d-flex align-items-center justify-content-between'
                        style={{
                            background:'#f6f6f6',
                            width:'100%',
                        }}
                    >
                    <h4 className='m-0 mx-2 pb-4 pt-4'>More {chef.name}'s items</h4>
                    {
                        arrowItems ?
                        <Icon
                            icon='akar-icons:circle-chevron-down'
                            onClick={showItems}
                            style={{
                                fontSize:'1.5rem',
                                marginRight:'1rem'
                            }}
                        />
                        :
                        <Icon
                            onClick={showItems}
                            icon='akar-icons:circle-chevron-up'
                            style={{
                                fontSize:'1.5rem',
                                marginRight:'1rem'
                            }}
                        />
                    }
                    </div>
                    {
                        showMoreItems ?
                        <div 
                            className='pt-5 pb-5 px-2'
                            style={{
                                background:'white'
                            }}
                        >
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
                                            className="text-decoration-none text-reset" 
                                            > 
                                            <h5  
                                                style={{
                                                    // color:'#f53783',
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
                        :
                        <>
                        </>
                    }
                </div>
                {
                    cartColOpen ?
                    <CartCol
                        uId={uId}
                        cart={cart}
                        getUser={getUser}
                    />
                    :
                    <>
                    </>
                }
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