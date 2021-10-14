import React, { useState } from "react";
import { setUserToken, clearUserToken } from "../utils/authToken";
import { Link } from "react-router-dom";

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
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="user">Username: </label>
                    <br />
                    <input
                    id="user"
                    name="user"
                    value={input.user}
                    onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <br />
                    <input
                    id="password"
                    name="password"
                    type='password'
                    value={input.password}
                    onChange={handleChange}
                    />
                    <br />
                    <br />
                    <input type="submit" className='place-order-input p-1' value="Login" />
                    <p className='p-3'>Don't have an account?<Link to='/register' className='text-decoration-none'> Register</Link></p>
                </form>
            </div>
        </>
    )
}