import React, {useState, useEffect} from 'react';
import {getUserToken} from '../../utils/authToken'
import { useParams } from "react-router-dom";

import CheckoutNavbar from "../../components/Checkout/CheckoutNavbar"
import OrderForm from "../../components/Checkout/OrderForm";

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
        // console.log("getUser(ufx):",user)
        getCart();
        // console.log("getCart(ufx):",cart)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <CheckoutNavbar uId={uId} />
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