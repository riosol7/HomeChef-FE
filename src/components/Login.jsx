import React, { useState, useEffect, useContext } from "react";
import { setUserToken, clearUserToken } from "../utils/authToken";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext"
import Navbar from "../components/Navbar";
//ICONIFY
import { Icon } from '@iconify/react';

export default function Login (props) {
    const {setUser}  = useContext(UserContext)


    const initialState = { user:"", password:"" }
    const [input, setInput] = useState(initialState)

    const loginUser = async (data) => {
        try{
            const config = {
                method:"POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json"
                }
            }
            const newUser = await fetch('http://localhost:9999/auth/login', config)
            const parsedUser = await newUser.json()
            setUser({
                currentUser: parsedUser.user, 
                isAuth: true,
                token: parsedUser.token
            })
            setUserToken(parsedUser.token)
            return parsedUser
        } catch (err) {
            console.log(err)
            setUser({
                currentUser: null, 
                isAuth: false,
                token: clearUserToken()
            })
            clearUserToken()
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdUserToken = await loginUser(input);
        console.log("createdUserToken:",createdUserToken)
        if (createdUserToken.isLoggedIn) {
            const uId = createdUserToken.user._id
            console.log("uId:",uId)
            props.history.push(`/${uId}/feed`)
        } else {
            props.history.push("/");
        }
        setInput(initialState);
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    };
    
    useEffect(() => {
        return () => {
            setInput(initialState);
        }; 
        // eslint-disable-next-line
    }, [])
    

    return(
        <>            
            <div className='backdrop'>
            <Navbar/> 
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
                                <Link to='/register' className='text-decoration-none mx-1'> 
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
