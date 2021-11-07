import React, { useState } from 'react'
import {getUserToken} from '../utils/authToken'
import { Link } from "react-router-dom";

import UpdateQty from "../components/UpdateQty"

export default function OrderForm(props) {
    const uId = props.uId
    const user = props.user
    const cart = props.cart

    //COST
    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }

    const totalArr = cart && cart.map(item => item.total)
    // console.log("totalArr:",totalArr)
    let subTotal = totalArr.reduce((a, b) => a + b, 0)
    // console.log("subTotal:", subTotal)
    const roundSubTotal = roundToHundredth(subTotal)
    // console.log("roundSubTotal:", roundSubTotal)


    const calcTipLow = roundSubTotal * 0.20
    const roundLowTip = Math.round(calcTipLow)
    console.log("roundLowTip:",roundLowTip)
    const calcTipMed = roundSubTotal * 0.30
    const roundMedTip = Math.round(calcTipMed)
    console.log("roundMedTip:",roundMedTip)
    const calcTipHigh = roundSubTotal * 0.35
    const roundHighTip = Math.round(calcTipHigh)
    console.log("roundHighTip:", roundHighTip)

    const deliveryFee = 1.99

    const taxes = roundSubTotal * .095//CA TAX
    const roundTaxes = roundToHundredth(taxes)

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
        tip:0
    })

    let grandTotal = roundSubTotal + roundTaxes + deliveryFee + Number(input.tip)
    let roundGrandTotal = roundToHundredth(grandTotal)
    console.log("roundGrandTotal:",roundGrandTotal)

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
        // let grandTotal = roundSubTotal + roundTaxes + deliveryFee + parseInt(tip.tip)
        // let roundGrandTotal = roundToHundredth(grandTotal)
        // console.log("roundGrandTotal (handleChange):", roundGrandTotal)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // let grandTotal = roundSubTotal + roundTaxes + deliveryFee + parseInt(tip.tip)
        // let roundGrandTotal = roundToHundredth(grandTotal)
        // console.log("roundGrandTotal (handleSubmit):", roundGrandTotal)
        // setInput({...input, [e.target.name]: e.target.value})
        console.log("input:",input)
        newOrder(input)
    }



    return (
        <>
        <form onSubmit={handleSubmit}>
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
                                <div key={product._id} className='col-md-12 container my-2 border border-primary'>
                                    <div className='row'>
                                        <div className='col-lg-1'>
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
                        <p>Add Tip: ${input.tip}</p>
                            <div className='container pb-4'>
                                <input
                                    type='Number'
                                    name='tip'
                                    onChange={handleChange}
                                    placeholder='Custom Tip'
                                    value={input.tip}
                                />
                            </div>
                            <div className='col-md-4'>
                                <input 
                                    type='radio' 
                                    value='2.00'
                                />
                                {roundLowTip}
                            </div>
                            <div className='col-md-4'>
                                <input 
                                    type='radio' 
                                    value='4.00'
                                />
                                {roundMedTip}
                            </div>
                            <div className='col-md-4'>
                                <input 
                                    type='radio' 
                                    value='5.00'
                                />
                                {roundHighTip}
                            </div>
                        </div>
                       
                        <br/>
                        <h6 className='border-top pt-3'>Total: ${roundGrandTotal}</h6>
                        {/* <input
                            type='hidden'
                            name='grandTotal'
                            value={tip.tip}
                        /> */}
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

