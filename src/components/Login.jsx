import React, { useState } from "react";
import { setUserToken, clearUserToken } from "../utils/authToken";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
//ICONIFY
import { Icon } from '@iconify/react';

export default function Login (props) { // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState({}) // eslint-disable-next-line
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const initialState = { user:"", password:"" }
    const [input, setInput] = useState(initialState)

    const loginUser = async (data) => {
        try{
            const configs = {
                method:"POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json"
                }
            }
            const newUser = await fetch('http://localhost:9999/auth/login', configs)
            const parsedUser = await newUser.json()
            setUserToken(parsedUser.token)
            setCurrentUser(parsedUser.user)
            setIsAuthenticated(parsedUser.isLoggedIn)
            return parsedUser
        } catch (err) {
            console.log(err)
            clearUserToken()
            setIsAuthenticated(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdUserToken = await loginUser(input);
        const uId = createdUserToken.user._id
        if (createdUserToken) {
            props.history.push(`/${uId}/feed`)
        } else {
            props.history.push("/login");
        }
        setInput(initialState);
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    };
    
    

    return(
        <>            
            <div className='backdrop'>
            <Navbar/> 
                <div className='pt-5 pb-5'>
                </div>
                <div className='container pt-5 pb-5'>
                    <div className='login-form container d-flex justify-content-center p-5'>
                        <form onSubmit={handleSubmit} className="pb-5 pt-5">
                            <h2 className='pb-3'>Sign in</h2>
                            <div className='row d-flex align-items-center p-2'>
                                <div className='col-sm-3 d-flex justify-content-center'>
                                    <Icon icon="carbon:user-avatar-filled" className='form-icons' id='user'/>
                                </div>
                                <div className='col-sm-9 d-flex align-items-center'>
                                    <label htmlFor="user"></label>
                                    <input
                                    id="user"
                                    name="user"
                                    value={input.user}
                                    onChange={handleChange}
                                    placeholder='username'
                                    className="input-c"
                                    />
                                </div>
                            </div>
                            <div className='row d-flex align-items-center p-2'>
                                <div className='col-sm-3 d-flex justify-content-center'>
                                    <Icon icon="bx:bxs-lock-open-alt" className='form-icons' id='user'/>
                                </div>
                                <div className='col-sm-9 d-flex align-items-center'>
                                    <label htmlFor="password"></label>                      
                                    <input
                                    id="password"
                                    name="password"
                                    type='password'
                                    value={input.password}
                                    onChange={handleChange}
                                    placeholder='password'
                                    className="input-c"
                                    />
                                </div>
                            </div>
                            <div className='pt-3 d-flex justify-content-center'>
                                <input type="submit" className='loginBtn p-1' value="Login" />
                            </div>
                            <p className='p-3'>
                                Don't have an account?
                                <Link to='/' className='text-decoration-none mx-1'> 
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
