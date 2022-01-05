import React from 'react'
import { Icon } from '@iconify/react';

export default function CartBtn(props) {
    const cartNum = props.cartNum
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
                                    right: '22.5rem',
                               
                                }
                                :
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
                    </button>

                </>
                :
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
                    </button>
                </>
            }
        </div>
    )
}