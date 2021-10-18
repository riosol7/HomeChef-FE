import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { setUserToken, clearUserToken } from "../utils/authToken";
import Navbar from "../components/Navbar"
//ICONIFY
import { Icon } from '@iconify/react';

export default function Register (props) { // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState({}) // eslint-disable-next-line
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const initialState = { 
        user:"", 
        email:"",
        password:"", 
        password2:"", 
    }
    const [input, setInput] = useState(initialState)

    const registerUser = async (data) => {
        try{
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json"
                }
            }
            const newUser = await fetch('http://localhost:9999/auth/register', configs)
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
        if (input.password === input.password2) {
            const createdUserToken = await registerUser(input);
            if (createdUserToken) {
                const uId = createdUserToken.user._id
                props.history.push(`${uId}/newChef`);
            } else {
                props.history.push(`/register`);
            }
        } else {
            alert("password does not match")
            props.history.push("/register");
        }
        setInput(initialState);
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value });
    };

    return(
        <>
            <div className='backdrop'>
                <Navbar/>
                <div className="container pt-5 pb-5">
                    <div className="login-form p-5 d-flex justify-content-center">
                        <form onSubmit={handleSubmit}>
                        <h2 className='pb-2'>Register</h2>
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
                                    placeholder="username"
                                    className="input-c"
                                    />
                                </div>
                            </div>
                            <div className='row d-flex align-items-center p-2'>
                                <div className='col-sm-3 d-flex justify-content-center'>
                                    <Icon icon="dashicons:email" className='form-icons' id='user'/>
                                </div>
                                <div className='col-sm-9 d-flex align-items-center'>
                                    <label htmlFor="email"></label>
                                    <input
                                    id="email"
                                    name="email"
                                    value={input.email}
                                    onChange={handleChange}
                                    placeholder="email"
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
                                    type='password'
                                    name="password"
                                    value={input.password}
                                    onChange={handleChange}
                                    className="input-c"
                                    placeholder="password"
                                    />
                                </div>
                            </div>
                            <div className='row d-flex align-items-center p-2'>
                                <div className='col-sm-3 d-flex justify-content-center'>
                                    <Icon icon="bx:bxs-lock-alt" className='form-icons' id='user'/>
                                </div>
                                <div className='col-sm-9 d-flex align-items-center'>
                                    <label htmlFor="password2"></label>
                                    <input
                                    id="password2"
                                    type='password'
                                    name="password2"
                                    value={input.password2}
                                    onChange={handleChange}
                                    className="input-c"
                                    placeholder="confirm"
                                    />
                                </div>
                            </div>
                            <div className='pt-3 d-flex justify-content-center'>
                                <input type="submit" className='register p-1' value="Register"/>
                            </div>
                            <p className='p-3'>
                                Already have an account?
                                <Link to='/' className='text-decoration-none mx-1'> 
                                    Log in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div> 
            </div>
        </>
    )

}