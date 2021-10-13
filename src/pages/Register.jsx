import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { setUserToken, clearUserToken } from "../utils/authToken";

export default function Register (props) { // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState({}) // eslint-disable-next-line
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const initialState = { user:"", password:"", password2:"" }
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
            console.log(parsedUser)
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
                props.history.push(`${uId}/feed`);
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">user:</label>
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
                  type='password'
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="password2">Confirm Password: </label>
                <br />
                <input
                  id="password2"
                  type='password'
                  name="password2"
                  value={input.password2}
                  onChange={handleChange}
                />
                <br />
                <br />
                <input type="submit" className='place-order-input p-1' value="Register" />
                <p className='p-3'>Already have an account?<Link to='/login' className='text-decoration-none'> Log in</Link></p>
            </form>
        </>
    )

}