import React, { useState } from 'react'
import {getUserToken} from '../../utils/authToken'
import { Link } from "react-router-dom";

import axios from "axios"

import UpdateQty from "./UpdateQty"

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CardElementContainer = {
    padding:'50px',
    borderStyle:'solid',
    backgroundColor:'black'
}

export default function OrderForm(props) {
    const uId = props.uId
    const user = props.user
    const cart = props.cart

    //COST
    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }

    const totalArr = cart && cart.map(item => item.total)
    let subTotal = totalArr.reduce((a, b) => a + b, 0)
    const roundSubTotal = roundToHundredth(subTotal)


    const calcTipLow = roundSubTotal * 0.20
    const roundLowTip = Math.round(calcTipLow)
    const calcTipMed = roundSubTotal * 0.30
    const roundMedTip = Math.round(calcTipMed)
    const calcTipHigh = roundSubTotal * 0.35
    const roundHighTip = Math.round(calcTipHigh)

    const deliveryFee = 1.99

    const taxes = roundSubTotal * .095//CA TAX
    const roundTaxes = roundToHundredth(taxes)

    const uStreet = user.address && user.address.street
    const uApt = user.address && user.address.apt
    const uCity = user.address && user.address.city
    const uZip = user.address && user.address.zip
    const uState = user.address && user.address.state 

    //CREATE ORDER

    // -- contact --
    const [showContact, setShowContact] = useState(false)
    const contactOnClick = () => setShowContact(!showContact)

    const initialContactState = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        deliveryInstructions:""
    }
    const [inputContact, setInputContact] = useState(initialContactState)

    const [updatedContact, setUpdatedContact] = useState({})

    const handleContactChange = (e) => {
        setInputContact({...inputContact, [e.target.name]: e.target.value})
    }

    const handleContactSubmit = (e) => {
        e.preventDefault()
        setUpdatedContact(inputContact)
        setShowContact(!showContact)
        setOrderInput({
            ...orderInput, 
            firstName: inputContact.firstName, 
            lastName: inputContact.lastName,
            phone: inputContact.phone,
            email: inputContact.email,
            deliveryInstructions: inputContact.deliveryInstructions
        })
    }


    // -- address --
    const [showAddress, setShowAddress] = useState(false)
    const addressOnClick = () => setShowAddress(!showAddress)

    const [inputAddress, setInputAddress] = useState({
        street: uStreet,
        apt: uApt,
        city: uCity,
        zip: uZip,
        state: uState,
    })

    const userSavedAddress = user.savedAddress && user.savedAddress
    console.log("userSavedAddress:",userSavedAddress)

    // updatedAddress stores a single object that contains properties of an updated address
    const [updatedAddress, setUpdatedAddress] = useState({})
    
    //Saved Address stores a user object that contains an array of all the savedAddress
    const [savedAddress, setSavedAddress] = useState({})
    const [showSavedAddress, setShowSavedAddress] = useState(false)

    const handleAddressChange = (e) => {
        setInputAddress({...inputAddress, [e.target.name]: e.target.value})
    }

    const saveAddress = async (e) => {
        e.preventDefault()
        setUpdatedAddress(inputAddress)
        try {
            const config = {
                method: "PUT",
                body: JSON.stringify(inputAddress),
                headers:{
                    "Content-Type":"application/json",
                    // "Authorization": `bearer ${getUserToken()}`,
                }
            }
            const updateAddress = await fetch(`http://localhost:9999/${uId}`, config)
            const parsedAddress = await updateAddress.json()
            console.log("saveAddress:", parsedAddress)
            setSavedAddress(parsedAddress)
            setShowSavedAddress(true)
            setOrderInput({
                ...orderInput,
                street: inputAddress.street,
                city: inputAddress.city,
                state: inputAddress.state,
                zip: inputAddress.zip
            })
        } catch (err) {
            console.log(err)
        }
        setShowAddress(!showAddress)
    }


    const removeAddress = async (id) => {
        const addressId = {_id:id}
        try {
            const config = {
                method: "PUT",
                body: JSON.stringify(addressId),
                headers:{
                    "Content-Type":"application/json",
                    // "Authorization": `bearer ${getUserToken()}`,
                }
            } 
            const removedAddress = await fetch(`http://localhost:9999/${uId}/removeAddress/${id}`, config)
            const parsedRemovedAddress = await removedAddress.json()
            console.log("removeAddress:", parsedRemovedAddress)
            setSavedAddress(parsedRemovedAddress)
            setShowSavedAddress(true)
        } catch (err) {
            console.log(err)
        }
    }

    // -- order --
    const orderFirstName = updatedContact.firstName  || user.firstName
    const orderLastName = updatedContact.lastName || user.lastName
    const orderStreet = updatedAddress.street || uStreet
    const orderApt = updatedAddress.apt || uApt
    const orderCity = updatedAddress.city || uCity
    const orderZip =  updatedAddress.zip || uZip
    const orderState = updatedAddress.state || uState
    const orderPhone = updatedContact.phone || user.phone
    const orderEmail = updatedContact.email || user.email
    const orderDeliveryInstructions = updatedContact.deliveryInstructions || ""


    const [orderInput, setOrderInput] = useState({
        userId: uId,
        firstName: orderFirstName,
        lastName: orderLastName,
        street: orderStreet,
        apt: orderApt,
        city: orderCity,
        zip: orderZip,
        state: orderState,
        phone: orderPhone,
        email: orderEmail,
        deliveryInstructions: orderDeliveryInstructions,
        tip:0,
        isPaid:false
    })

    console.log("orderInput:",orderInput)

    let grandTotal = roundSubTotal + roundTaxes + deliveryFee + Number(orderInput.tip)
    let roundGrandTotal = roundToHundredth(grandTotal)
    console.log("roundGrandTotal:",roundGrandTotal)

    const handleTipChange = (e) => {
        setOrderInput({...orderInput, tip: e.target.value})
        // let grandTotal = roundSubTotal + roundTaxes + deliveryFee + parseInt(tip.tip)
        // let roundGrandTotal = roundToHundredth(grandTotal)
        // console.log("roundGrandTotal (handleChange):", roundGrandTotal)
    }

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
        } catch (err) {
            console.log(err);
        }
    }

    //PAYMENT
    const [isProcessing, setIsProcessing] = useState(false)
    const [checkoutError, setCheckoutError] = useState()

    //stripe.com/docs/js
    const cardElementOptions = {
        style:{
            base:{
                fontSize: "16px",
                iconColor: "white",
                color:"#fff",
                "::placeholder":{
                    color: "white"
                }
            },
            invalid: {
                color: "#FFC7EE",
                iconColor: "#FFC7EE"
            },
            // complete: {

            // }
        },
        hidePostalCode: true
    };

    // create a payment intent on the server
    // client secret of that payment intent

    // need reference to the cardElement
    // need stripe js
    // create a payment method

    // confirm the card payments
    // payment method id
    // client_secret

    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("orderInput: (submit)",orderInput)
        newOrder(orderInput)

        const billingDetails = {
            name: orderFirstName,
            email: orderEmail,
            address: {
                city: orderCity,
                line1: orderStreet,
                state: orderState,
                postal_code: orderZip
            }
        };

        setIsProcessing(true)

        try {
            const { data: clientSecret } = await axios.post(`http://localhost:9999/payment`, {
                amount: roundGrandTotal * 100
            });
            console.log("clientSecret:",clientSecret)

            const cardElement = elements.getElement(CardElement);

            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: billingDetails,
            });
            console.log("paymentMethodReq:",paymentMethodReq)

            if (paymentMethodReq.error){
                setCheckoutError(paymentMethodReq.error.message);
                setIsProcessing(false);
                return
            };

            const {error} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });

            console.log("confirmedCardPayment:", error)

            if(error){
                setCheckoutError(error.message);
                setIsProcessing(false)
                return;
            }

            props.history.push(`/${uId}/feed`)
        } catch (err) {
            setCheckoutError(err.message)
        }
    }

    return (
        <>
       
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-1'>

                    </div>
                    <div className='col-lg-6'>
                        <h3>Review Checkout</h3>
                        <div className='row pt-2 pb-2'>
                            <p>Contact:</p>
                            <div className='col'>
                                {
                                    (updatedContact.firstName === undefined) ?
                                    <form onSubmit={handleContactSubmit}>
                                        <input
                                            onChange={handleContactChange}
                                            name='firstName'
                                            value={inputContact.firstName || ""}
                                            placeholder={user.firstName || "First Name"}
                                        />
                                        <br/>
                                        <br/>
                                        <input
                                            onChange={handleContactChange}
                                            name='lastName'
                                            value={inputContact.lastName || ""}
                                            placeholder={user.lastName || "Last Name"}
                                        />
                                        <br/>
                                        <br/>
                                        <input
                                            onChange={handleContactChange}
                                            name='phone'
                                            value={inputContact.phone || ""}
                                            placeholder={user.phone|| "Phone Number"}
                                        />
                                        <br/>
                                        <br/>
                                        <input
                                            onChange={handleContactChange}
                                            name='email'
                                            value={inputContact.email || ""}
                                            placeholder={user.email|| "Email"}
                                        />
                                        <br/>
                                        <br/>
                                        <textarea
                                            onChange={handleContactChange}
                                            name='deliveryInstructions'
                                            value={inputContact.deliveryInstructions || ""}
                                            placeholder={updatedContact.deliveryInstructions || "Delivery Instructions"}
                                        ></textarea>
                                        <input
                                            type='submit'
                                            value='update'
                                        />
                                    </form>
                                    :
                                    <>
                                        <input
                                            type='button'
                                            onClick={contactOnClick}
                                            value='edit'
                                        />
                                        {
                                            showContact ? 
                                            <>
                                                <p>{updatedContact.firstName || user.firstName} {updatedContact.lastName || user.lastName}</p>
                                                <p>{updatedContact.phone || user.phone}</p>
                                                <p>{updatedContact.deliveryInstructions}</p>
                                            </>
                                            :
                                            <form onSubmit={handleContactSubmit}>
                                                <input
                                                    onChange={handleContactChange}
                                                    name='firstName'
                                                    value={inputContact.firstName || ""}
                                                    placeholder={user.firstName || "First Name"}
                                                />
                                                <br/>
                                                <br/>
                                                <input
                                                    onChange={handleContactChange}
                                                    name='lastName'
                                                    value={inputContact.lastName || ""}
                                                    placeholder={user.lastName || "Last Name"}
                                                />
                                                <br/>
                                                <br/>
                                                <input
                                                    onChange={handleContactChange}
                                                    name='phone'
                                                    value={inputContact.phone || ""}
                                                    placeholder={user.phone || "Phone Number"}
                                                />
                                                <br/>
                                                <br/>
                                                <input
                                                    onChange={handleContactChange}
                                                    name='email'
                                                    value={inputContact.email || ""}
                                                    placeholder={user.email || "Email"}
                                                />
                                                <br/>
                                                <br/>
                                                <textarea
                                                    onChange={handleContactChange}
                                                    name='deliveryInstructions'
                                                    value={inputContact.deliveryInstructions || ""}
                                                    placeholder={updatedContact.deliveryInstructions || "Delivery Instructions"}
                                                ></textarea>
                                                <input
                                                    type='submit'
                                                    value='update'
                                                />
                                            </form>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        <div className='row pt-2 pb-2'>
                            <p>Address:</p>
                            <div className='col'>
                                {
                                    
                                    (updatedAddress.street === undefined) ?
                                    <>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-lg-6'>
                                                    <form onSubmit={saveAddress}>
                                                        <input
                                                            onChange={handleAddressChange}
                                                            name='street'
                                                            value={inputAddress.street || ""}
                                                            placeholder={updatedAddress.street || uStreet || "Street"}
                                                        />
                                                        <br/>
                                                        <br/>
                                                        <input
                                                            onChange={handleAddressChange}
                                                            name='apt'
                                                            value={inputAddress.apt || ""}
                                                            placeholder={updatedAddress.apt || uApt ||"Apt/Suite"}
                                                        />
                                                        <br/>
                                                        <br/>
                                                        <input
                                                            onChange={handleAddressChange}
                                                            name='city'
                                                            value={inputAddress.city || ""}
                                                            placeholder={updatedAddress.city || uCity || "City"}
                                                        />
                                                        <br/>
                                                        <br/>
                                                        <input
                                                            onChange={handleAddressChange}
                                                            name='zip'
                                                            value={inputAddress.zip || ""}
                                                            placeholder={updatedAddress.zip || uZip || "Zip"}
                                                        />
                                                        <br/>
                                                        <br/>
                                                        <input
                                                            onChange={handleAddressChange}
                                                            name='state'
                                                            value={inputAddress.state || ""}
                                                            placeholder={updatedAddress.state || uState || "State"}
                                                        />
                                                        <br/>
                                                        <br/>
                                                        <input
                                                            type='submit'
                                                            value='save'
                                                        />
                                                    </form> 
                                                </div>
                                                <div className='col-lg-6'>
                                                    {
                                                        
                                                        showSavedAddress ? 
                                                        savedAddress.savedAddress && savedAddress.savedAddress.map(address => 
                                                            <div key={address._id} className='border border-primary'>
                                                            {address.street} {address.city} {address.state} {address.zip}
                                                            <input
                                                                type='button'
                                                                value='add'
                                                                onClick={() => setUpdatedAddress({
                                                                    street: address.street,
                                                                    city: address.city,
                                                                    state: address.state,
                                                                    zip: address.zip
                                                                }, setOrderInput({
                                                                    ...orderInput,
                                                                    street: address.street,
                                                                    city: address.city,
                                                                    state: address.state,
                                                                    zip: address.zip
                                                                }),setShowAddress(!showAddress)
                                                                )}
                                                            />
                                                            <input
                                                                type='button'
                                                                onClick={() => removeAddress(address._id)}
                                                                value='remove'
                                                            />
                                                            </div>   
                                                        )
                                                        :
                                                        userSavedAddress && userSavedAddress.map(address =>
                                                            <div key={address._id} className='border border-primary'>
                                                                {address.street} {address.city} {address.state} {address.zip}
                                                                <input
                                                                type='button'
                                                                value='add'
                                                                onClick={() => setUpdatedAddress({
                                                                    street: address.street,
                                                                    city: address.city,
                                                                    state: address.state,
                                                                    zip: address.zip
                                                                },  setOrderInput({
                                                                    ...orderInput,
                                                                    street: address.street,
                                                                    city: address.city,
                                                                    state: address.state,
                                                                    zip: address.zip
                                                                }), setShowAddress(!showAddress))}
                                                                />
                                                                <input
                                                                    type='button'
                                                                    onClick={() =>removeAddress(address._id)}
                                                                    value='remove'
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div> 
                                    </>
                                    :
                                    <>
                                        <input
                                            onClick={addressOnClick}
                                            type='button'
                                            value='edit'
                                        />
                                        {
                                            showAddress ? 
                                            <p>
                                                {updatedAddress.street || uStreet} 
                                                <br/>
                                                {updatedAddress.city || uCity}, {updatedAddress.state || uState} {updatedAddress.zip || uZip}
                                            </p>
                                            :
                                            <>
                                                <div className='container'>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <form onSubmit={saveAddress}>
                                                                <input
                                                                    onChange={handleAddressChange}
                                                                    name='street'
                                                                    value={inputAddress.street || ""}
                                                                    placeholder={updatedAddress.street || uStreet || "Street"}
                                                                />
                                                                <br/>
                                                                <br/>
                                                                <input
                                                                    onChange={handleAddressChange}
                                                                    name='apt'
                                                                    value={inputAddress.apt || ""}
                                                                    placeholder={updatedAddress.apt || uApt ||"Apt/Suite"}
                                                                />
                                                                <br/>
                                                                <br/>
                                                                <input
                                                                    onChange={handleAddressChange}
                                                                    name='city'
                                                                    value={inputAddress.city || ""}
                                                                    placeholder={updatedAddress.city || uCity || "City"}
                                                                />
                                                                <br/>
                                                                <br/>
                                                                <input
                                                                    onChange={handleAddressChange}
                                                                    name='zip'
                                                                    value={inputAddress.zip || ""}
                                                                    placeholder={updatedAddress.zip || uZip || "Zip"}
                                                                />
                                                                <br/>
                                                                <br/>
                                                                <input
                                                                    onChange={handleAddressChange}
                                                                    name='state'
                                                                    value={inputAddress.state || ""}
                                                                    placeholder={updatedAddress.state || uState || "State"}
                                                                />
                                                                <br/>
                                                                <br/>
                                                                <input
                                                                    type='submit'
                                                                    value='save'
                                                                />
                                                            </form> 
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            {
                                                                
                                                                showSavedAddress ? 
                                                                savedAddress.savedAddress && savedAddress.savedAddress.map(address => 
                                                                    <div key={address._id} className='border border-primary'>
                                                                    {address.street} {address.city} {address.state} {address.zip}
                                                                    <input
                                                                        type='button'
                                                                        value='add'
                                                                        onClick={() => setUpdatedAddress({
                                                                            street: address.street,
                                                                            city: address.city,
                                                                            state: address.state,
                                                                            zip: address.zip
                                                                        },  setShowAddress(!showAddress))}
                                                                    />
                                                                    <input
                                                                        type='button'
                                                                        onClick={() => removeAddress(address._id)}
                                                                        value='remove'
                                                                    />
                                                                    </div>   
                                                                )
                                                                :
                                                                userSavedAddress && userSavedAddress.map(address =>
                                                                    <div key={address._id} className='border border-primary'>
                                                                        {address.street} {address.city} {address.state} {address.zip}
                                                                        <input
                                                                        type='button'
                                                                        value='add'
                                                                        onClick={() => setUpdatedAddress({
                                                                            street: address.street,
                                                                            city: address.city,
                                                                            state: address.state,
                                                                            zip: address.zip
                                                                        },  setShowAddress(!showAddress))}
                                                                        />
                                                                        <input
                                                                            type='button'
                                                                            onClick={() =>removeAddress(address._id)}
                                                                            value='remove'
                                                                        />
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div> 
                                            </>
                                        }
                                    </>
                                }
                                
                            </div>

                        </div>
                        <div className='row pt-2 pb-2'>
                            <p>Payment:</p>
                            <div style={CardElementContainer}>
                                <CardElement options={cardElementOptions}/>
                            </div>
                        </div>
                        <div className='row border-top'>
                        <h5 className='pt-3'>Your Items:</h5>
                            {cart && cart.map((product) => (
                            <>
                                <div key={product._id} className='col-md-12 container my-2 border border-primary'>
                                    <div className='row'>
                                        <div className='col-lg-1'>
                                            <UpdateQty 
                                                id={product._id} 
                                                qty={product.qty} 
                                                history={props.history}  
                                                getCart={props.getCart}    
                                            />
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
                                            <p>${roundToHundredth(product.total)}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-4 container p-3'>
                    <form onSubmit={handleSubmit}>
                        <h6>Subtotal: ${roundSubTotal}</h6>
                        <p>Taxes:${roundTaxes}</p>
                        <p className='border-bottom pb-3'>Delivery Fee: ${deliveryFee}</p>
                        <div className='row'>
                        <p>Add Tip: ${orderInput.tip}</p>
                            <div className='container pb-4'>
                                <input
                                    type='Number'
                                    name='tip'
                                    onChange={handleTipChange}
                                    placeholder='Custom Tip'
                                    value={orderInput.tip}
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
                        <input 
                            id='pOrder'
                            type='submit'
                            disabled={isProcessing}
                            value={`Place Order ${roundGrandTotal}`}    
                        />
                            {/* {
                                isProcessing ? "Processing..." : `Pay $${roundGrandTotal}`
                            } */
                                checkoutError && <p>{checkoutError}</p>
                            }
                     
                    </form>
                    </div>
                </div>

            </div>
            <Link to={`/${uId}/feed`}>Home</Link>
       
        </>
    )
}

