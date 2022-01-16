import React, {useReducer, useState, useEffect} from 'react'
import cookGIF from "../../assets/chefbeard.gif";
import delivery from "../../assets/delivery.jpeg"; 
import suppliesGIF from "../../assets/Supplies.gif";
// import cartGIF from "../../assets/cart.gif";
//ICONIFY
import { Icon } from '@iconify/react';

const ACTIONS = {
    DELIVERY:'Delivery',
    ADMIN:'Admin',
    SUPPLY:"Supply"
}

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.DELIVERY:
            return { select: "Delivery" }
        case ACTIONS.ADMIN:
            return { select: "Admin" }
        case ACTIONS.SUPPLY:
            return { select: "Supply" }
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
    // const selectSupply = () => {
    //     dispatch({ type: ACTIONS.SUPPLY })
    // }

    const [chefOrderData, setChefOrderData] = useState([])

    const getChefOrders = async () => {
        try{
            const chefOrders = await fetch(
                `http://localhost:9999/${uId}/chef/order`
            );
            const parsedChefOrders = await chefOrders.json();
            setChefOrderData(parsedChefOrders);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        getChefOrders();
        // eslint-disable-next-line       
    }, [])

    const orderTotal = chefOrderData.length

    return (
        <div className='d-flex align-items-center'>
            {/* <div className='col-md-2 p-4'>
                {
                    select.select === "Admin" ?
                        <img 
                            src={suppliesGIF}
                            alt='supplies'
                            className='post'
                            id='supply'
                            onClick={selectSupply}
                        />
                    :
                    select.select === "Delivery" ?
                        <img 
                            src={cookGIF}
                            alt='cook'
                            className='post'
                            id='cook' 
                            onClick={selectAdmin} 
                        /> 
                    :
                    select.select === "Supply" ?
                        <img 
                            src={delivery}
                            alt='delivery'
                            className='post'
                            id='deliveryGIF'
                            onClick={selectDelivery} 
                        />
                    :
                    <>
                    </>
                }
            </div>  */}
            <Icon
                icon='ep:arrow-left-bold'
                style={{
                    fontSize:'2rem',
                    color:'grey'
                }}
                onClick={selectDelivery}
            />
            <div className='col' style={{paddingInline:'2rem'}}>
                {
                    select.select === "Admin" ?
                        (matchChefUserId === uId) ?
                        <a 
                            className='text-decoration-none text-reset'  
                            href={`/${uId}/admin/${matchChefUser._id}`} 
                        >
                            <div 
                                className='banner d-flex justify-content-between p-2'
                                style={{
                                    background: "#ffffff",
                                    borderRadius:'4px',
                                    color:'black',
                                }}
                            >
                                <div className='col-lg-5 p-5'>
                                    <h4 
                                        className='display-1 pt-4 px-1'
                                        style={{
                                            fontSize:'3rem',
                                            color:'#f06292',
                                        }}
                                    >
                                        Welcome back {matchChefUser.name}
                                    </h4>
                                    <div className='d-flex px-1 pb-1'>
                                        <Icon 
                                           icon='icon-park-outline:transaction-order'
                                            style={{
                                                fontSize:'2rem',

                                            }}
                                        />
                                        <p 
                                            className='m-0 mx-2'  
                                            style={{
                                                fontSize:'1.3rem',

                                            }}
                                        >{orderTotal} orders</p>
                                    </div>
                                    <div className='d-flex px-1'>
                                        <Icon 
                                            icon="ion:fast-food-outline" 
                                            style={{
                                                fontSize:'2rem',

                                            }}
                                        />
                                        <p 
                                            className='m-0 mx-2'  
                                            style={{
                                                fontSize:'1.3rem',

                                            }}
                                        >{totalItems} items</p>
                                    </div>
                                </div>
                                <div>
                                    <img 
                                        src={cookGIF}
                                        alt='cook'
                                        className='post'
                                        id='cook'
                                        style={{
                                            height:'21rem'
                                        }}
                                    />
                                </div>
                                <div className='col-lg-2'>
                                    <p>
                                    </p>
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
                                <div className='col-lg-6 p-2'>
                                    <h4 
                                        className='display-1 pt-5 px-1'
                                        style={{
                                            fontSize:'2rem',
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
                                    fontSize:'2rem',
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
                    select.select === "Supply" ?
                    // <a 
                    //     href={`/${uId}/profile`}
                    //     alt='profile'
                    // >
                        <div 
                            id='supply' 
                            className='d-flex p-2'
                            style={{
                                background:'#cee5ff',
                                borderRadius:'4px',
                            }}
                        >
                            <div className='col-lg-6'>

                            </div>
                            <div>
                                <img 
                                    src={suppliesGIF}
                                    alt='supplies'
                                    className='post'
                                    id='supply'
                                    // style={{
                                    //     width:'15rem'
                                    // }}
                                />
                            </div>
                        </div>
                    // </a>
                    :
                    <>
                    </>
                }
            </div> 
            <Icon
                icon='ep:arrow-right-bold'
                style={{
                    fontSize:'2rem',
                    color:'grey'
                }}
                onClick={selectAdmin}
            />


            {/* <div className='col-md-3 p-4'>
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
                    <img 
                        src={suppliesGIF}
                        alt='supplies'
                        className='post'
                        id='supply'
                    />
                    :
                    select.select === 'Supply' ?
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
            </div>  */}
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
