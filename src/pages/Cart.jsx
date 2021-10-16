import React, {useState, useEffect} from 'react';
import {getUserToken} from '../utils/authToken'
import { useParams, Link } from "react-router-dom";

export default function Cart (props) {
    const {uId} = useParams()
    const [list, setList] = useState([])

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
            setList(parsedCartItems)
        } catch(err) {
            console.log(err)
        };
    };

    useEffect(() => {
        getCart();// eslint-disable-next-line
    }, [])

    console.log(list)
    return (
        <>

            <div className="container">
                <div className="row">
                    {list && list.map((cart) => (
                        <div key={cart._id} className='col-sm-6 m-1 border border-primary'>
                            
                            {cart.title}
                        </div>
                    ))}

                </div>

            </div>
            <Link to={`/${uId}/feed`}>Home</Link>
        </>
    )
}