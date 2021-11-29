import React, { useState, useEffect } from "react";
import {getUserToken} from '../../utils/authToken'
import NewItemModal from "../../components/Chef/NewItemModal"

export default function NewItem (props) {
    const uId = props.uId
    const cId = props.cId

    //FORM NEW ITEM
    const [isOpen, setIsOpen] = useState(false)

    const initialState = {
        chef: cId,
        title:"",
        description:"",
        timeDuration:"",
        price:0,
        image:"",
        likes:0,
        tags:[""]
    }

    const [newItemInput, setNewItemInput] = useState(initialState)
 
    //POST new item 
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
        console.log("newItemInput:",newItemInput)
        newItem(newItemInput)
        setNewItemInput(initialState)
    }
 
    useEffect(() => {
        props.getChef()
        // eslint-disable-next-line 
    }, [newItemInput])

    return(
        <>
            <input
                type='button'
                onClick={() => setIsOpen(true)}
                value='Add New Item'
            />
            <NewItemModal 
                open={isOpen} 
                onClose={() => setIsOpen(false)}
            >
                <div className='container d-flex justify-content-center'>
                    <form onSubmit={handleNewItemSubmit}> 
                        <div className='row pt-4'>
                            <div className='col-md-1'>
                            </div>
                            <div className='col-md-5'>
                                <label htmlFor='title'>Title:</label>
                                <div className='container'>
                                    <input
                                        id='title'
                                        name='title'
                                        onChange={handleNewItemChange}
                                        value={newItemInput.title}
                                        className='editForm'
                                    >
                                    </input>
                                </div>
                            </div>
                            <div className='col-md-5'>
                            <label htmlFor='price'>Price:</label>
                                <div className='container'>
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
                            </div>
                            <div className='col-md-1'>
                            </div>
                        </div>
                        <br/>
                        <div className='row pt-3 pb-3'>
                            <div className='col-md-1'>
                            </div>
                            
                            <div className='col-md-5'>
                                <label htmlFor='image'>Image:</label>
                                <div className='container'>
                                    <input
                                        id='image'
                                        name='image'
                                        onChange={handleNewItemChange}
                                        value={newItemInput.image}
                                        className='editForm'
                                    >
                                    </input>
                                </div>
                            </div>
                            <div className='col-md-5'>
                            <label htmlFor='timeDuration'>PrepTime:</label>
                                <div className='container'>
                                    <input
                                        id='timeDurationInput'
                                        name='timeDuration'
                                        onChange={handleNewItemChange}
                                        value={newItemInput.timeDuration}
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
                                        onChange={handleNewItemChange}
                                        value={newItemInput.tags}
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
                                    onChange={handleNewItemChange}
                                    value={newItemInput.description}
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
            </NewItemModal>
        </>
    )
}