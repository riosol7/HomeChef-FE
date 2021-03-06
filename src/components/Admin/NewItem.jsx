import React, { useState, useEffect } from "react";
import {getUserToken} from '../../utils/authToken'
import NewItemModal from "../../components/Admin/NewItemModal"
import { Icon } from '@iconify/react';

export default function NewItem (props) {
    const uId = props.uId
    const cId = props.cId

    //FORM NEW ITEM
    const [tags, setTags] = useState([])
    
    const addTags = (e) => {
        if (e.target.value !== ""){
            setTags([...tags, e.target.value]);
            e.target.value = "";
        }
    }

    const removeTags = (idxToRemove) => {
        setTags(tags.filter((_, idx) => idx !== idxToRemove))
    }

    const initialOptionState = {
        name:"",
        description:"",
        price: 0
    }

    const [optionInput, setOptionInput] = useState(initialOptionState)
    const [options, setOptions] = useState([])
    const [showAddOptions, setShowAddOptions] = useState(false)

    
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

    console.log("options:", options)
    

    const [isOpen, setIsOpen] = useState(false)

    const initialState = {
        chef: cId,
        title:"",
        description:"",
        timeDuration:"",
        options:options,
        price:0,
        image:"",
        likes:0,
        tags:tags
    }

     //POST new item 
    const [newItemInput, setNewItemInput] = useState(initialState)

    const newItem = async (data) => {
        try{
            const config = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${getUserToken()}`,
                }
            };
            const createdItem = await fetch(`http://localhost:9999/${uId}/item`, config)
            const parsedNewItem = await createdItem.json()
            console.log("newItem:", parsedNewItem)
            props.getChef()
            setIsOpen(false)
        } catch (err) {
        console.log(err);
        }
    }

    const handleNewItemChange = (e) => {
        setNewItemInput({...newItemInput, [e.target.name]: e.target.value})
    }


    const handleNewItemSubmit = async (e) => {
        e.preventDefault();
        console.log("tags:",tags)
        setNewItemInput({...newItemInput, tags:tags})
        console.log("newItemInput:",newItemInput)
        newItem(newItemInput)
        setNewItemInput(initialState)
        setTags([])
        setOptions([])
        setShowAddOptions(false)
    }
 
    useEffect(() => {
        props.getChef()
        // eslint-disable-next-line 
    }, [newItemInput])

    useEffect(() => {
        setNewItemInput({
            ...initialState,
            title:newItemInput.title,
            description:newItemInput.description,
            timeDuration:newItemInput.timeDuration,
            price:newItemInput.price,
            image:newItemInput.image,
            likes:0,
        })
        // eslint-disable-next-line 
    }, [tags])

    useEffect(() => {
        setNewItemInput({
            ...initialState,
            title:newItemInput.title,
            description:newItemInput.description,
            timeDuration:newItemInput.timeDuration,
            price:newItemInput.price,
            image:newItemInput.image,
            likes:0,
        })
        // eslint-disable-next-line 
    }, [options])

    return(
        <>
            <div className='d-flex align-items-center'>
                <Icon
                    icon='wpf:create-new'
                    style={{
                        color:'white',
                        position:'absolute',
                        fontSize:'1rem',
                        marginLeft:'10.5rem',
                    }}
                />
                <input
                    type='button'
                    onClick={() => setIsOpen(true)}
                    value='Add New Item'
                    style={{
                        borderStyle:"none"||'outset',
                        background:"black" ||'linear-gradient(360deg, rgba(0,0,0,1) 61%, rgba(46,46,46,1) 90%, rgba(144,144,144,1) 100%)',
                        color:'white',
                        paddingTop:'4px',
                        paddingBottom:'4px',
                        fontWeight:'bold',
                        width:'100%',
                        paddingLeft:'3.5rem'
                    }}
                />
            </div>
            <NewItemModal 
                open={isOpen} 
                onClose={() => setIsOpen(false)}
            >
                <div className='container'>
                    <form onSubmit={handleNewItemSubmit}> 
                        <div className='row pt-4'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label htmlFor='title'>Title:</label>
                                    <input
                                        id='title'
                                        name='title'
                                        onChange={handleNewItemChange}
                                        value={newItemInput.title}
                                        className='editForm'
                                    />
                            </div>
                            <div className='col-md-5'>
                            <label htmlFor='price'>Price:</label>
                                    <input
                                        id='price'
                                        name='price'
                                        onChange={handleNewItemChange}
                                        type='number'
                                        value={newItemInput.price}
                                        className='editForm'
                                    >
                                    </input>
                            </div>
                            <div className='col-md-1'></div>
                        </div>
                        <br/>
                        <div className='row pt-3 pb-3'>
                            <div className='col-md-1'></div>  
                            <div className='col-md-5'>
                                <label htmlFor='image'>Image:</label>
                                    <input
                                        id='image'
                                        name='image'
                                        onChange={handleNewItemChange}
                                        value={newItemInput.image}
                                        className='editForm'
                                    />
                            </div>
                            <div className='col-md-5'>
                            <label htmlFor='timeDuration'>PrepTime:</label>
                                <input
                                    id='timeDurationInput'
                                    name='timeDuration'
                                    onChange={handleNewItemChange}
                                    value={newItemInput.timeDuration}
                                    className='editForm'
                                />
                            </div>
                            <div className='col-md-1'></div>
                        </div>

                        <div className='row pb-3 pt-2'>
                            <div className='col-md-1'></div>
                            <div className='col-md-10'>
                                <label htmlFor='description'>Description: </label>
                                <div className='container d-flex align-item-center justify-content-center'>
                                    <textarea
                                        id='description'
                                        name='description'
                                        onChange={handleNewItemChange}
                                        value={newItemInput.description}
                                        className='editForm'
                                    >
                                    </textarea>
                                </div>
                            </div> 
                            <div className='col-md-1'></div>       
                        </div>
                    </form>
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
                                <div>
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
                            </div> 
                            <div className='col-md-1'></div>       
                        </div> 
                        <div className='row pb-3 pt-2'>
                            <label htmlFor='options'>Options:</label>
                                    <input
                                        type='button'
                                        className='editForm'
                                        value='Add Options'
                                        onClick={() =>setShowAddOptions(!showAddOptions)}
                                    />
                                    {
                                        showAddOptions ? 
                                        <>
                                            <form onSubmit={handleOptionSubmit}>
                                                <input
                                                    onChange={handleOptionChange}
                                                    name='name'
                                                    placeholder='Name'
                                                    value={optionInput.name}
                                                />
                                                <input
                                                    onChange={handleOptionChange}
                                                    name='description'
                                                    placeholder='Description'
                                                    value={optionInput.description}
                                                />
                                                <input
                                                    onChange={handleOptionChange}
                                                    name='price'
                                                    placeholder='Price'
                                                    value={optionInput.price}
                                                    type='number'
                                                />
                                                <input
                                                    type='submit'
                                                    value='add option'
                                                />
                                            </form>
                                        </>
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
                    <form onSubmit={handleNewItemSubmit}>                
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
            </NewItemModal>
        </>
    )
}