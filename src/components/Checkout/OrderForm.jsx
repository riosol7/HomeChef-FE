import React, { useState } from 'react'
import {getUserToken} from '../../utils/authToken'

import axios from "axios"

import UpdateQty from "./UpdateQty"
import TipModal from "./TipModal"
import { useChefsAPI } from "../../context/ChefsContext"

import stateTaxes from "../../helpers/stateTaxes"

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
    const { chefsData } = useChefsAPI()

    //COST
    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }

    const totalArr = cart && cart.map(item => item.total)
    let subTotal = totalArr.reduce((a, b) => a + b, 0)
    const roundSubTotal = roundToHundredth(subTotal)


    const calcTipLow = roundSubTotal * 0.15
    const roundLowTip = Math.round(calcTipLow)
    const calcTipMed = roundSubTotal * 0.30
    const roundMedTip = Math.round(calcTipMed)
    const calcTipHigh = roundSubTotal * 0.45
    const roundHighTip = Math.round(calcTipHigh)

    const deliveryFee = 1.99

    const uStreet = user.address && user.address.street
    const uApt = user.address && user.address.apt
    const uCity = user.address && user.address.city
    const uZip = user.address && user.address.zip
    const uState = user.address && user.address.state 

    const [ taxRate, setTaxRate ] = useState(0)

    //CREATE ORDER
    // -- contact --
    const [showContact, setShowContact] = useState(false)
    const contactOnClick = () => setShowContact(!showContact)

    const initialContactState = {
        fullName: user.fullName,
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
            fullName: inputContact.fullName,
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
    // console.log("userSavedAddress:",userSavedAddress)

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
            const findTaxRateArr = stateTaxes.filter(tax => tax.state === inputAddress.state)
            setTaxRate(findTaxRateArr[0].rate)      
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
    const orderFullName = updatedContact.fullName || user.fullName
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
        fullName: orderFullName,
        street: orderStreet,
        apt: orderApt,
        city: orderCity,
        zip: orderZip,
        state: orderState,
        phone: orderPhone,
        email: orderEmail,
        deliveryInstructions: orderDeliveryInstructions,
        tip: 0,
        isPaid:false
    })

    console.log("orderInput:",orderInput)

    const taxes = roundSubTotal * taxRate
    const roundTaxes = roundToHundredth(taxes)

    let orderTotal = roundSubTotal + roundTaxes + deliveryFee
    let roundOrderTotal = roundToHundredth(orderTotal)
    // console.log("roundOrderTotal:",roundOrderTotal)
    let grandTotal = roundSubTotal + roundTaxes + deliveryFee + Number(orderInput.tip)
    let roundGrandTotal = roundToHundredth(grandTotal)
    // console.log("roundGrandTotal:",roundGrandTotal)

    const [ showCustomTip, setShowCustomTip ] = useState(false)

    const handleTipChange = (e) => {
        setOrderInput({...orderInput, tip: e.target.value})
    }

    const setLowTip = () => {
        setOrderInput({...orderInput, tip: roundLowTip})
    }

    const setMedTip = () => {
        setOrderInput({...orderInput, tip: roundMedTip})
    }

    const setHighTip = () => {
        setOrderInput({...orderInput, tip: roundHighTip})
    }

    const handleTipSubmit = (e) => {
        e.preventDefault()
        setOrderInput({...orderInput})
        setShowCustomTip(!showCustomTip)
        
    }

    //PAYMENT
    const [checkoutError, setCheckoutError] = useState()
    const [isProcessing, setIsProcessing] = useState(false)
    const stripe = useStripe();
    const elements = useElements();


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

            const billingDetails = {
                name: orderFullName,
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
                const { data: clientSecret } = await axios.post(
                    `http://localhost:9999/${uId}/payment`, {
                        amount: roundGrandTotal * 100
                    }
                );
                console.log("clientSecret:",clientSecret)
    
                const cardElement = elements.getElement(CardElement);
    
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method:{
                        card: cardElement,
                        billing_details: billingDetails,
                    } 
                });
                console.log("confirmedCardPayment:", result)
                props.history.push(`/${uId}/feed`)
                
            } catch (err) {
                setCheckoutError(err.message)
            }

            try {
                const configs ={
                    method:'PUT',
                    body:JSON.stringify(parsedNewOrder),
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `bearer ${getUserToken()}`,
                    },
                };
                const updateOrder = await fetch(
                    `http://localhost:9999/${uId}/isPaid`, 
                    configs
                );
                const parsedUpdatedOrder = await updateOrder.json()
                console.log("updatedOrder:", parsedUpdatedOrder)
            } catch (err) {
                console.log(err)
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("orderInput: (submit)",orderInput)
        newOrder(orderInput)
    }

    const findChef = (id) => {
        const matchId = chefsData.filter(chef => chef._id === id)
        if(matchId[0] !== undefined){
            return matchId[0].name
        }
        return
    }

    const selectSavedAddress = (address) => {
        setUpdatedAddress({
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip
        })
        setOrderInput({
            ...orderInput,
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip
        })
        setShowAddress(!showAddress)
        const findTaxRateArr = stateTaxes.filter(tax => tax.state === address.state)
        setTaxRate(findTaxRateArr[0].rate)      
    }

    return (
        <>
            <div className='container-fluid pt-3 pb-3'>
                <div className='row'>
                    <div className='col-lg-1'></div>
                    <div className='col-lg-6'>
                        <h3>Review Checkout</h3>
                        <div className='row pt-3 pb-3'>
                            <h6>Contact:</h6>
                            <div className='col'>
                                {
                                    (updatedContact.fullName === undefined) ?
                                    <div className='container'> 
                                    <form onSubmit={handleContactSubmit}>
                                        <input
                                            onChange={handleContactChange}
                                            name='fullName'
                                            value={inputContact.fullName || ""}
                                            placeholder={user.fullName|| "Full Name"}
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
                                        <br/>
                                        <br/>
                                        <input
                                            type='submit'
                                            value='update'
                                        />
                                    </form>
                                    </div>
                                    :
                                    <>
                                        <input
                                            id='pencil'
                                            type='button'
                                            onClick={contactOnClick}
                                            value='edit'
                                        />
                                        {
                                            showContact ? 
                                            <div className='container'>
                                                <p>{updatedContact.fullName || user.fullName}</p>
                                                <p>{updatedContact.phone || user.phone}</p>
                                                <p>{updatedContact.deliveryInstructions}</p>
                                            </div>
                                            :
                                            <>
                                            <form onSubmit={handleContactSubmit}>
                                                <input
                                                    onChange={handleContactChange}
                                                    name='firstName'
                                                    value={inputContact.fullName || ""}
                                                    placeholder={user.fullName || "Full Name"}
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
                                                <br/>
                                                <br/>
                                                <input
                                                    type='submit'
                                                    value='update'
                                                />
                                            </form>
                                            </>
                                        }
                                    </>
                                   
                                }
                            </div>
                        </div>
                        <div className='row pt-3 pb-3'>
                            <h6>Address:</h6>
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
                                                                onClick={() => selectSavedAddress(address)}
                                                            />
                                                            <input
                                                                type='button'
                                                                onClick={() => removeAddress(address._id)}
                                                                value='remove'
                                                            />
                                                            </div>   
                                                        )
                                                        :
                                                        <div className='row d-flex justify-content-center'>
                                                            {
                                                                userSavedAddress && userSavedAddress.map(address =>
                                                                    <div key={address._id} className='col-md-7 m-2 p-4 border border-primary'>
                                                                        <p>
                                                                            {address.street} 
                                                                            <br/>
                                                                            {address.city}, {address.state} {address.zip}
                                                                        </p>
                                                                        <input
                                                                            type='button'
                                                                            value='add'
                                                                            onClick={() => selectSavedAddress(address)}
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
                                            <div className='container'>
                                                <p>
                                                    {updatedAddress.street || uStreet}
                                                    <br/>
                                                    {updatedAddress.city || uCity}, {updatedAddress.state || uState} {updatedAddress.zip || uZip}
                                                </p>
                                            </div>
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
                                                                    <div key={address._id} className='col-md-7 m-2 p-4 border border-primary'>
                                                                    {address.street} {address.city} {address.state} {address.zip}
                                                                    <input
                                                                        type='button'
                                                                        value='add'
                                                                        onClick={() => selectSavedAddress(address)}
                                                                    />
                                                                    <input
                                                                        type='button'
                                                                        onClick={() => removeAddress(address._id)}
                                                                        value='remove'
                                                                    />
                                                                    </div>   
                                                                )
                                                                :
                                                                <div className='row d-flex justify-content-center'>
                                                                {
                                                                    userSavedAddress && userSavedAddress.map(address =>
                                                                        <div key={address._id} className='col-md-7 m-2 p-4 border border-primary'>
                                                                            <p>
                                                                                {address.street} 
                                                                                <br/>
                                                                                {address.city}, {address.state} {address.zip}
                                                                            </p>
                                                                            <input
                                                                                type='button'
                                                                                value='add'
                                                                                onClick={() => selectSavedAddress(address)}
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
                        <div className='row pt-3 pb-3'>
                            <h6>Payment:</h6>
                            <div style={CardElementContainer}>
                                <CardElement options={cardElementOptions}/>
                            </div>
                        </div>
                        <div className='row pt-3 pb-3 border-top'>
                        <h5 className='pt-3'>Your Items:</h5>
                            {cart && cart.map((product) => (
                            <>
                                <div key={product._id} className='col-md-12 container my-2 border border-primary'>
                                    <div className='row'>
                                        <div className='col-lg-2 d-flex justify-content-end align-items-start pt-3'>
                                            <UpdateQty 
                                                id={product._id} 
                                                qty={product.qty} 
                                                history={props.history}  
                                                getCart={props.getCart}    
                                            />
                                        </div>
                                        <div className='col-lg-8'>
                                            <div className='row'>
                                                <div className='col-lg-3 p-1 d-flex align-items-center'>
                                                    <img
                                                        src={product.item.image}
                                                        alt='cart-item-img'
                                                        className='chef-img'
                                                    />
                                                </div>
                                                <div className='col-lg-9 pt-2 pb-2'>
                                                    <div className='pt-2 d-flex align-items-center justify-content-between'>
                                                        <h6>{product.item.title}</h6>
                                                        <h6>${product.item.price}</h6>
                                                    </div>
                                                    <div className='container pt-1 pb-2'>
                                                        <p>By:{findChef(product.chef)}</p>
                                                        <div className='row pt-2 pb-2'>
                                                        {
                                                            product.options.map((option,idx) => (
                                                                <div className='d-flex align-items-center justify-content-between'>
                                                                    <p key={idx}>{option.name}</p>
                                                                    <p>${option.price}</p>
                                                                </div>
                                                            ))
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        </div>
                                        <div className='col-lg-2 pt-2 d-flex justify-content-center'>
                                            <p>${roundToHundredth(product.total)}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-4 container p-3 d-flex justify-content-center'>
                    <form onSubmit={handleSubmit} style={{position: "fixed"}}>
                        <div className='pb-1 d-flex align-items-center justify-content-between'>
                            <h6>Subtotal:</h6>
                            <h6>${roundSubTotal}</h6>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p>Taxes:</p>
                            <p>${roundTaxes}</p>
                        </div>
                        <div className='border-bottom pb-3 d-flex align-items-center justify-content-between'>
                            <p> Delivery Fee: </p>
                            <p>${deliveryFee}</p>
                        </div>
                        <div className='row pt-2 pb-3'>
                        <p>Add Tip: ${orderInput.tip}</p>
                            <div className='col-md-3'>
                                <input 
                                    name="radioValues"
                                    type='radio' 
                                    onClick={() => setLowTip()}
                                    value={orderInput.tip}
                                />
                                ${roundLowTip}
                            </div>
                            <div className='col-md-3'>
                                <input 
                                    name="radioValues"
                                    type='radio' 
                                    onClick={() => setMedTip()}
                                    value={orderInput.tip}
                                />
                                ${roundMedTip}
                            </div>
                            <div className='col-md-3'>
                                <input 
                                    name="radioValues"
                                    type='radio' 
                                    onClick={() => setHighTip()}
                                    value={orderInput.tip}
                                />
                                ${roundHighTip}
                            </div>
                            <div className='col-md-3'>
                                <input
                                    onClick={() => setShowCustomTip(!showCustomTip)}
                                    value='Other'
                                    type='button'
                                /> 
                            </div>
                        </div>
                        <div className='border-top pt-4'>
                            {
                                cart.length >= 1 ?
                                <input
                                    id='pOrder'
                                    type='submit'
                                    disabled={isProcessing}
                                    value={`Place Order $${roundGrandTotal}`}   
                                />
                                :
                                <input
                                    id='pOrder'
                                    type='submit'
                                    value={`Place Order $${roundGrandTotal}`}  
                                    disabled 
                                />
                            }
                        </div>
                            {/* {
                                isProcessing ? "Processing..." : `Pay $${roundGrandTotal}`
                            } */
                                checkoutError && <p>{checkoutError}</p>
                            }
                     
                    </form>
                    {
                        showCustomTip ?
                        <TipModal open={showCustomTip} onClose={() => setShowCustomTip(false)}>
                            <form onSubmit={handleTipSubmit}>
                                <div className='container pb-4'>
                                <input
                                    type='Number'
                                    name='tip'
                                    onChange={handleTipChange}
                                    placeholder='Custom Tip'
                                    value={orderInput.tip}
                                />
                                </div>
                                <p>Your order is ${roundOrderTotal}</p>
                                <input
                                    type='submit'
                                    value='save'
                                />
                            </form>
                        </TipModal>
                    :
                    <>
                    </>
                    }
                    </div>
                </div>

            </div>
        </>
    )
}

