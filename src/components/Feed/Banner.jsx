import React, {useState, useEffect, useRef} from 'react'
import cookGIF from "../../assets/chefbeard.gif";
import delivery from "../../assets/delivery.jpeg"; 
// import suppliesGIF from "../../assets/Supplies.gif";
// import cartGIF from "../../assets/cart.gif";
import Slider from "react-slick";
//ICONIFY
import { Icon } from '@iconify/react';


export default function Banner(props) {
    const uId = props.uId
    const chefsData = props.chefsData
    const itemData = props.itemData
    const matchChefUserArr = chefsData.filter(chef => chef.user === uId)
    const matchChefUser = matchChefUserArr && matchChefUserArr[0] 
    const matchChefUserId = matchChefUser && matchChefUser.user
    const itemArr = itemData.filter(item => item.chef = matchChefUserId)
    const totalItems = itemArr.length
    const [showArrows, setShowArrows] = useState(false)

    const openArrows = () => {
        setShowArrows(true)
    }
    const closeArrows = () => {
        setShowArrows(false)
    }

    const customSlider = useRef()
    const settings = {
        arrows:false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: true
    }

   
    const prev = () => {
        customSlider.current.slickPrev();
    }

    const next = () => {
        customSlider.current.slickNext();
    }

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
        <>
        <div 
            className=''
            onMouseEnter={openArrows}
            onMouseLeave={closeArrows}    
        >
            {
                showArrows ?
                <>
                <Icon
                    icon='ep:arrow-left-bold'
                    style={{
                        fontSize:'2rem',
                        color:'grey',
                        position:'absolute',
                        zIndex:'1',
                        marginLeft:'.5rem',
                        marginTop:'9rem',  
                    }}
                    onClick={prev}
                />
                <Icon
                    onClick={next}
                    icon='ep:arrow-right-bold'
                    style={
                        props.cartColOpen ? 
                        {
                            position:'absolute',
                            marginLeft:'96.6rem',
                            marginTop:'9rem',
                            color:'grey',
                            fontSize:'2rem',
                            zIndex:'1',
                        }
                        :
                        {
                            fontSize:'2rem',
                            color:'grey',
                            position:'absolute',
                            zIndex:'1',  
                            marginLeft:'116.5rem',
                            marginTop:'9rem',
                        } 
                    }
                /> 
                </>
                :    
                <></>
            }
            <Slider {...settings} ref={customSlider}>
            <div className='col px-5'>
            {
                (matchChefUserId === uId) ?
                <a 
                    className='text-decoration-none text-reset'  
                    href={`/${uId}/admin/${matchChefUser._id}`} 
                >
                    <div className='p-2'>
                        <div 
                            className='d-flex banner justify-content-between p-3'
                            style={{
                                background: "#ffffff",
                                borderRadius:'4px',
                                color:'black',
                            }}
                        >
                            <div className='col-lg-6 p-5'>
                                <h4 
                                    className='display-1 pt-4 px-1'
                                    style={{
                                        fontSize:'2.8rem',
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
                                        height:'21rem',
                                    }}
                                />
                            </div>
                            <div className='col-lg-2'>
                            </div>
                        </div> 
                    </div>   
                </a> 
                :
                <a 
                    href={`/${uId}/newChef`} 
                    className='text-decoration-none text-reset' 
                >
                    <div className='p-2'>
                        <div 
                            className='banner d-flex p-3'
                            style={{
                                background: "#ffffff",
                                borderRadius:'4px',
                                color:'black',
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
                                    style={{
                                        height:'21rem',
                                    }}
                                />
                            </div>
                        </div>   
                    </div>
                </a> 
                }
            </div>

            <div className='col px-5'>   
                <div className='p-2'>
                    <div  
                        className="banner d-flex p-3"   
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
                </div>  
            </div> 
            </Slider>
        </div>
        </>
    )
}
