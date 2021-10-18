import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import SideNavbar from '../components/SideNavbar';
import { useLocation } from 'react-router';
import { getUserToken } from "../utils/authToken";
import {IoArrowBackCircleOutline} from 'react-icons/io5';
import { Icon } from '@iconify/react';


export default function EditItem (props) {
    const location = useLocation()
    const { items } = location.state
    const {uId} = useParams()
    const initialState ={
        chef:uId,
        title: items.title,
        description:items.description,
        price:items.price,
        image:items.image,
        tags:items.tags
    }

    const [input, setInput] = useState(initialState)
    const itemId = props.match.params.item

    //EDIT ITEM
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const configs ={
                method:'PUT',
                body:JSON.stringify(input),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `bearer ${getUserToken()}`,
                },
            };
            const updateItem = await fetch(`http://localhost:9999/${uId}/item/${itemId}`, configs);
            const parsedUpdateItem = await updateItem.json()
            console.log(parsedUpdateItem)
            console.log("after update:", parsedUpdateItem.title)
        }   catch (err) {
            console.log(err)
        }
        props.history.push(`/${uId}/chef`)
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    //FETCH DESTROY item
    const deleteItem = async (id) => {
        try{
            const deleteItem = await fetch(`http://localhost:9999/${uId}/item/${itemId}`, {
                method:'DELETE'
            })   // eslint-disable-next-line  
            const parsedItem = await deleteItem.json()
        } catch(err) {
            console.log(err)
        }
        props.history.push(`/${uId}/chef`)
    }

    return(
        <>  
            <SideNavbar uId={uId} />
            <div className='container pt-5 pb-5'>
                    <IoArrowBackCircleOutline
                        onClick={()=>props.history.goBack()}
                        id='goBack' 
                        className='text-decoration-none'>
                    </IoArrowBackCircleOutline>      
                <div className='row pt-5 pb-5'>
                    <div className='col-md-6 d-flex align-item-center justify-content-center'>
                        <img 
                            src={items.image}
                            alt='item_img'
                            className='chef-img'
                        />
                    </div>
                    <div className='col-md-6'>
                        <h5>{items.title}'s Form</h5>
                        <div className='container'>
                            <form onSubmit={handleSubmit}> 
                                <div className='row pt-4'>
                                    <div className='col-md-1'>
                                    </div>
                                    <div className='col-md-5'>
                                        <label htmlFor='title'>Title:</label>
                                        <div className='container'>
                                            <input
                                                id='title'
                                                name='title'
                                                onChange={handleChange}
                                                value={input.title}
                                                placeholder={items.title}
                                                className='editForm'
                                            >
                                            </input>
                                        </div>
                                    </div>
                                    <div className='col-md-5'>
                                    <label htmlFor='price'>Current Price: ${items.price}</label>
                                        <div className='container'>
                                            <input
                                                id='price'
                                                name='price'
                                                onChange={handleChange}
                                                type='number'
                                                value={input.price}
                                                placeholder={`$${items.price}`}
                                                className='editForm'
                                            >
                                            </input>
                                        </div>
                                    </div>
                                    <div className='col-md-1'>
                                    </div>
                                </div>
                                <br/>
                                <div className='row pt-3 pb-3'>
                                    <div className='col-md-1'>
                                    </div>
                                    <div className='col-md-10'>
                                        <label htmlFor='image'>Image:</label>
                                        <div className='container'>
                                            <input
                                                id='image'
                                                name='image'
                                                onChange={handleChange}
                                                value={input.image}
                                                className='editForm'
                                            >
                                            </input>
                                        </div>
                                    </div> 
                                    <div className='col-md-1'>
                                    </div>
                                </div>
                                <div className='row pb-3'>
                                    <div className='col-md-1'>
                                    </div>
                                    <div className='col-md-10'>
                                        <label htmlFor='tags'>Tags:</label>
                                        <div className='container'>
                                            <input
                                                id='tags'
                                                name='tags'
                                                onChange={handleChange}
                                                value={input.tags}
                                                placeholder={items.tags}
                                                className='editForm'
                                            >
                                            </input>
                                        </div>
                                    </div> 
                                    <div className='col-md-1'>
                                    </div>       
                                </div>
                                <div className='row pb-3 pt-2'>
                                    <div className='col-md-1'>
                                    </div>
                                    <div className='col-md-10'>
                                        <label htmlFor='description'>Description: </label>
                                        <div className='container d-flex align-item-center justify-content-center'>
                                        <textarea
                                            id='description'
                                            name='description'
                                            onChange={handleChange}
                                            value={input.description}
                                            placeholder={items.description}
                                            className='editForm'
                                        >
                                        </textarea>
                                    </div>
                                    </div> 
                                    <div className='col-md-1'>
                                    </div>       
                                </div>

                                <div className='row d-flex justify-content-center pt-3'>
                                    <input 
                                        type='submit' 
                                        className='loginBtn p-1' 
                                        id='saveBtn' 
                                        value='save'
                                    />
                                </div>
                            </form>
                        </div>
                        <div className='container d-flex justify-content-end pt-5'>
                            <Icon 
                                onClick={()=> deleteItem(items._id)}
                                icon="fa-solid:trash-alt" 
                                className='icon-list' 
                                id='trash'
                            />
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    )
}