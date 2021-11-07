import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
//COMPONENTS
import SideNavbar from '../components/SideNavbar';

//ICONS
import { Icon } from '@iconify/react';
import {IoArrowBackCircleOutline} from 'react-icons/io5';


export default function Chef (props) {
    const {uId} = useParams()

    //FETCH - CHEF data
    const [chefData, setData] = useState([])

    const getChef = async (data) => {
        try{
            const chef = await fetch(`http://localhost:9999/${uId}/chef`)
            const parsedChef = await chef.json()
            setData(parsedChef)
        } catch (err) {
            console.log(err)
        };
    };
    console.log("chefData:", chefData)

    //FETCH Orders
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

    console.log("chefOrderData:", chefOrderData)

    //UPDATE Chef
    // const initialState = {
    //     address:{
    //         street:"",
    //         city:"",
    //         state:"",
    //         zip:""
    //     },
    //     availability:chefData.availability,
    //     bio:chefData.bio,
    //     image:chefData.image,
    //     name:chefData.name,
    //     phone:chefData.phone
    // }

    // const [input, setInput] = useState(initialState)



    useEffect(()=> {
        getChef();
        console.log("chefData(ufx):",chefData)
        getChefOrders();
        console.log("chefOrderData(ufx):",chefOrderData)
        // eslint-disable-next-line       
    }, [])
    
    return (
        <>
            <SideNavbar uId={uId} />
            <div className='chef_page container-fluid'>
                <a 
                    href={`/${uId}/feed`}
                    id='goBack'
                    className='text-decoration-none'
                    >
                    <IoArrowBackCircleOutline 
                        id='goBack' 
                        className='text-decoration-none'>
                    </IoArrowBackCircleOutline>
                </a>
                <div className='row pb-5'>
                    {/* CHEF INFO */}
                    <div className='col-lg-8'>
                        <div className='container'>
                            <div className='row pt-2 pb-4 pb-5'>
                                <div className='col-md-3 container'>
                                    <div className='container d-flex align-item-center justify-content-center'>
                                        <img
                                            src={chefData.image}
                                            alt='profile'
                                            className='profile-circle border circle d-flex align-item-center justify-content-center'
                                        />
                                    </div>
                                </div>
                                <div className='col-md-9 container'>
                                    <h4 className='border-bottom pb-2'>{chefData.name}</h4>
                                    <div className='row pt-2 pb-2'>
                                        <div className='col-md-4'>
                                            <h6>Hours:</h6>
                                            <p>{chefData.availability}</p>
                                        </div>
                                        <div className='col-md-4 d-flex align-item-center justify-content-center'>
                                            <h6>Contact:</h6>
                                            <p className='mx-1'>{chefData.phone}</p>
                                        </div>
                                        <div className='col-md-4 d-flex align-item-center justify-content-center'>
                                            <h6>Rating:</h6>
                                            <p className='mx-1'>{chefData.rating}</p>
                                        </div>
                                    </div>
                                    <div className='row pt-2 pb-2'>
                                        <h6>Location:</h6>
                                        {/* <p>{chefData.address.street}</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className='row pb-3 pt-2'>
                                <div className='col-sm-1'>
                                </div>
                                <div className='col-md-10 border-bottom pb-5'>
                                    <h5>Bio:</h5>
                                    <div className='row'>
                                        <p>{chefData.bio}</p>
                                    </div>
                                </div>
                                <div className='col-sm-1'>
                                </div>
                            </div>
                            {/* ORDERS */}
                            <div className='row pt-3'>
                                <h4>Orders</h4>
                                    {
                                        chefOrderData && chefOrderData.map(order => (
                                            <>
                                                <div key={order._id} className='col-lg-12 border border-primary p-3 my-3'>
                                                    <p>Order ID:{order._id}</p>
                                                    <p 
                                                        className='d-flex justify-content-end'
                                                    >
                                                        {order.date}
                                                    </p>
                                                    <h4>{order.user.firstName} {order.user.lastName}</h4>
                                                    <p>{order.user.phone}</p>
                                                    <div className='row pt-4 pb-4 d-flex justify-content-center align-items-center'>
                                                        {order.status}
                                                    </div>
                                                    {/* Order Item(s) */}
                                                    <div className='row pt-4 pb-4'>
                                                        {
                                                            order.items.map(item => (
                                                                <>
                                                                    <div key={item._id} className='col-md-3'>
                                                                        <p>{item.item.title}</p>
                                                                    </div>
                                                                    <div className='col-md-3'>
                                                                        <p>${item.item.price}</p>
                                                                    </div>
                                                                    <div className='col-md-3'>
                                                                        <p>Qty:{item.qty}</p>
                                                                    </div>
                                                                    <div className='col-md-3'>
                                                                        <img
                                                                            src={item.item.image}
                                                                            alt='chefOrder-img'
                                                                            className='post'
                                                                        />
                                                                    </div>
                                                                    <div className='row pt-2 pb-2'>
                                                                        {order.note}
                                                                    </div>
                                                                </>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-md-8'>

                                                        </div>
                                                        <div className='col-md-4'>
                                                            <div className='row'>
                                                                <div className='col-sm-8'>
                                                                    <p className='d-flex justify-content-end'>Tip :</p>
                                                                    <p className='d-flex justify-content-end'>Sub total :</p>
                                                                    <p className='d-flex justify-content-end'>Total Amount :</p>
                                                                </div>
                                                                <div className='col-sm-4'>
                                                                    <p>{order.tip}</p>
                                                                    <p>{order.subTotal}</p>
                                                                    <p>{order.grandTotal}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row pt-4 pb-2'>
                                                        <div className='col-md-6'>

                                                        </div>
                                                        <div className='col-md-3'>
                                                            <button
                                                                
                                                            >
                                                            decline
                                                            </button>
                                                        </div>
                                                        <div className='col-md-3'>
                                                            <button
                                                            
                                                            >
                                                                accept
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                               
                            </div>
                            <br/>
                        </div> 
                    </div>
                    {/* ITEMS */}
                    <div className='col-lg-4 pt-5 pb-5'>
                        <div className='row'>
                            <Link 
                                to={{
                                    pathname: `/${uId}/chef/item/`,
                                    state: {
                                        cId:chefData._id
                                    }
                                }} 
                                >
                                Add new Item
                            </Link>
                        </div>
                        <div className='row pt-2 item-list p-4'>
                            {chefData.items && chefData.items.map(item => 
                                <>  
                                     <div key={item._id} className='col-md-12 pt-2 pb-2 my-2 item'>
                                         <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className='row'>
                                                    <h5 className='pb-2'>{item.title}</h5>
                                                </div>
                                                <div className='row'>
                                                    <p className='text'>{item.description}</p>  
                                                </div>
                                                <div className='row'>
                                                    <p className='text'>${item.price}</p>  
                                                </div>
                                                <div className='row'>
                                                    <div className='col-sm-6'>
                                                        <p className='text'>Likes: {item.likes}</p>  
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <Link to={{
                                                            pathname: `/${uId}/chef/${item._id}/edit`,
                                                            state: {
                                                                item:item,
                                                                cId:chefData._id
                                                            }
                                                        }} 
                                                        className='text-decoration-none'>
                                                            <Icon 
                                                                icon="clarity:note-edit-line" 
                                                                className='icon-list' 
                                                                id='edit'/>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <img 
                                                    src={item.image} 
                                                    alt='img'
                                                    className='chef-img'
                                                />
                                            </div>
                                         </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-1'></div>
                </div>
            </div>
        </>
    )
}