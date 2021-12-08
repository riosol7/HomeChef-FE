import React, { useState, useEffect }  from 'react'
import { getUserToken } from "../../utils/authToken";
import { useParams } from "react-router-dom";
//REACT ICONS
import { AiOutlineShoppingCart } from "react-icons/ai"

const OPTION_STYLES = {
    backgroundColor: 'Black',
    color:'#FFF',
    // borderRadius:'50px',
    paddingLeft:'1rem',
    paddingRight:'1rem'
}

const INPUT_QTY = {
    width:'52px',
    height:'40px',
    border:'rgb(250, 241, 237)',
    borderRadius: '12px',
    borderTopRightRadius:'0px',
    borderBottomRightRadius:'0px',
    textAlign:'center',
}

const CART_BTN = {
    background: '#f98030',
    color: 'whitesmoke',
    border:'#f98030',
    width: '73.963%',
    borderRadius: '12px',
    borderTopLeftRadius:'0px',
    borderBottomLeftRadius:'0px',
}

export default function CartModalBtn (props) {
    const {uId} = useParams()
    const itemId = props.item._id
    const item = props.item
    
    const [selectedOptions, setSelectedOptions] = useState([])

    const addOption = (idxToAdd) => {
        const selectedItemArr = item.options.filter((_, idx) => idx === idxToAdd)
        const selectedItem = selectedItemArr[0]
        const checkOption = selectedOptions.filter(item => item === selectedItem)
        if(checkOption.length >= 1) {
            const removedOptionArr = selectedOptions.filter(item => item !== selectedItem)
            setSelectedOptions(removedOptionArr)  
        } else {
            setSelectedOptions([...selectedOptions, selectedItem])
        }
    }

    console.log("selectedOptions:", selectedOptions)

  
    //FETCH - USER adds item(s) to their cart
    const [input, setInput] = useState({
        _id: itemId,
        qty:0,
        total:0,
        options:selectedOptions
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
    }

    useEffect(() => {
        setInput({...input,
            options: selectedOptions, 
        })
         // eslint-disable-next-line 
    }, [selectedOptions])

    
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
                                type='radio'
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
       <form onSubmit={handleSubmit}>
            <div className='row pt-2 pb-2 d-flex align-items-center'>
                <input
                    style={INPUT_QTY}
                    name="qty"
                    type="Number"
                    value={input.qty}
                    onChange={handleChange}
                />
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
                    <p className='my-2 px-3'>${item.price}</p>
                </button>
            </div>
        </form>
        </>
    )
}
 
