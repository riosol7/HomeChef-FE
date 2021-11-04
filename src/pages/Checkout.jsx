import React, {useState, useEffect} from 'react';
import {getUserToken} from '../utils/authToken'
import { useParams, Link } from "react-router-dom";

import UpdateQty from "../components/UpdateQty"
// import { useChefAPI } from "../context/ChefContext";

export default function Cart (props) {
    // const { chefData } = useChefAPI()
    const {uId} = useParams()
    const [cart, setCart] = useState([])

    //CART CONTEXT
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


    useEffect(() => {
        getCart();// eslint-disable-next-line
    }, [])

    // const test = cart.map(item => item.chef)
    // console.log(test)
    // const test2 = chefData.filter(chef => chef._id === cart.chef)
    // console.log(test2)

    const totalArr = cart.map(item => item.total)
    // console.log(totalArr)
    const subTotal = totalArr.reduce((a, b) => a + b, 0)
    // console.log("subTotal:", subTotal)
    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }
    const roundSubTotal = roundToHundredth(subTotal)
    console.log("roundSubTotal:", roundSubTotal)

    const deliveryFee = 1.99

    return (
        <>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-1'>

                    </div>
                    <div className='col-lg-6'>
                        <h3>Review Checkout</h3>
                        <div className='row'>
                            <p>Delivery:</p>

                        </div>
                        <div className='row'>
                            <p>Payment:</p>

                        </div>
                        <div className='row border-top'>
                        <h5 className='pt-3'>Your Items:</h5>
                            {cart && cart.map((product) => (
                            <>
                                <div className='col-md-12 container my-2 border border-primary'>
                                    <div className='row'>
                                        <div key={product._id} className='col-lg-1'>
                                            <UpdateQty id={product._id} qty={product.qty} history={props.history} />
                                        </div>
                                        <div className='col-lg-9'>
                                            <div className='row'>
                                                <div className='col-lg-3'>
                                                    <img
                                                        src={product.item.image}
                                                        alt='cart-item-img'
                                                        className='chef-img'
                                                    />
                                                </div>
                                                <div className='col-lg-9'>
                                                    <h6>{product.item.title}</h6>
                                                    <div className='container'>
                                                        {product.item.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-2'>
                                            <p>${product.total}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-4 container p-3'>
                        <h6>Subtotal: ${roundSubTotal}</h6>
                        <p>Taxes:</p>
                        <p className='border-bottom pb-3'>Delivery Fee: ${deliveryFee}</p>
                        <div className='row'>
                            <p>Add Tip:</p>
                            <div className='container pb-4'>
                                <input type='text' placeholder='Custom Tip'/>
                            </div>
                            <div className='col-md-4'>
                                <input 
                                    type='radio' 
                                    value='5%'
                                />
                                5%
                            </div>
                            <div className='col-md-4'>
                                <input 
                                    type='radio' 
                                    value='10%'
                                />
                                10%
                            </div>
                            <div className='col-md-4'>
                                <input 
                                    type='radio' 
                                    value='15%'
                                />
                                15%
                            </div>
                        </div>
                       
                        <br/>
                        <h6 className='border-top pt-3'>Total:</h6>
                        <br/>
                        <button id='pOrder'>
                            Place Order
                        </button>
                    </div>
                </div>

            </div>
            <Link to={`/${uId}/feed`}>Home</Link>
        </>
    )
}