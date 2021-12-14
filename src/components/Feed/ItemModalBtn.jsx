import React, { useState, useEffect }  from 'react'
import { getUserToken } from "../../utils/authToken";
import { useParams } from "react-router-dom";
//REACT ICONS
import { AiOutlineShoppingCart } from "react-icons/ai"

const OPTION_STYLES = {
    backgroundColor: 'Black',
    color:'#FFF',
    paddingLeft:'1rem',
    paddingRight:'1rem'
}

const QTY_BTN = {
    width:'3rem',
    height:'3rem',
    border:'solid #ebebeb',
    borderRadius: '50%',
    background:'#ebebeb',
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

    
    return (
        <>
        {
            item.options === undefined ?
            <>
            </>
            :
            item.options.map((option, idx) => (
                <div key={idx} className='pt-2 pb-2' style={OPTION_STYLES}>
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
       
            <div className='row pt-2 d-flex align-items-center'>
                <div className='col-md-3'>
                    <div className='row pt-2 '>
                        <div className='col-md-5'>
                            <input
                                style={QTY_BTN}
                                type='button'
                                value='-'
                                onClick={decrementQty}
                            />
                        </div>
                        <div className='col-md-2 d-flex justify-content-center'>
                            <p className='my-2'>{qty}</p>
                        </div>
                        <div className='col-md-5'>
                            <input
                                style={QTY_BTN}
                                type='button'
                                value='+'
                                onClick={incrementQty}
                            />  
                        </div>
                    </div>
                </div>
                <div className='col-md-9'>
                <form onSubmit={handleSubmit}>
                    <button 
                        style={CART_BTN} 
                        className='d-flex align-items-center justify-content-center'
                    >
                        <AiOutlineShoppingCart  
                            id='cart'
                            name="_id"
                            value={input._id}
                            onChange={handleChange}
                            type="submit">
                        </AiOutlineShoppingCart>
                        <p className='my-2 px-3'>${price ||item.price}</p>
                    </button>
                    </form>
                </div>
            </div>
        </>
    )
}
 
