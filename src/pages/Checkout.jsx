import React, {useState, useEffect} from 'react';
import {getUserToken} from '../utils/authToken'
import { useParams } from "react-router-dom";

import OrderForm from "../components/OrderForm";

// import UpdateQty from "../components/UpdateQty"
// import { useChefAPI } from "../context/ChefContext";

export default function Cart (props) {
    // const { chefData } = useChefAPI()
    const {uId} = useParams()

    //USER CONTEXT
    const [user, setUser] = useState({})
    const getUser = async () => {
        try{
            const user = await fetch(`http://localhost:9999/${uId}`)
            const parsedUser = await user.json()
            setUser(parsedUser)
        } catch (err) {
            console.log(err)
        };
    };
    console.log("user:",user)

    //CART CONTEXT
    const [cart, setCart] = useState([])
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
            setCart(parsedCartItems)
        } catch(err) {
            console.log(err)
        };
    };

    useEffect(() => {
        getUser();
        console.log("getUser(ufx):",user)
        getCart();
        console.log("getCart(ufx):",cart)
        // eslint-disable-next-line
    }, [])



    // const test = cart.map(item => item.chef)
    // console.log(test)
    // const test2 = chefData.filter(chef => chef._id === cart.chef)
    // console.log(test2)

    return (
        <>
            <OrderForm 
                uId={uId}
                user={user}
                cart={cart}
                history={props.history}
                getCart={getCart}
            />
        </>
    )
}