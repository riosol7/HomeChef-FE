import React, { useState }  from 'react'
import { getUserToken } from "../utils/authToken";
import { useParams } from "react-router-dom";
//CONTEXT
import { useItemAPI } from "../context/ItemContext";
//BOOTSTRAP
import Spinner from 'react-bootstrap/Spinner'
//REACT ICONS
import { AiOutlineShoppingCart } from "react-icons/ai"

export default function ItemList(props) {
    const { itemData, isLoading } = useItemAPI()
    const {uId} = useParams()
    const [input, setInput] = useState({
        itemId: "",
        qty:0
    })
    
    //FETCH - USER cart, post item to user's cart -TBD
    const postCart = async (data) => {
        try{
            const config = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${getUserToken()}`,
                }
            };// eslint-disable-next-line
            const addToCart = await fetch(`http://localhost:9999/${uId}`, config)
            props.history.push(`/${uId}/feed`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleAddToCart = (e) => {
        console.log(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        postCart(input)
    }

    return (
        <div className='col-md-8 container food_items p-5'>
            <div className='row d-flex align-items-center'>
                { isLoading ? (<> <Spinner animation='border' className='d-flex justify-content-center' variant='info'/> </>):(
                    itemData && itemData.map((item) => (
                        <div key={item._id} className='col-md-5 m-4'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-sm-6'>
                                    <img 
                                        src={item.image} 
                                        alt='img'
                                        className='chef-img'
                                    />
                                </div>
                                <div className='col-sm-6'>
                                    <div className='row pt-3'>
                                        <h5 className="pb-2 border-bottom">{item.title}</h5>
                                    </div>
                                    <div className='row'>
                                        <p className='text'>{item.description}</p>           
                                    </div>
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-sm-6 '>
                                            <p>${item.price}</p>
                                        </div>
                                        <div className='col-sm-6 pb-2'>
                                            <input
                                                id='qty'
                                                // name="qty"
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
                                                        onClick={() => handleAddToCart(item._id)}
                                                        onChange={handleChange}
                                                        onSubmit={handleSubmit}
                                                    ></AiOutlineShoppingCart>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>            
                            </div>     
                        </div>
                    ))
                )}   
            </div>
        </div>
    )
}
