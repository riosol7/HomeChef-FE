import React from 'react'
import { Icon } from '@iconify/react';

export default function Allitems(props) {
    const chefData = props.chefData

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center pb-2'>
                    <Icon 
                        icon='whh:restaurantmenu' 
                        style={{
                            fontSize:"2rem", 
                            marginBottom:'6px'
                        }}
                    />
                    <h5 
                        className='display-1 px-2'
                        style={{
                            fontSize:'2rem'
                        }}    
                    >All items</h5>
                    {/* <h2 className='px-2'>All items</h2> */}
                </div>
                <div
                className='d-flex align-items-center justify-content-center'
                style={{
                    background:'#f4f6f8',
                    borderRadius:'12px',
                    width:'4rem',
                    height:'4rem',
                }}
            >
                <Icon
                    icon='bi:arrow-right'
                    style={{
                        fontSize:'2rem',

                    }}
                />
            </div>
            </div>
            <div className='row'>
                {
                    chefData.items && chefData.items.map((item, idx) => 
                        <div 
                            key={idx} 
                            className='border border-dark col-lg-4 p-5'
                        >
                            <div>
                                <img
                                    src={item.image}
                                    alt='item_Img'
                                />
                                <Icon 
                                    icon="akar-icons:circle-plus-fill" 
                                    style={{fontSize: "2.5rem"}}
                                    // onClick={() => viewItemModalClick(result)}    
                                />
                            </div>
                            <div className=''>  
                                 
                                    <h5 
                                        className='display-6'
                                        style={{
                                            fontSize:'2rem'
                                        }}    
                                    >{item.title}</h5>
                                    <p className='text text-muted'>{item.description}</p>
                                    <h4>${item.price}</h4>
                           
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
