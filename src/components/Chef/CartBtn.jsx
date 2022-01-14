import React from 'react'
import { Icon } from '@iconify/react';

export default function CartBtn(props) {
    const cart = props.user.cart && props.user.cart.length
    const cartNum = cart || props.cartNum 
    const cartColOpen = props.cartColOpen

    return (
        <div className='d-flex justify-content-end pb-5'>
            {
                cartNum !== undefined ?
                <>
                    <button
                        id='cartBtn' 
                        onClick={() => props.setCartColOpen(!cartColOpen)}
                    >
                        <Icon icon='entypo:shopping-basket' id='cart'/>
                        {
                            cartNum === 0 ?
                            <>
                            </>
                            :
                            <p style={
                                cartColOpen ?
                                {
                                    backgroundColor: '#f98030',
                                    borderRadius: '50%',
                                    color:'#eeeeee',
                                    position: 'absolute',
                                    width: '1.5rem',
                                    top: '10px',
                                    right: '21.6rem',
                               
                                }
                                :
                                {
                                    backgroundColor: '#f98030',
                                    borderRadius: '50%',
                                    color:'#eeeeee',
                                    position: 'absolute',
                                    width: '1.5rem',
                                    top: '10px',
                                    right: '1.6rem',
                                }
                            }>{cartNum}</p>
                        }
                    </button>

                </>
                :
                <>
                    {/* <button
                        id='cartBtn' 
                        onClick={() => props.setCartColOpen(!cartColOpen)}
                    >
                        <Icon icon='entypo:shopping-basket' id='cart'/>
                        {
                            cartNum === 0 ?
                            <>
                            </>
                            :
                            <p style={
                                {
                                    backgroundColor: '#f98030',
                                    borderRadius: '50%',
                                    color:'#eeeeee',
                                    position: 'absolute',
                                    width: '1.5rem',
                                    top: '10px',
                                    right: '2.5rem',
                                }
                            }>{cartNum}</p>
                        }
                    </button> */}
                </>
            }
        </div>
    )
}
