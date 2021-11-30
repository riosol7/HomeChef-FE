import React, { useState, useEffect } from "react";
import {getUserToken} from '../../utils/authToken'
import NewItemModal from "../../components/Chef/NewItemModal"

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

    const [isOpen, setIsOpen] = useState(false)

    const initialState = {
        chef: cId,
        title:"",
        description:"",
        timeDuration:"",
        options:[],
        price:0,
        image:"",
        likes:0,
        tags:[]
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
        //TAGS BUG not rendering new state of tags when submit
        console.log("tags:",tags)
        setNewItemInput({...newItemInput, tags: tags})
        console.log("newItemInput:",newItemInput)
        newItem(newItemInput)
        setNewItemInput(initialState)
        setTags([])
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
                                        // name='tags'
                                        // onChange={handleNewItemChange}
                                        // value={newItemInput.tags}
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