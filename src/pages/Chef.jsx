import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// import {getUserToken} from '../utils/authToken'

import Orders from "../components/Chef/Orders"
import Item from "../components/Chef/Item"

//COMPONENTS
import ChefNavbar from '../components/Chef/ChefNavbar';
import NewItem from "../components/Chef/NewItem"

//ICONS
// import { Icon } from '@iconify/react';
import {IoArrowBackCircleOutline} from 'react-icons/io5';


export default function Chef (props) {
    const {uId} = useParams()

    //FETCH - CHEF data
    const [chefData, setData] = useState({})

    const getChef = async () => {
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
    const cId = chefData && chefData._id
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
    const [updatedChef, setUpdatedChef] = useState({})

    const updatedStreet = updatedChef.address && updatedChef.address.street
    const updatedCity = updatedChef.address && updatedChef.address.city
    const updatedState = updatedChef.address && updatedChef.address.state
    const updatedZip = updatedChef.address && updatedChef.address.zip

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
            setUpdatedChef(parsedUpdatedChef)
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
            <ChefNavbar uId={uId} />
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
                                                    <p>{updatedChef.bio || chefData.bio}</p>
                                                    
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
                                        <h4 className='border-bottom pb-2'>{updatedChef.name || chefData.name}</h4>
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
                                                <p>{updatedChef.availability || chefData.availability}</p>                  
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
                                                        type='number' 
                                                        onChange={handleChange}
                                                        value={input.phone}
                                                        placeholder={chefData.phone}
                                                    >
                                                    </input>
                                                    <input type='submit' value='save'></input>
                                                </form>
                                                :
                                                <p className='mx-1'>{updatedChef.phone || chefData.phone}</p>
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
                                                {updatedStreet || cStreet}
                                                <br/>
                                                {updatedCity || cCity}, {updatedState || cState} {updatedZip || cZip}
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
                                            <Orders 
                                                order={order} 
                                                oStatus={order.status} 
                                                oId={order._id}
                                            />
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
                            <NewItem 
                                uId={uId}
                                cId={chefData._id}
                                history={props.history}
                                getChef={getChef}
                            />
                        </div>
                        <div className='row pt-2 item-list p-4'>
                            {chefData.items && chefData.items.map(item => 
                                <>  
                                    <Item 
                                        uId={uId}
                                        item={item}
                                        cId={chefData._id}
                                        history={props.history}
                                        getChef={getChef}
                                    />
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