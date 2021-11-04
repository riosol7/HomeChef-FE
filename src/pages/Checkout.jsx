import React, {useState, useEffect} from 'react';
import {getUserToken} from '../utils/authToken'
import { useParams, Link } from "react-router-dom";

import UpdateQty from "../components/UpdateQty"
// import { useChefAPI } from "../context/ChefContext";

export default function Cart (props) {
    // const { chefData } = useChefAPI()
    const {uId} = useParams()

    //USER CONTEXT
    const [user, setUser] = useState({})
    const getUser = async () => {
        try{
            const user = await fetch(`http://localhost:9999/${uId}`)
            const parsedUser = await user.json()
            setUser(parsedUser)
        } catch (err) {
            console.log(err)
        };
    };
    console.log("user:",user)

    //CART CONTEXT
    const [cart, setCart] = useState([])
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

    //COST
    const [tip, setTip] = useState({tip: ""})
    const totalArr = cart.map(item => item.total)
    // console.log(totalArr)
    const subTotal = totalArr.reduce((a, b) => a + b, 0)
    // console.log("subTotal:", subTotal)
    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }
    const roundSubTotal = roundToHundredth(subTotal)
    // console.log("roundSubTotal:", roundSubTotal)

    const deliveryFee = 1.99

    const taxes = roundSubTotal * .095//CA TAX
    const roundTaxes = roundToHundredth(taxes)


    useEffect(() => {
        getUser();
        getCart();// eslint-disable-next-line
    }, [])

    const uStreet = user.address && user.address.street
    const uApt = user.address && user.address.apt
    const uCity = user.address && user.address.city
    const uZip = user.address && user.address.zip
    const uState = user.address && user.address.state 


    //CREATE ORDER
    const [input, setInput] = useState({
        user: {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            address:{
                street: uStreet,
                apt: uApt,
                city: uCity,
                zip: uZip,
                state: uState,
            },
            phone: user.phone,
            deliveryInstructions:""
        },
        grandTotal:""
    })
    const newOrder = async (data) => {
        try{
            const config = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${getUserToken()}`,
                }
            };
            const createdOrder = await fetch(`http://localhost:9999/${uId}/order`, config)
            const parsedNewOrder = await createdOrder.json()
            console.log("newOrder:", parsedNewOrder)
            props.history.push(`/${uId}/feed`)
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("input:",input)
        newOrder(input)
    }


    // const test = cart.map(item => item.chef)
    // console.log(test)
    // const test2 = chefData.filter(chef => chef._id === cart.chef)
    // console.log(test2)

    return (
        <>
        <form  onSubmit={handleSubmit}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-1'>

                    </div>
                    <div className='col-lg-6'>
                        <h3>Review Checkout</h3>
                        <div className='row pt-2 pb-2'>
                            <p>Contact:</p>
                            <div className='col'>
                                <input
                                    onChange={handleChange}
                                    name='firstName'
                                    value={input.user.firstName}
                                    placeholder={user.firstName || "First Name"}
                                />
                                <br/>
                                <br/>
                                <input
                                    onChange={handleChange}
                                    name='lastName'
                                    value={input.user.lastName}
                                    placeholder={user.lastName || "Last Name"}
                                />
                                <br/>
                                <br/>
                                <input
                                    onChange={handleChange}
                                    name='phone'
                                    value={input.user.phone}
                                    placeholder={user.phone|| "Phone Number"}
                                />
                            </div>
                        </div>
                        <div className='row pt-2 pb-2'>
                            <p>Address:</p>
                            <div className='col'>
                                <input
                                    onChange={handleChange}
                                    name='street'
                                    value={input.user.address.street}
                                    placeholder={uStreet || "Street"}
                                />
                                <br/>
                                <br/>
                                <input
                                    onChange={handleChange}
                                    name='apt'
                                    value={input.user.address.apt}
                                    placeholder={uApt ||"Apt/Suite"}
                                />
                                <br/>
                                <br/>
                                <input
                                    onChange={handleChange}
                                    name='city'
                                    value={input.user.address.city}
                                    placeholder={uCity || "City"}
                                />
                                <br/>
                                <br/>
                                <input
                                    onChange={handleChange}
                                    name='zip'
                                    value={input.user.address.zip}
                                    placeholder={uZip || "Zip"}
                                />
                                <br/>
                                <br/>
                                <input
                                    onChange={handleChange}
                                    name='state'
                                    value={input.user.address.state}
                                    placeholder={uState || "State"}
                                />
                                <br/>
                                <br/>
                            </div>

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
                        <p>Taxes:${roundTaxes}</p>
                        <p className='border-bottom pb-3'>Delivery Fee: ${deliveryFee}</p>
                        <div className='row'>
                            <p>Add Tip:{tip.tip}</p>
                            <div className='container pb-4'>
                                <input 
                                    onChange={(e)=>{setTip({tip: e.target.value})}}
                                    placeholder='Custom Tip'
                                    value={tip.tip}
                                />
                            </div>
                            <div className='col-md-4'>
                                <input 
                                    type='radio' 
                                    value='2.00'
                                />
                                $2.00
                            </div>
                            <div className='col-md-4'>
                                <input 
                                    type='radio' 
                                    value='4.00'
                                />
                                $4.00
                            </div>
                            <div className='col-md-4'>
                                <input 
                                    type='radio' 
                                    value='5.00'
                                />
                                $5.00
                            </div>
                        </div>
                       
                        <br/>
                        <h6 className='border-top pt-3'>Total:</h6>
                        <br/>
                        <button 
                            id='pOrder'
                            type='submit'
                            >
                            Place Order
                        </button>
                    </div>
                </div>

            </div>
            <Link to={`/${uId}/feed`}>Home</Link>
        </form>
        </>
    )
}