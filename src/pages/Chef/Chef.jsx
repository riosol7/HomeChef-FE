import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// import {getUserToken} from '../utils/authToken'

import states from "../../helpers/states"

//COMPONENTS
import ChefNavbar from '../../components/Chef/ChefNavbar';
import NewItem from "../../components/Chef/NewItem"
import Orders from "../../components/Chef/Orders"
import Item from "../../components/Chef/Item"

//ICONS
import { Icon } from '@iconify/react';
//BOOTSTRAP
import Spinner from 'react-bootstrap/Spinner';

export default function Chef (props) {
    const {uId} = useParams()
    const cId = props.match.params.id

    //FETCH - CHEF data
    const [chefData, setData] = useState({})
    const [isOrderLoading, setIsOrderLoading] = useState(true)
    const [isChefLoading, setIsChefLoading] = useState(true)


    const getChef = async () => {
        try{
            const chef = await fetch(`http://localhost:9999/${uId}/chef`)
            const parsedChef = await chef.json()
            setData(parsedChef)
            setIsChefLoading(false)
        } catch (err) {
            console.log(err)
        };
    };

    //FETCH Orders
    const [chefOrderData, setChefOrderData] = useState([])

    const getChefOrders = async () => {
        try{
            const chefOrders = await fetch(
                `http://localhost:9999/${uId}/chef/order`
            );
            const parsedChefOrders = await chefOrders.json();
            setChefOrderData(parsedChefOrders);
            setIsOrderLoading(false)
    
        } catch (err) {
            console.log(err);
        }
    }

    //Status
    let orderQty = chefOrderData && chefOrderData.length
    let orderPending = chefOrderData && chefOrderData.filter(order => order.status === "Pending")
    let orderPendingCount = orderPending && orderPending.length
    let orderAccepted = chefOrderData && chefOrderData.filter(order => order.status === "Accepted")
    let orderAcceptedCount = orderAccepted && orderAccepted.length
    let orderDeclined = chefOrderData && chefOrderData.filter(order => order.status === "Declined")
    let orderDeclinedCount = orderDeclined && orderDeclined.length
    let orderReady = chefOrderData && chefOrderData.filter(order => order.status === "Ready for Delivery")
    let orderReadyCount = orderReady && orderReady.length


    //UPDATE Chef
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
        // console.log("chefData(ufx):",chefData)
        getChefOrders();
        // console.log("chefOrderData(ufx):",chefOrderData)
        // eslint-disable-next-line       
    }, [])

    return (
        <>
            <ChefNavbar uId={uId} />
            <div className='chef_page container-fluid'>
                <div className='row pb-5 pt-2'>
                    {/* CHEF INFO */}
                    <div className='col-lg-8'>
                        <div className='container'>
                            <div className='row pt-2 pb-4'>
                                <div className='col-md-3 container'>
                                    <div className='container d-flex align-items-center justify-content-center'>
                                    {
                                            isChefLoading ? (
                                                <Spinner 
                                                    animation='border' 
                                                    className='d-flex justify-content-center' 
                                                    variant='info'
                                                /> 
                                        ):(
                                            <img
                                                src={chefData.image}
                                                alt='profile'
                                                className='profile-img'
                                            />
                                        )
                                    }
                                    </div>
                                    <div className='row pb-3 pt-2'>
                                        <div className='container pt-3'>
                                            <div className='d-flex align-items-center justify-content-between border-top'>
                                                <div className='d-flex align-items-center'>
                                                    <Icon icon='bi:person-lines-fill' style={{fontSize:'1.2rem'}}/>
                                                    <h5 className='pt-2 px-1'>Bio:</h5>
                                                </div>
                                                <Icon
                                                    className='mt-4'
                                                    icon='entypo:edit'                                           
                                                    value='edit'
                                                    onClick={bioOnClick}
                                                />
                                            </div>
                                            <div className='px-2'>
                                                { 
                                                    showBio ?
                                                    <>
                                                        <form onSubmit={handleBioSubmit}>
                                                            <textarea 
                                                                name='bio' 
                                                                onChange={handleChange}
                                                                value={input.bio}
                                                                placeholder={chefData.bio}
                                                                style={{
                                                                    width:'100%',   
                                                                }}
                                                            >
                                                            </textarea>
                                                            <div className='d-flex justify-content-end'>
                                                                <input type='submit' value='save'/>
                                                            </div>
                                                        </form>
                                                    </>
                                                    :
                                                    <p>{updatedChef.bio || chefData.bio}</p>
                                                    
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-9 container'>
                                    <div className='d-flex align-items-center'>
                                        {
                                            showTitle ?
                                            <form className='border-bottom pb-2' onSubmit={handleTitleSubmit}>
                                                <input 
                                                    name='name' 
                                                    onChange={handleChange}
                                                    value={input.name}
                                                    placeholder={chefData.name}
                                                />
                                                <input 
                                                    type='submit' 
                                                    value='save'
                                                    className='mx-1'
                                                />
                                            </form>
                                            :
                                            <h4 className='border-bottom pb-2'>{updatedChef.name || chefData.name}</h4>
                                        }
                                        <Icon
                                            className='mx-2 mb-5'
                                            icon='entypo:edit' 
                                            value='edit'
                                            onClick={titleOnClick}
                                        />
                                    </div>
                                    <div className='row pt-2 pb-2'>
                                        <div className='col-md-3'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div className='d-flex align-items-center'>
                                                    <Icon icon='entypo:hour-glass' style={{fontSize:'1.2rem'}}/>
                                                    <h6 className='pt-2 px-1'>Hours:</h6>
                                                </div>
                                                <Icon
                                                    icon='entypo:edit'
                                                    value='edit'
                                                    onClick={availabilityOnClick}
                                                />
                                            </div>
                                            <div className='px-2'>
                                            {
                                                showHours ?
                                                <>
                                                    <form onSubmit={handleHoursSubmit}>
                                                        <input 
                                                            name='availability' 
                                                            onChange={handleChange}
                                                            value={input.availability}
                                                            placeholder={chefData.availability}
                                                            style={{
                                                                width:'100%',   
                                                            }}
                                                        /> 
                                                        <div className='d-flex justify-content-end pt-1'>
                                                            <input type='submit' value='save'/>
                                                        </div>
                                                    </form>
                                                </>
                                                :
                                                <p>{updatedChef.availability || chefData.availability}</p>                  
                                            }
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div className='d-flex align-items-center'>
                                                    <Icon icon='heroicons-outline:phone' style={{fontSize:'1.2rem'}}/>
                                                    <h6 className='pt-2 px-1'>Contact:</h6>
                                                </div>
                                                <Icon
                                                    icon='entypo:edit'
                                                    value='edit'
                                                    onClick={phoneOnClick}
                                                />
                                            </div>
                                            <div className='px-2'>
                                            {
                                                showPhone ? 
                                                <>
                                                    <form onSubmit={handlePhoneSubmit}>
                                                        <input 
                                                            name='phone'
                                                            type='number' 
                                                            onChange={handleChange}
                                                            value={input.phone}
                                                            placeholder={chefData.phone}
                                                            style={{
                                                                width:'100%',   
                                                            }}
                                                        />
                                                        <div className='d-flex justify-content-end pt-1'>
                                                          <input type='submit' value='save'/>
                                                      </div>
                                                    </form>
                                                </>
                                                :
                                                <p className='mx-1'>{updatedChef.phone || chefData.phone}</p>
                                            }
                                            </div>
                                        </div>
                                        <div className='col-md-6 d-flex align-item-center'>
                                            <h6>Rating:</h6>
                                            <p className='mx-1'>{chefData.rating}</p>
                                        </div>
                                    </div>
                                    <div className='row pt-2 pb-2'>
                                        <div className='col-md-3'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div className='d-flex align-items-center'>
                                                    <Icon icon='akar-icons:location'/>
                                                    <h6 className='pt-2 px-1'>Location:</h6>
                                                </div>
                                                <Icon
                                                    icon='entypo:edit'
                                                    value='edit'
                                                    onClick={addressOnClick}
                                                />
                                            </div>
                                            <div className='px-2'>
                                            {
                                                showAddress ?
                                                <>
                                                <form onSubmit={handleAddressSubmit}>
                                                    <input 
                                                        name='street' 
                                                        onChange={handleChange}
                                                        value={input.street}
                                                        placeholder={cStreet}
                                                        style={{
                                                            width:'100%',   
                                                        }}
                                                    />
                                                    <input 
                                                        name='city' 
                                                        onChange={handleChange}
                                                        value={input.city}
                                                        placeholder={cCity}
                                                        style={{
                                                            width:'100%',   
                                                        }}
                                                    />
                                                    <div className='d-flex align-items-center pt-1'>
                                                        <select 
                                                            name='state' 
                                                            onChange={handleChange}
                                                            value={input.state}
                                                            placeholder={cState}
                                                            style={{
                                                                width:'35%', 
                                                                marginInline:'5px'  
                                                            }}
                                                        >
                                                        {
                                                            states && states.map(state =>
                                                                <option>{state}</option> 
                                                            )   
                                                        }
                                                        </select> 
                                                        <input 
                                                            name='zip' 
                                                            onChange={handleChange}
                                                            value={input.zip}
                                                            placeholder={cZip}
                                                            style={{
                                                                width:'100%',   
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='d-flex justify-content-end pt-1'>
                                                        <input type='submit' value='save'/>
                                                    </div>
                                                </form>
                                                </>
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
                                </div>
                            </div>
                            {/* ORDERS */}
                            <div className='d-flex align-items-center border-bottom pb-1'>
                                <Icon 
                                    icon='icon-park-outline:transaction-order'
                                    style={{
                                        fontSize:'1.5rem'
                                    }}
                                />
                                <h4 className='pt-2'>Orders</h4>
                                <p>{orderQty}</p>
                                <Icon icon='ic:outline-pending-actions'/>
                                <p>{orderPendingCount}</p>
                                <Icon icon='carbon:task-complete'/>
                                <p>{orderAcceptedCount}</p>
                                <Icon icon='carbon:task-remove'/>
                                <p>{orderDeclinedCount}</p>
                                <Icon icon='mdi:bike'/>
                                <p>{orderReadyCount}</p>
                            </div>
                            <div 
                                className='row overflow-auto'
                                style={{
                                    height:'154rem'
                                }}
                            >
                                {
                                     isOrderLoading ? (
                                        <Spinner 
                                            animation='border' 
                                            className='d-flex justify-content-center' 
                                            variant='info'
                                        />  
                                    ):(
                                    chefOrderData && chefOrderData.map((order, idx) => (
                                        <Orders 
                                            key={idx}
                                            order={order} 
                                            oStatus={order.status} 
                                            oId={order._id}
                                            getChefOrders={getChefOrders}
                                        />
                                    )))
                                }  
                            </div>
                            <br/>
                        </div> 
                    </div>
                    {/* ITEMS */}
                    <div className='col-lg-4 pt-5 pb-5'>
                        <div className='row px-3'>
                            <NewItem 
                                uId={uId}
                                cId={cId}
                                history={props.history}
                                getChef={getChef}
                            />
                        </div>
                        <div 
                            className='row item-list pt-2 p-4 overflow-auto'
                            style={{
                                height:'99rem'
                            }}
                        >
                            {chefData.items && chefData.items.map((item, index) =>  
                                <Item 
                                    key={index}
                                    uId={uId}
                                    item={item}
                                    cId={cId}
                                    history={props.history}
                                    getChef={getChef}
                                />
                            )}
                        </div>
                    </div>
                    <div className='col-lg-1'></div>
                </div>
            </div>
        </>
    )
}