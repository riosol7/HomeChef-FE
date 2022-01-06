import React, { useState, useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'

// import DetailsNavbar from "../../components/ItemDetails/DetailsNavbar"
import Home from "../../pages/Chef/Home"
import Menu from "../../pages/Chef/Menu"
import Reviews from "../../pages/Chef/Reviews"
import CartCol from "../../components/ItemDetails/CartCol";

import { Icon } from '@iconify/react';

function reducer(state, action) {
    switch(action.type) {
        case "Home":
            return { show: "Home" }
        case "Menu":
            return { show: "Menu" }
        case "Reviews":
            return { show: "Reviews" }
        default:
            return state
    }
}

export default function Chef(props) {
    const {uId} = useParams()
    const chefId = props.match.params.id 
    const [cartColOpen, setCartColOpen] = useState(false)
    const [cart, setCart] = useState([])
    const [user, setUser] = useState({})
    const [chefData, setData] = useState({})

    const [ show, dispatch ] = useReducer(reducer, {
        show: "Home"
    })

    const clickHome = () => {
        dispatch({ type: "Home"})
    }

    const clickMenu = () => {
        dispatch({ type: "Menu"})
    }

    const clickReviews = () => {
        dispatch({ type: "Reviews"})
    }
  
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

    const getCart = async () => {
        try{
            const cartItems = await fetch(`http://localhost:9999/${uId}/cart`)
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
    console.log('cart:',cart)
    

     useEffect(()=>{
        getUser()
        getCart()
        getChef()
        // eslint-disable-next-line   
    }, [])
    return (
        <>
            <div className='d-flex' style={{ background: "radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(255,255,255,1) 40%, rgba(250,241,237,1) 100%)"}}>   
                <div className={cartColOpen ? 'col-lg-10' : 'col-lg-12'}>
                    {/* <DetailsNavbar 
                        uId={uId} 
                        cartNum={cartNum}
                        cart={cart}
                        getUser={getUser}
                        getCart={getCart}
                        cartColOpen={cartColOpen}
                        setCartColOpen={setCartColOpen}
                        history={props.history}
                    /> */}
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
                                <div 
                                    style={{
                                        marginLeft: '-1rem',
                                        paddingBottom:'1rem',
                                        fontSize: '2rem',
                                        background: 'none',
                                        textDecoration: 'none',
                                        color: '#f5f5f5',

                                    }}
                                >
                                    <a href={`/${uId}/feed`} id='code'> 
                                        code
                                        <Icon icon='simple-icons:codechef' id='logo'/>
                                        chef 
                                    </a>
                                </div>
                                <div className='pt-3'>
                                    <img
                                        src={chefData.image}
                                        className=''
                                        alt='chefImg'
                                        style={{
                                            width:'100%',
                                            borderRadius:'1rem',
                                            boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)',
                                        }}
                                    />
                                </div>
                                <div 
                                    className='pt-4'
                                    style={{
                                        width:'100%',
 
                                    }}
                                >
                                    <div 
                                        className='d-flex align-items-center'
                                    >
                                        <Icon 
                                            icon='healthicons:i-schedule-school-date-time' 
                                            style={{fontSize:'2rem'}}
                                        />
                                        <h5 className='pt-1 px-1'>Hours</h5>
                                    </div>
                                    <p className='text-muted' style={{fontSize:'15px'}}>{chefData.availability}</p>
                                </div>
                                <div 
                                    className='my-4'
                                    // style={{
                                    //     width:'100%',
                                    //     height:'4rem',
                                    //     borderRadius:'1rem',
                                    // }}
                                >
                                    <div 
                                        className='d-flex align-items-center'
                                        onClick={clickHome}
                                    >
                                        <div 
                                            className='d-flex align-items-center justify-content-center'
                                            style={ 
                                                show.show === 'Home' ? 
                                                {
                                                    width:'4rem',
                                                    height:'4rem',
                                                    borderRadius:'1rem',
                                                    border:'solid 1.5px white',
                                                    background: "linear-gradient(360deg, rgba(246,246,246,1) 0%, rgba(255,255,255,1) 37%, rgba(250,241,237,1) 84%)"
                                                } 
                                                : 
                                                {
                                                    width:'4rem',
                                                    height:'4rem',
                                                    borderRadius:'1rem',
                                                    background:'#f4f6f8',
                                                }
                                            }>
                                        <Icon 
                                            icon='akar-icons:home' 
                                            style={{
                                                fontSize:"2rem", 
                                                marginBottom:'6px'
                                            }}
                                        />
                                       
                                        </div>
                                        <h4 className='px-5'
                                            // style={{
                                            //     color:"rgb(246,246,246)",
                                            //     webkitTextFillColor: "rgb(246,246,246)", /* Will override color (regardless of order) */
                                            //     webkitTextStrokeWidth: '-5px',
                                            //     webkitTextStrokeColor: 'black',

                                            // }}
                                        >Home</h4>
                                    </div>
                                </div>
                                <div 
                                    className='my-4'
                                    // style={{
                                    //     width:'100%',
                                    //     height:'4rem',
                                    //     borderRadius:'1rem',
                                    // }}
                                >
                                    <div 
                                        className='d-flex align-items-center'
                                        onClick={clickMenu}
                                    >
                                        <div 
                                            className='d-flex align-items-center justify-content-center'
                                            style={ 
                                                show.show === 'Menu' ? 
                                                {
                                                    width:'4rem',
                                                    height:'4rem',
                                                    borderRadius:'1rem',
                                                    background:'white',
                                                } 
                                                : 
                                                {
                                                    width:'4rem',
                                                    height:'4rem',
                                                    borderRadius:'1rem',
                                                    background:'#f4f6f8',
                                                }
                                            }>
                                        <Icon 
                                            icon='whh:restaurantmenu' 
                                            style={{
                                                fontSize:"2rem", 
                                                marginBottom:'6px'
                                            }}
                                        />
                                        </div>
                                        <h4 className='px-5'>Menu</h4>
                                    </div>
                                </div>
                                <div 
                                    className='my-4'
                                    // style={{
                                    //     width:'100%',
                                    //     height:'4rem',
                                    //     borderRadius:'1rem',
                                    // }}
                                >
                                    <div 
                                        className='d-flex align-items-center'
                                        onClick={clickReviews}
                                    >
                                        <div 
                                            className='d-flex align-items-center justify-content-center'
                                            style={ 
                                                show.show === 'Reviews' ? 
                                                {
                                                    width:'4rem',
                                                    height:'4rem',
                                                    borderRadius:'1rem',
                                                    background:'white',
                                                } 
                                                : 
                                                {
                                                    width:'4rem',
                                                    height:'4rem',
                                                    borderRadius:'1rem',
                                                    background:'#f4f6f8',
                                                }
                                            }>
                                        <Icon 
                                            icon='carbon:star-review' 
                                            style={{
                                                fontSize:"2rem", 
                                                marginBottom:'6px'
                                            }}
                                        />
                                       
                                        </div>
                                        <h4 className='px-5'>Reviews</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            show.show === 'Home' ?
                            <Home
                                uId={uId}
                                chefData={chefData}
                                cartColOpen={cartColOpen}
                                clickMenu={clickMenu}
                                clickReviews={clickReviews}
                                setCartColOpen={setCartColOpen}
                                cartNum={cartNum}
                                getUser={getUser}
                                user={user}
                                getChef={getChef}
                                getCart={getCart}

                            />
                            :
                            show.show === 'Menu' ?
                            <Menu
                                uId={uId}
                                chefData={chefData}
                                setCartColOpen={setCartColOpen}
                            />
                            :
                            show.show === 'Reviews' ?
                            <Reviews
                                uId={uId}
                                chefData={chefData}
                            />
                            :
                            <>
                            </>
                        }
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
        </>
    )
}
    
