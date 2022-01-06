import React from 'react';
import CartItem from "../../components/ItemDetails/CartItem";
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';

export default function CartCol(props){
    const uId = props.uId
    const cart = props.cart
    console.log("userData",props.userData)

    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }


    const totalAmount = cart && cart.map(item => item.total)
    const subTotal = cart && totalAmount.reduce((a, b) => Number(a) + Number(b), 0)
    return(
        <>
            <div 
                className='col-lg-2 container'
                style={{
                    background:'white',
                    borderLeft:'solid .8rem #f6f6f6'
                }}
            >
                <div 
                    style={{
                        position:'sticky', 
                        top:'0',
                    }}
                >
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
                                paddingTop:'12px',
                                paddingBottom:'12px',
                            }}
                        />
                    </Link>
                    </div>
                    <div 
                        className='pt-3 pb-3'
                    >
                    {
                        cart.length >= 1 ?
                        props.user.cart && props.user.cart.map((item, index) => (
                            <CartItem
                                key={index}
                                cartItem={item}
                                id={item._id} 
                                qty={item.qty} 
                                getUser={props.getUser}  
                                // getCart={getCart} 
                            />
                        ))
                        :
                        <div className='d-flex justify-content-center pt-5'>
                            <div>
                                <Icon
                                    icon='fontisto:shopping-bag-1'
                                    className=''
                                    style={{
                                        fontSize:'7rem'
                                    }}
                                />
                                <h5>Empty Bag</h5>
                            </div>
                        </div>
                    }
                    </div>
                </div> 
            </div>
        </>
    )
}