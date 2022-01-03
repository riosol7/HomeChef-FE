import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {getUserToken} from '../../utils/authToken'

import DetailsNavbar from "../../components/ItemDetails/DetailsNavbar"

// import ItemModal from "../../components/Feed/ItemModal";
import CartCol from "../../components/ItemDetails/CartCol";

// import { Icon } from '@iconify/react';

export default function Chef(props) {
    const {uId} = useParams()
    const chefId = props.match.params.id 
    const [cartColOpen, setCartColOpen] = useState(false)
    const [cart, setCart] = useState([])
    const [user, setUser] = useState({})
    const [chefData, setData] = useState({})
    const [isChefLoading, setIsChefLoading] = useState(true)

    // const [isOpen, setIsOpen] = useState(false)
    // const [itemModal, setItemModal] = useState({})

    // const viewItemModalClick = (data) => {
    //     setIsOpen(true)
    //     setItemModal(data)
    // }

    // const closeModal = () => {
    //     setIsOpen(false)
    //     setItemModal({})
    // }

    const getUser = async () => {
        try{
            const user = await fetch(`http://localhost:9999/${uId}`)
            const parsedUser = await user.json()
            setUser(parsedUser)
        } catch (err) {
            console.log(err)
        };
    };

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
    

    const cartNum = cart && cart.length

    const getChef = async () => {
        try{
            const chef = await fetch(`http://localhost:9999/${uId}/chef/${chefId}`)
            const parsedChef = await chef.json()
            setData(parsedChef)
            setIsChefLoading(false)
        } catch (err) {
            console.log(err)
        };
    };

    console.log('chefData:',chefData)
    console.log('user:',user)
    

     useEffect(()=>{
        getUser()
        getCart()
        getChef()
        // eslint-disable-next-line   
    }, [])
    return (
        <>
            <div className='d-flex'>   
                <div className={cartColOpen ? 'col-lg-10' : 'col-lg-12'}>
                    <DetailsNavbar 
                        uId={uId} 
                        cartNum={cartNum}
                        cart={cart}
                        getUser={getUser}
                        getCart={getCart}
                        cartColOpen={cartColOpen}
                        setCartColOpen={setCartColOpen}
                        history={props.history}
                    />

                </div>
                {
                    cartColOpen ?
                    <CartCol
                        uId={uId}
                        cart={cart}
                        getUser={getUser}
                    />
                    :
                    <>
                    </>
                }
            </div>  
            {/* <ItemModal 
                open={isOpen} 
                onClose={() => closeModal()}
                item={itemModal}
                uId={uId}
                getUser={getUser}
                userData={user}
                chefsData={chefData}
                getItems={getItem}
            />  */}
        </>
    )
}
    
