import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

import UpdateOrder from "../components/Chef/UpdateOrder"

//COMPONENTS
import SideNavbar from '../components/SideNavbar';

//ICONS
import { Icon } from '@iconify/react';
import {IoArrowBackCircleOutline} from 'react-icons/io5';


export default function Chef (props) {
    const {uId} = useParams()

    //FETCH - CHEF data
    const [chefData, setData] = useState({})

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
    const cId = chefData._id
    const cStreet = chefData.address && chefData.address.street
    const cCity = chefData.address && chefData.address.city
    const cState = chefData.address && chefData.address.state
    const cZip = chefData.address && chefData.address.zip

    const initialState = {
        street:cStreet,
        city:cCity,
        state:cState,
        zip:cZip,
        availability:chefData.availability,
        bio:chefData.bio,
        image:chefData.image,
        name:chefData.name,
        phone:chefData.phone
    }

    const [input, setInput] = useState(initialState)

    const updateChef = async (e) => {
        try {
            const config = {
                method: "PUT",
                body:JSON.stringify(e),
                headers:{
                    "Content-Type":"application/json",
                    // "Authorization": `bearer ${getUserToken()}`,
                },
            };
            const updatedChef = await fetch(`http://localhost:9999/${uId}/chef/${cId}`, config);
            const parsedUpdatedChef = await updatedChef.json()
            console.log("after update:", parsedUpdatedChef)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    
    const [showBio, setShowBio] = useState(false)
    const bioOnClick = () => setShowBio(!showBio)
    const handleBioSubmit = (e) => {
        e.preventDefault()
        updateChef(input)
        setShowBio(!showBio)
    }

    const [showTitle, setShowTitle] = useState(false)
    const titleOnClick = () => setShowTitle(!showTitle)
    const handleTitleSubmit = (e) => {
        e.preventDefault()
        updateChef(input)
        setShowTitle(!showTitle)
    }

    const [showPhone, setShowPhone] = useState(false)
    const phoneOnClick = () => setShowPhone(!showPhone)
    const handlePhoneSubmit = (e) => {
        e.preventDefault()
        updateChef(input)
        setShowPhone(!showPhone)
    }

    const [showHours, setShowHours] = useState(false)
    const availabilityOnClick = () => setShowHours(!showHours)
    const handleHoursSubmit = (e) => {
        e.preventDefault()
        updateChef(input)
        setShowHours(!showHours)
    }

    const [showAddress, setShowAddress] = useState(false)
    const addressOnClick = () => setShowAddress(!showAddress)
    const handleAddressSubmit = (e) => {
        e.preventDefault()
        updateChef(input)
        setShowAddress(!showAddress)
    }

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
                                    <div className='row pb-3 pt-2'>
                                        <div className='container pt-3'>
                                            <h5 className='border-top pt-3'>Bio:</h5>
                                            <div className='row'>
                                                <input
                                                    type='button'
                                                    value='edit'
                                                    onClick={bioOnClick}
                                                />
                                                { 
                                                    showBio ?
                                                    <form onSubmit={handleBioSubmit}>
                                                        <textarea 
                                                            name='bio' 
                                                            onChange={handleChange}
                                                            value={input.bio}
                                                            placeholder={chefData.bio}
                                                        >
                                                        </textarea>
                                                        <input type='submit' value='save'></input>
                                                    </form>
                                                    :
                                                    <p>{chefData.bio}</p>
                                                    
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-9 container'>
                                    <input
                                        type='button'
                                        value='edit'
                                        onClick={titleOnClick}
                                    />
                                    {
                                        showTitle ?
                                        <form className='border-bottom pb-2' onSubmit={handleTitleSubmit}>
                                            <input 
                                                name='name' 
                                                onChange={handleChange}
                                                value={input.name}
                                                placeholder={chefData.name}
                                            >
                                            </input>
                                            <input type='submit' value='save'></input>
                                        </form>
                                        :
                                        <h4 className='border-bottom pb-2'>{chefData.name}</h4>
                                    }
                                    <div className='row pt-2 pb-2'>
                                        <div className='col-md-4'>
                                            <h6>Hours:</h6>
                                            <input
                                                type='button'
                                                value='edit'
                                                onClick={availabilityOnClick}
                                            />
                                            {
                                                showHours ?
                                                <form onSubmit={handleHoursSubmit}>
                                                    <input 
                                                        name='availability' 
                                                        onChange={handleChange}
                                                        value={input.availability}
                                                        placeholder={chefData.availability}
                                                    >
                                                    </input>
                                                    <input type='submit' value='save'></input>
                                                </form>
                                                :
                                                <p>{chefData.availability}</p>                  
                                            }
                                        </div>
                                        <div className='col-md-4 d-flex align-item-center justify-content-center'>
                                            <input
                                                type='button'
                                                value='edit'
                                                onClick={phoneOnClick}
                                            />
                                            <h6>Contact:</h6>
                                            {
                                                showPhone ? 
                                                <form onSubmit={handlePhoneSubmit}>
                                                    <input 
                                                        name='phone' 
                                                        onChange={handleChange}
                                                        value={input.phone}
                                                        placeholder={chefData.phone}
                                                    >
                                                    </input>
                                                    <input type='submit' value='save'></input>
                                                </form>
                                                :
                                                <p className='mx-1'>{chefData.phone}</p>
                                            }
                                        </div>
                                        <div className='col-md-4 d-flex align-item-center justify-content-center'>
                                            <h6>Rating:</h6>
                                            <p className='mx-1'>{chefData.rating}</p>
                                        </div>
                                    </div>
                                    <div className='row pt-2 pb-2'>
                                        <h6>Location:</h6>
                                        <input
                                            type='button'
                                            value='edit'
                                            onClick={addressOnClick}
                                        />
                                        {
                                            showAddress ?
                                            <form onSubmit={handleAddressSubmit}>
                                                <input 
                                                    name='street' 
                                                    onChange={handleChange}
                                                    value={input.street}
                                                    placeholder={cStreet}
                                                >
                                                </input>
                                                <input 
                                                    name='city' 
                                                    onChange={handleChange}
                                                    value={input.city}
                                                    placeholder={cCity}
                                                >
                                                </input>
                                                <input 
                                                    name='state' 
                                                    onChange={handleChange}
                                                    value={input.state}
                                                    placeholder={cState}
                                                />
                                                <input 
                                                    name='zip' 
                                                    onChange={handleChange}
                                                    value={input.zip}
                                                    placeholder={cZip}
                                                />
                                                <input type='submit' value='save'/>
                                            </form>
                                            :
                                            <p>
                                                {cStreet}
                                                <br/>
                                                {cCity}, {cState} {cZip}
                                            </p>
                                        }
                                    </div>
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
                                                <UpdateOrder oId={order._id} oStatus={order.status}/>
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