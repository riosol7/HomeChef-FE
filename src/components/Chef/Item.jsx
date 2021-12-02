import React, { useState, useEffect } from 'react';
import { getUserToken } from "../../utils/authToken";
import { Icon } from '@iconify/react';

import EditItemModal from "../../components/Chef/EditItemModal"
import DeleteItemModal from "../../components/Chef/DeleteItemModal"

export default function Item (props) {
    const uId = props.uId
    const cId = props.cId
    const item = props.item
    const itemId = props.item._id
    const itemOptions = props.item.options

    const [isOpen, setIsOpen] = useState(false)

    const [tags, setTags] = useState(item.tags)

    const addTags = (e) => {
        if (e.target.value !== ""){
            setTags([...tags, e.target.value]);
            e.target.value = "";
        }
    }

    const removeTags = (idxToRemove) => {
        setTags(tags.filter((_, idx) => idx !== idxToRemove))
    }

    const [showAddOptions, setShowAddOptions] = useState(false)
    const [options, setOptions] = useState(itemOptions)
    const initialOptionState = {
        name:"",
        description:"",
        price: 0
    }
    const [optionInput, setOptionInput] = useState(initialOptionState)

    const handleOptionChange = (e) => {
        setOptionInput({...optionInput, [e.target.name]: e.target.value})
    }

    const handleOptionSubmit = (e) => {
        e.preventDefault()
        setOptions([...options, optionInput])
        console.log("optionInput:",optionInput)
        setOptionInput(initialOptionState)
    }

    const removeOption = (idxToRemove) => {
        setOptions(options.filter((_, idx) => idx !== idxToRemove))
    }
    
    const initialState ={
        chef:cId,
        title: item.title,
        description:item.description,
        timeDuration:item.timeDuration,
        price:item.price,
        image:item.image,
        options:item.options,
        tags:tags
    }

    const [input, setInput] = useState(initialState)

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
            console.log("after update:", parsedUpdateItem)
            props.getChef()
            setIsOpen(false)
        }   catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    //FETCH DESTROY item
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    const deleteItem = async (id) => {
        try{
            const deleteItem = await fetch(`http://localhost:9999/${uId}/item/${itemId}`, {
                method:'DELETE'
            })   // eslint-disable-next-line  
            const parsedItem = await deleteItem.json()
            console.log("deletedItem:", parsedItem)
            props.getChef()
            setIsOpen(false)
        } catch(err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        props.getChef()
        // eslint-disable-next-line 
    }, [input])

    useEffect(() => {
        setInput(initialState)
        // eslint-disable-next-line 
    },[tags])

    return (                                    
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
                            <Icon 
                                icon="clarity:note-edit-line" 
                                className='icon-list' 
                                id='edit'
                                onClick={() => setIsOpen(true)}
                            />
                            <EditItemModal  
                                open={isOpen} 
                                onClose={() => setIsOpen(false)}
                            >
                                <div className='container pt-5 pb-5'>   
                                    <div className='row pt-5 pb-5'>
                                        <div className='col-md-6 d-flex align-item-center justify-content-center'>
                                            <img 
                                                src={item.image}
                                                alt='item_img'
                                                className='chef-img'
                                            />
                                        </div>
                                        <div className='col-md-6'>
                                            <h5>{item.title}'s Form</h5>
                                            <div className='container'>
                                                <form onSubmit={handleSubmit}> 
                                                    <div className='row pt-4'>
                                                        <div className='col-md-6'>
                                                            <label htmlFor='title'>Title:</label>
                                                            <input
                                                                id='title'
                                                                name='title'
                                                                onChange={handleChange}
                                                                value={input.title}
                                                                placeholder={item.title}
                                                                className='editForm'
                                                            />
                                                        </div>
                                                        <div className='col-md-6'>
                                                        <label htmlFor='price'>Current Price: ${item.price}</label>
                                                            <input
                                                                id='price'
                                                                name='price'
                                                                onChange={handleChange}
                                                                type='number'
                                                                value={input.price}
                                                                placeholder={`$${item.price}`}
                                                                className='editForm'
                                                            />
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div className='row pt-3 pb-3'>
                                                        <div className='col-md-6'>
                                                            <label htmlFor='image'>Image:</label>
                                                            <input
                                                                id='image'
                                                                name='image'
                                                                onChange={handleChange}
                                                                value={input.image}
                                                                className='editForm'
                                                            />
                                                        </div> 
                                                        <div className='col-md-6'>
                                                            <label htmlFor='timeDuration'>Time Duration:</label>
                                                            <input
                                                                id='timeDurationInput'
                                                                name='timeDuration'
                                                                onChange={handleChange}
                                                                value={input.timeDuration}
                                                                className='editForm'
                                                            />  
                                                        </div> 
                                                    </div>
                                                </form>
                                                    <div className='row pb-3 pt-2'>
                                                        <div className='container'>
                                                            <input
                                                                type='button'
                                                                onClick={() => setShowAddOptions(!showAddOptions)}
                                                                value='Add Options'
                                                            />
                                                            {
                                                                showAddOptions ? 
                                                                <form onSubmit={handleOptionSubmit}>
                                                                    <label htmlFor='name'>Name:</label>
                                                                    <input
                                                                        onChange={handleOptionChange}
                                                                        name='name'
                                                                        value={optionInput.name}
                                                                    />
                                                                    <br/>
                                                                    <br/>
                                                                    <label htmlFor='description'>Description:</label>
                                                                    <input
                                                                        onChange={handleOptionChange}
                                                                        name='description'
                                                                        value={optionInput.description}
                                                                    />
                                                                    <br/>
                                                                    <br/>
                                                                    <label htmlFor='price'>Price:</label>
                                                                    <input
                                                                        onChange={handleOptionChange}
                                                                        name='price'
                                                                        value={optionInput.price}
                                                                    />
                                                                    <br/>
                                                                    <br/>
                                                                    <input
                                                                        type='submit'
                                                                        value='save'
                                                                    />
                                                                </form>
                                                                :
                                                                <>
                                                                </>
                                                            }
                                                            {
                                                                options && options.map((option, idx) => (
                                                                    <div key={idx}>
                                                                        <p>{option.name}</p>
                                                                        <p
                                                                            onClick={() => removeOption(idx)}
                                                                        >X
                                                                        </p>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='row pb-3 pt-2'>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-10'>
                                                            <label htmlFor='tags'>Tags:</label>
                                                            <input
                                                                id='tags'
                                                                className='editForm'
                                                                placeholder='Press enter to add tags'
                                                                onKeyUp={e => e.key === "Enter" ? addTags(e) : null}
                                                            />
                                                            <ul>
                                                            {
                                                                tags.map((tag, idx) => (
                                                                    <li key={idx}>
                                                                        <span> 
                                                                            {tag}
                                                                            <p 
                                                                                onClick={() => removeTags(idx)}
                                                                            >x</p>
                                                                        </span>
                                                                    </li>
                                                                ))
                                                            }
                                                            </ul>
                                                        </div> 
                                                        <div className='col-md-1'></div>       
                                                    </div>
                                                <form onSubmit={handleSubmit}> 
                                                    <div className='row pb-3 pt-2'>
                                                        <div className='col-md-1'></div>
                                                        <div className='col-md-10'>
                                                            <label htmlFor='description'>Description: </label>
                                                            <div className='container d-flex align-item-center justify-content-center'>
                                                            <textarea
                                                                id='description'
                                                                name='description'
                                                                onChange={handleChange}
                                                                value={input.description}
                                                                placeholder={item.description}
                                                                className='editForm'
                                                            >
                                                            </textarea>
                                                        </div>
                                                        </div> 
                                                        <div className='col-md-1'></div>       
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
                                                    onClick={()=> setShowDeleteModal(true)}
                                                    icon="fa-solid:trash-alt" 
                                                    className='icon-list' 
                                                    id='trash'
                                                />
                                                <DeleteItemModal
                                                    open={showDeleteModal} 
                                                    onClose={() => setShowDeleteModal(false)}
                                                >
                                                    <p>Are you sure?</p>
                                                    <Icon 
                                                        onClick={()=> deleteItem(item._id)}
                                                        icon="fa-solid:trash-alt" 
                                                        className='icon-list' 
                                                        id='trash'
                                                    />
                                                </DeleteItemModal>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </EditItemModal>
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
    )
}
