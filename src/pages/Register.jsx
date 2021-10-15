import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { setUserToken, clearUserToken } from "../utils/authToken";

export default function Register (props) { // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState({}) // eslint-disable-next-line
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const initialState = { 
        user:"", 
        password:"", 
        password2:"", 
        email:"",
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 d-flex justify-content-center">
                        <img 
                            src="https://homechef.imgix.net/https%3A%2F%2Fwww.homechef.com%2Fassets%2Fwhats_on_your_menu%2Fadventurous%2Fhuli-huli-chicken-rice-bowl-e435d29245b03f4cbade312e384d6317ba7d3a53b723985684ea49148cdaf659.jpg?ixlib=rails-1.1.0&s=96a4159418b80bd71d080d393c664996" 
                            alt=""
                            id="register-img"
                        />
                    </div>
                    <div className="col-lg-6 d-flex justify-content-center">
                        <form onSubmit={handleSubmit}>
                        <h2>Register</h2>
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
                            <label htmlFor="user">email:</label>
                            <br />
                            <input
                            id="email"
                            name="email"
                            value={input.email}
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
                    </div>
                </div>
            </div> 
        </>
    )

}