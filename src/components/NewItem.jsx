import React, {useState, useEffect} from "react";
import {getUserToken} from '../utils/authToken'
import { useParams } from "react-router-dom";

export default function NewItem (props) {
    const {uId} = useParams()
    const [list, setList] = useState([])

    useEffect(() => {
        const getChef = async (data) => {
            try{
                const config = {
                    method:"GET",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization":`bearer ${getUserToken()}`
                    }
                };
                const chefs = await fetch(`http://localhost:9999/${uId}/chef`, config)
                const parsedChefs = await chefs.json()
                setList(parsedChefs)
            } catch (err) {
                console.log(err)
            };
        };
        getChef();// eslint-disable-next-line 
    }, [])


    // let matchChef = list.filter(chef => {
    //     return chef.user === uId
    // })

    // let match = matchChef.filter(chef => {
    //     return chef.name
    // })
    // console.log(match)
    
    const notUndefined = anyValue => typeof anyValue !== 'undefined'   
    let matchChefId = list.map(chef => { 
        if(chef.user === uId){
            return chef._id
        }
        return(
            <>
            </>    
        )
    }).filter(notUndefined);

    
    // let foundChefId = matchChefId[0];
    // let yo = foundChefId
    console.log(matchChefId.shift())


    const [input, setInput] = useState({
        // chef:foundChefId,
        title:"",
        description:"",
        price:0,
        image:"",
        likes:0,
        tags:[""]
    })

    const newItem = async (data) => {
        try{
            const config = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${getUserToken()}`,
                }
            };// eslint-disable-next-line
            const createdItem = await fetch(`http://localhost:9999/${uId}/item`, config)
            props.history.push(`/${uId}/chef`)
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        newItem(input)
    }

    return(
        <>
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
                <input
                    onChange={handleChange}
                    id="description"
                    name="description"
                    value={input.description}
                ></input>
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
                    // type="file"
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
                <input type="submit" value="save"></input>
            </form>
        </>
    )
}