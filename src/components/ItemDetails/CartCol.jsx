import React from 'react'
import CartItem from "../../components/ItemDetails/CartItem";
import { Link } from 'react-router-dom'

export default function CartCol(props){
    const uId = props.uId
    const cart = props.cart


    const totalAmount = cart && cart.map(item => item.total)
    const subTotal = cart && totalAmount.reduce((a, b) => Number(a) + Number(b), 0)

    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }


    return(
        <>
            <div 
                className='col-lg-2'
                style={{
                    background:'white',
                }}
            >
                <div style={{position:'sticky', top:'0'}}>
                    <div className='border-bottom pb-3 pt-3'>
                    <Link
                        to={`/${uId}/checkout`}
                    >
                        <input
                            type='button'
                            value={`Checkout $${cart && roundToHundredth(subTotal)}`}
                            style={{
                                width:'100%',
                                background:'black',
                                color:'white',
                                paddingTop:'6px',
                                paddingBottom:'6px',
                            }}
                        />
                    </Link>
                    </div>
                    <div className='pt-3 pb-3'>
                        {
                            cart && cart.map((item, index) => (
                                <CartItem
                                    key={index}
                                    cartItem={item}
                                    id={item._id} 
                                    qty={item.qty} 
                                    getUser={props.getUser}   
                                />
                            ))
                        }
                    </div>
                </div> 
            </div>
        </>
    )
}