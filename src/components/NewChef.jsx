import React, {useState} from "react";
import {getUserToken} from '../utils/authToken'
import { useParams, Link } from "react-router-dom";

export default function NewChef (props) {
    const {uId} = useParams()
    const [input, setInput] = useState({
        user: uId,
        name:"",
        phone:"",
        image:"",
        bio:"",
        availability:"",
        rating:0,
        points:0
    })

    const newChef = async (data) => {
        console.log(uId)
        console.log(getUserToken());
        try{
            const config = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${getUserToken()}`,
                }
            };// eslint-disable-next-line
            const createdChef = await fetch(`http://localhost:9999/${uId}/chef`,config)
            props.history.push(`/${uId}/feed`)
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        newChef(input)
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name:</label>
                <br/>
                <input
                    onChange={handleChange}
                    id="name"
                    name="name"
                    value={input.name}
                ></input>
                <br/>
                <br/>
                <label htmlFor='phone'>Phone:</label>
                <br/>
                <input
                    onChange={handleChange}
                    id="phone"
                    name="phone"
                    value={input.phone}
                ></input>
                <br/>
                <br/>
                <label htmlFor='image'>Image:</label>
                <br/>
                <input
                    onChange={handleChange}
                    id="image"
                    name="image"
                    type='file'
                    value={input.image}
                ></input>
                <br/>
                <br/>
                <label htmlFor='bio'>Bio:</label>
                <br/>
                <textarea
                    onChange={handleChange}
                    id="bio"
                    name="bio"
                    value={input.bio}
                ></textarea>
                <br/>
                <br/>
                <label htmlFor='availability'>Availability:</label>
                <br/>
                 <textarea
                    onChange={handleChange}
                    id="availability"
                    name="availability"
                    value={input.availability}
                ></textarea>
                <br/>
                <br/>
                <input type="submit" value="save"></input>
            </form>
            <p className='p-3'>Don't wanna cook?<Link to={`/${uId}/feed`} className='text-decoration-none'> Home</Link></p>
        </>    
    )
}