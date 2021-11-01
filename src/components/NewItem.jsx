import React, {useState, useEffect} from "react";
import {getUserToken} from '../utils/authToken'
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";

export default function NewItem (props) {
    const {uId} = useParams()
    let cId = props.cId

    //FORM ITEM
    const [input, setInput] = useState({
        chef: cId,
        title:"",
        description:"",
        price:0,
        image:"",
        likes:0,
        tags:[""]
    })

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
            props.history.push(`/${uId}/chef`)
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("input:",input)
        newItem(input)
    }

    const getChef = props.getChef
    useEffect(()=>{
       getChef()
    }, [])

    return(
        <>
            <Container className='d-flex justify-content-center'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title:</label>
                    <br/>
                    <input
                        onChange={handleChange}
                        id="title"
                        name="title"
                        value={input.title}
                    ></input>
                    <br/>
                    <br/>
                    <label htmlFor='description'>Description:</label>
                    <br/>
                    <textarea
                        onChange={handleChange}
                        id="i-description"
                        name="description"
                        value={input.description}
                    ></textarea>
                    <br/>
                    <br/>
                    <label htmlFor='price'>Price:</label>
                    <br/>
                    <input
                        onChange={handleChange}
                        id="price"
                        name="price"
                        value={input.price}
                    ></input>
                    <br/>
                    <br/>
                    <label htmlFor='image'>Image:</label>
                    <br/>
                    <input
                        onChange={handleChange}
                        id="image"
                        name="image"
                        value={input.image}
                    ></input>
                    <br/>
                    <br/>
                    <label htmlFor='tags'>Tags:</label>
                    <br/>
                    <input
                        onChange={handleChange}
                        id="tags"
                        name="tags"
                        value={input.tags}
                    ></input>
                    <br/>
                    <br/>
                    <button type="submit">save</button>
                </form>
            </Container>  
        </>
    )
}