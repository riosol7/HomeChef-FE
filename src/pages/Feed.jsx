import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { getUserToken } from "../utils/authToken";
import { AiOutlineShoppingCart } from "react-icons/ai"

export default function Feed (props) {
    const {uId} = useParams()
    const [list, setList] = useState([])
    
    //FETCH - LIST items
    const getItems = async () => {
        try{
            const config = {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `bearer ${getUserToken()}`
                }
            };
            const items = await fetch(`http://localhost:9999/${uId}/item`, config)
            const parsedItems = await items.json()
            setList(parsedItems)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getItems()
    // eslint-disable-next-line  
    }, [])

    const [input, setInput] = useState({
        itemId: "",
        qty:0
    })
    
    //FETCH - USER cart, post item to user's cart
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
        <>
            <div className='container'>
                <div className='row'>
                    {
                        list && list.map((item) => (
                            <div key={item._id} className='col-sm-4 m-2'>
                                <div className='row border border-primary'>
                                    {item.image}
                                </div>
                                <div className='row'>
                                    <h5>{item.title}</h5>
                                </div>
                                <div className='row'>
                                    <p className='text'>{item.description}</p>           
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <p>${item.price}</p>
                                    </div>
                                    <div className='col-sm-3'>
                                        <input
                                            id='qty'
                                            name="qty"
                                            type="Number"
                                            value={input.qty}
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                    <div className='col-sm-3 d-flex justify-content-end'>
                                        <AiOutlineShoppingCart  
                                            id='cart'
                                            onClick={() => handleAddToCart(item._id)}
                                            onChange={handleChange}
                                            onSubmit={handleSubmit}
                                        ></AiOutlineShoppingCart>
                                    </div>
                                </div>
                            </div>
                        ))
                    }   
                </div>
            </div>  
            <div>
                <Link to={`/${uId}/chef`}>Start cooking?</Link>
                <Link to={`/${uId}/newChef`}>Create a Chef Account</Link>
            </div>
        </>
    )
}