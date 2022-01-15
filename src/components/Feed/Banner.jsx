import React, {useReducer} from 'react'
import cookGIF from "../../assets/cook.gif";
import delivery from "../../assets/delivery.jpeg"; 
import profileGIF from "../../assets/profile.gif";
// import cartGIF from "../../assets/cart.gif";
//ICONIFY
import { Icon } from '@iconify/react';

const ACTIONS = {
    DELIVERY:'Delivery',
    ADMIN:'Admin',
    PROFILE:'Profile'
}

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.DELIVERY:
            return { select: "Delivery" }
        case ACTIONS.ADMIN:
            return { select: "Admin" }
        case ACTIONS.PROFILE:
            return { select: "Profile" }
        default:
            return state
    }
}

export default function Banner(props) {
    const uId = props.uId
    const chefsData = props.chefsData
    const itemData = props.itemData
    const matchChefUserArr = chefsData.filter(chef => chef.user === uId)
    const matchChefUser = matchChefUserArr && matchChefUserArr[0] 
    const matchChefUserId = matchChefUser && matchChefUser.user
    const itemArr = itemData.filter(item => item.chef = matchChefUserId)
    const totalItems = itemArr.length
    // const totalItems = matchChefUser.items && matchChefUser.items.length

    const [select, dispatch] = useReducer(reducer, {
        select:'Admin'
    })

    const selectAdmin = () => {
        dispatch({ type: ACTIONS.ADMIN })
    }

    const selectDelivery = () => {
        dispatch({ type: ACTIONS.DELIVERY })
    }

    return (
        <div className='row'>
            <div className='col-md-3 p-4'>
                {
                    select.select === "Admin" ?
                    <a 
                        href={`/${uId}/profile`}
                        alt='profile'
                    >
                        <img 
                            src={profileGIF}
                            alt='profile'
                            className='post'
                            id='profile'
                        />
                    </a>
                    :
                    select.select === "Delivery" ?
                        // (matchChefUserId === uId) ?
                        // <a 
                        //     href={`/${uId}/admin/${matchChefUser._id}`}
                        //     onClick={selectAdmin}   
                        // >
                            <img 
                                src={cookGIF}
                                alt='cook'
                                className='post'
                                id='cook' 
                                onClick={selectAdmin} 
                            />
                        // </a> 
                        // :
                        // <a 
                        //     href={`/${uId}/newChef`}   
                        // >
                        //     <img 
                        //         src={cookGIF}
                        //         alt='cook'
                        //         className='post'
                        //         id='cook' 
                        //     />
                        // </a>  
                    :
                    select.select === "Profile" ?
                        <img 
                            src={delivery}
                            alt='delivery'
                            className='post'
                            id='deliveryGIF'
                        />
                    :
                    <>
                    </>
                }
            </div> 
            <div className='col-md-6 pt-2'>
                {
                    select.select === "Admin" ?
                        (matchChefUserId === uId) ?
                        <a 
                            className='text-decoration-none text-reset'  
                            href={`/${uId}/admin/${matchChefUser._id}`} 
                        >
                            <div 
                                className='banner d-flex p-2'
                                style={{
                                    background:'linear-gradient(287deg, rgba(76,40,79,1) 0%, rgba(245,55,131,1) 10%, rgba(245,55,131,1) 90%, rgba(244,66,137,1) 100%)'||'#f53783',
                                    borderRadius:'4px',
                                    color:'white',
                                }}
                            >
                                <div className='col-lg-6 p-2 pt-3'>
                                    <h4 
                                        className='display-1 pt-5 px-1'
                                        style={{
                                            fontSize:'2.4rem',
                                            // color:'#f53783',
                                        }}
                                    >
                                        Welcome back {matchChefUser.name}
                                    </h4>
                                    <div className='d-flex px-1 pb-1'>
                                        <Icon 
                                           icon='icon-park-outline:transaction-order'
                                            style={{
                                                fontSize:'1.5rem',

                                            }}
                                        />
                                        <p className='m-0 mx-2'>orders</p>
                                    </div>
                                    <div className='d-flex px-1'>
                                        <Icon 
                                            icon="ion:fast-food-outline" 
                                            style={{
                                                fontSize:'1.5rem',

                                            }}
                                        />
                                        <p className='m-0 mx-2'>{totalItems} items</p>
                                    </div>
                                </div>
                                <div>
                                    <img 
                                        src={cookGIF}
                                        alt='cook'
                                        className='post'
                                        id='cook'
                                    />
                                </div>
                            </div>    
                        </a> 
                        :
                        <a 
                            href={`/${uId}/newChef`} 
                            className='text-decoration-none text-reset' 
                        >
                            <div 
                                className='banner d-flex p-2'
                                style={{
                                    background:'linear-gradient(287deg, rgba(76,40,79,1) 0%, rgba(245,55,131,1) 10%, rgba(245,55,131,1) 90%, rgba(244,66,137,1) 100%)'||'#f53783',
                                    borderRadius:'4px',
                                    color:'white',
                                }}
                            >
                                <div className='col-lg-6 p-2 pt-3'>
                                    <h4 
                                        className='display-1 pt-5 px-1'
                                        style={{
                                            fontSize:'2.4rem',
                                            // color:'#f53783',
                                        }}
                                    >
                                        Welcome back
                                    </h4>
                                    <div className='d-flex px-1 pb-1'>
                                        <Icon 
                                           icon='icon-park-outline:transaction-order'
                                            style={{
                                                fontSize:'1.5rem',

                                            }}
                                        />
                                        <p className='m-0 mx-2'>orders</p>
                                    </div>
                                    <div className='d-flex px-1'>
                                        <Icon 
                                            icon="ion:fast-food-outline" 
                                            style={{
                                                fontSize:'1.5rem',

                                            }}
                                        />
                                        <p className='m-0 mx-2'> items</p>
                                    </div>
                                </div>
                                <div>
                                    <img 
                                        src={cookGIF}
                                        alt='cook'
                                        className='post'
                                        id='cook'
                                    />
                                </div>
                            </div>    
                        </a> 
                    :
                    select.select === "Delivery" ?
                    <div
                        className='banner d-flex p-2'
                        style={{
                            background:'#feffcd',
                            borderRadius:'4px',
                        }}
                    >
                        <div className='col-lg-6 p-2 pt-5'>
                            <h4 
                                className='display-1 pt-5 px-1'
                                style={{
                                    fontSize:'2.4rem',
                                    // color:'#f53783',
                                }}
                            >
                                Start Delivering Today
                            </h4>
                            <div className='d-flex px-1'>
                                <Icon 
                                    icon="ic:baseline-directions-bike" 
                                    style={{
                                        fontSize:'1.2rem',

                                    }}
                                />
                                <p className='text-muted m-0 mx-2'>Feature Coming Soon</p>
                            </div>
                        </div>
                        <div
                            style={{
                                width:'28rem',
                            
                            }}
                            >
                            <img 
                                src={delivery}
                                alt='delivery'
                                className='post'
                                id='deliveryGIF'
                            />
                        </div>
                    </div>
                    :
                    select.select === "Profile" ?
                    <div 
                        id='profile' 
                        className='d-flex p-2'
                        style={{
                            background:'#f53783',
                            borderRadius:'4px',
                        }}
                    >
                        <a 
                        href={`/${uId}/profile`}
                        alt='profile'
                        >
                            <img 
                                src={profileGIF}
                                alt='profile'
                                className='post'
                                id='profile'
                            />
                        </a>
                    </div>
                    :
                    <>
                    </>
                }
            </div> 
            <div className='col-md-3 p-4'>
                {
                    select.select === 'Admin' ?
                    <img 
                        src={delivery}
                        alt='delivery'
                        className='post'
                        id='deliveryGIF'
                        onClick={selectDelivery} 
                    />
                    :
                    select.select === 'Delivery' ?
                    <a 
                        href={`/${uId}/profile`}
                        alt='profile'
                    >
                        <img 
                            src={profileGIF}
                            alt='profile'
                            className='post'
                            id='profile'
                        />
                    </a>
                    :
                    select.select === 'Profile' ?
                    <img 
                        src={cookGIF}
                        alt='cook'
                        className='post'
                        id='cook' 
                        onClick={selectAdmin} 
                    />
                    :
                    <>
                    </>
                }
            </div> 
            {/* <div className='col-md-3 p-2'>
                <a 
                    href={`/${uId}/checkout`}
                    alt='cart'
                >
                <img 
                    src={cartGIF}
                    alt='cart'
                    className='post'
                    id='cart'
                /></a>
            </div> */}
        </div>  
    )
}
