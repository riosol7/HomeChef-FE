import React, { useState }  from 'react'
import { getUserToken } from "../../utils/authToken";
import { useParams } from "react-router-dom";
//REACT ICONS
import { AiOutlineShoppingCart } from "react-icons/ai"

export default function Cart (props) {
    const {uId} = useParams()
    const itemId = props.item._id
    const item = props.item
  
    //FETCH - USER adds item(s) to their cart
    const [input, setInput] = useState({
        _id: itemId,
        qty:0,
        total:0,
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
            props.history.push(`/${uId}/feed`)
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

    
    return (
        <form onSubmit={handleSubmit}>
            <div className='col-sm-6 pb-2'>
                <h5>${item.price}</h5>
                <input
                    id='qty'
                    name="qty"
                    type="Number"
                    value={input.qty}
                    onChange={handleChange}
                ></input>
            </div>
            <div className='row pt-2'>
                <div className='col d-flex justify-content-start'>
                    <button className='cartBtn'>
                        <AiOutlineShoppingCart  
                            id='cart'
                            name="_id"
                            value={input._id}
                            onChange={handleChange}
                            type="submit">
                        </AiOutlineShoppingCart>
                    </button>
                </div>
            </div>
        </form>
    )
}
 
