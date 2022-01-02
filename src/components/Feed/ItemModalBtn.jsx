import React, { useState, useEffect }  from 'react'
import { getUserToken } from "../../utils/authToken";
import { useParams } from "react-router-dom";
import { Icon } from '@iconify/react';

const OPTION_STYLES = {
    backgroundColor: 'white',
    color:'black',
    paddingLeft:'1rem',
    paddingRight:'1rem',
}

const QTY_BTN = {
    width:'3rem',
    height:'3rem',
    border:'solid #ebebeb',
    borderRadius: '50%',
    background:'#ebebeb',
    fontSize:'1.2rem',
    
}

const CART_BTN = {
    background: '#f98030',
    color: 'whitesmoke',
    border:'#f98030',
    width: '100%',
    height:'3rem',
    fontSize:'1.1rem'
}

export default function CartModalBtn (props) {
    const {uId} = useParams()
    const itemId = props.item._id
    const item = props.item
    
    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }

    const [qty, setQty] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [price, setPrice] = useState(roundToHundredth(qty * item.price))

    const incrementQty = () => {
        if(qty < 20){
            setQty(qty + 1)
            if(selectedOptions.length >= 1){
                const selectedOptionsPrices = selectedOptions.map(option => option.price)
                const optionTotal = selectedOptionsPrices.reduce((a, b) => Number(a) + Number(b), 0)
                const roundOptionTotal = roundToHundredth(optionTotal)
                console.log("roundOptionTotal:", roundOptionTotal)
                setPrice(roundToHundredth(price + item.price + roundOptionTotal))
            } else {
                setPrice(roundToHundredth(price + item.price))
            }
        }
    }

    const decrementQty = () => {
        if(qty === 1){
            return
        } else {
            setQty(qty - 1)
            if(selectedOptions.length >= 1){
                const selectedOptionsPrices = selectedOptions.map(option => option.price)
                const optionTotal = selectedOptionsPrices.reduce((a, b) => Number(a) + Number(b), 0)
                const roundOptionTotal = roundToHundredth(optionTotal)
                console.log("roundOptionTotal:", roundOptionTotal)
                setPrice(roundToHundredth((price - item.price) - roundOptionTotal))
            } else {
                setPrice(roundToHundredth(price - item.price))
            }
        }
    }

    const addOption = (idxToAdd) => {
        const selectedItemArr = item.options.filter((_, idx) => idx === idxToAdd)
        const selectedItem = selectedItemArr[0]
        const checkOption = selectedOptions.filter(item => item === selectedItem)
        if(checkOption.length >= 1) {
            const removedOptionArr = selectedOptions.filter(item => item !== selectedItem)
            setSelectedOptions(removedOptionArr)
            setPrice(roundToHundredth(price - (qty * Number(selectedItem.price))))  
        } else {
            console.log("qty+:",qty)
            setSelectedOptions([...selectedOptions, selectedItem])
            setPrice(roundToHundredth(price + (qty * Number(selectedItem.price))))
        }
    }

    //FETCH - USER adds item(s) to their cart
    const [input, setInput] = useState({
        _id: itemId,
        qty: qty,
        total: 0,
        options: selectedOptions
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
        props.onClose()
    }

    useEffect(() => {
        setInput({...input,
            options: selectedOptions, 
        })
         // eslint-disable-next-line 
    }, [selectedOptions])

    useEffect(() => {
        setInput({...input,
            qty: qty
        })
         // eslint-disable-next-line 
    }, [qty])

    const [show, setShow] = useState(true)
    const [arrow, setArrow] = useState(true)
    
    const showOpt = () => {
        setShow(!show)
        setArrow(!arrow)
    }

    return (
        <>  
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
                            <h4 className='m-0 px-2 pb-4 pt-4'>Add Ons</h4>
                            {
                                arrow ?
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
                            show ?
                                item.options.map((option, idx) => (
                                    <div key={idx} className='pt-3 pb-3' style={OPTION_STYLES}>
                                        <div className='d-flex align-items-center'>
                                            <input
                                                type='checkbox'
                                                onClick={() => addOption(idx)}
                                                style={{
                                                    
                                                }}
                                            />
                                            <div className='col pb-1'>
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <div className='px-3'>
                                                        <h6 className='m-0'>{option.name}</h6>
                                                        <p className='m-0'>{option.description}</p>  
                                                    </div> 
                                                    <p className='m-0'>${option.price}</p>
                                                </div>                                 
                                            </div>
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
            <div className='p-4 d-flex align-items-center border-top'>
                <div className='px-2 col-md-3 d-flex align-items-center justify-content-between '>
                    <input
                        style={QTY_BTN}
                        type='button'
                        value='-'
                        onClick={decrementQty}
                    /> 
                    <p className='m-0'>{qty}</p>
                    <input
                        style={QTY_BTN}
                        type='button'
                        value='+'
                        onClick={incrementQty}
                    /> 
                </div>
                <div className='col-md-9'>
                    <form onSubmit={handleSubmit}>
                        <button 
                            style={CART_BTN} 
                            className='d-flex align-items-center justify-content-center'
                        >
                            <Icon
                                icon='whh:addtocart'  
                                id='cart'
                                name="_id"
                                value={input._id}
                                onChange={handleChange}
                                type="submit"
                            />
                            <p className='my-2 px-3'>${price ||item.price}</p>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
 
