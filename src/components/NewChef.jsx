import React, {useState} from "react";
import {getUserToken} from '../utils/authToken';
import { useParams } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import {IoArrowBackCircleOutline} from 'react-icons/io5';

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
            console.log("createdChef:",createdChef)
            props.history.push(`/${uId}/chef`)
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
         <SideNavbar uId={uId} />
            <div className='container pt-5 pb-5'>
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
                <div className='container'>
                    <h3 className='pb-3 d-flex justify-content-center'>New Chef Account</h3>
                    <form className="container" onSubmit={handleSubmit}>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-md-2'>
                                <label htmlFor='name'>Name:</label>
                                <br/>
                                <input
                                    onChange={handleChange}
                                    id="name"
                                    name="name"
                                    value={input.name}
                                    className='editForm'
                                ></input>
                            </div>
                            <div className='col-md-2'>
                                <label htmlFor='phone'>Phone:</label>
                                <br/>
                                <input
                                    onChange={handleChange}
                                    id="phone"
                                    name="phone"
                                    value={input.phone}
                                    className='editForm'
                                ></input>
                            </div>
                        </div>
                        <div className='row pt-3 d-flex justify-content-center'>
                            <div className='col-md-4'>
                                <label htmlFor='image'>Image:</label>
                                <br/>
                                <input
                                    onChange={handleChange}
                                    id="image"
                                    name="image"
                                    value={input.image}
                                    className='editForm'
                                ></input>
                            </div>
                        </div>
                        <div className='row pt-3 d-flex justify-content-center'>
                            <div className='col-md-4'>
                                <label htmlFor='availability'>Availability:</label>
                                <br/>
                                <textarea
                                    onChange={handleChange}
                                    id="availability"
                                    name="availability"
                                    value={input.availability}
                                    className='editForm'
                                ></textarea>
                            </div>
                        </div>
                        <div className='row pt-3 d-flex justify-content-center'>
                            <div className='col-md-4'>
                                <label htmlFor='bio'>Bio:</label>
                                <br/>
                                <textarea
                                    onChange={handleChange}
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    className='editForm'
                                ></textarea>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center pt-4 pb-5'>
                            <input 
                                type='submit' 
                                className='loginBtn p-1' 
                                id='newChefBtn' 
                                value='save'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>    
    )
}