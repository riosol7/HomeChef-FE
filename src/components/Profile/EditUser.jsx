import React, { useState } from 'react';
import { getUserToken } from "../../utils/authToken";

export default function EditUser (props) {
    const uId = props.uId
    const userData = props.userData

    const initialState = {
        user: userData.user,
        password: userData.password,
        email: userData.email,
        fullName: userData.fullName,
        phone: userData.phone,
        image:userData.image
    }

    const [ input, setInput ] = useState(initialState)

    const editUser = async (e) => {
        e.preventDefault()
        try{
            const config = {
                method: "PUT",
                body: JSON.stringify(input),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `bearer ${getUserToken()}`,
                }
            };
            const updatedUser = await fetch(`http://localhost:9999/${uId}`, config);
            const parsedUpdatedUser = await updatedUser.json()
            console.log("After update:", parsedUpdatedUser)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='container'>
                        <form onSubmit={editUser}>
                            <input
                                type='text'
                                name='user'
                                onChange={handleChange}
                                placeholder={userData.user}
                                value={input.user}
                            />
                            <br/>
                            <br/>
                            <input
                                type='text'
                                name='phone'
                                onChange={handleChange}
                                placeholder={userData.phone || "phone number"}
                                value={input.phone}
                            />
                            <br/>
                            <br/>
                            <input
                                type='submit'
                                value='save'
                            />
                        </form>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='container'>
                        <img
                            src={userData.image}
                            alt='user-profile'
                            className='profile-circle border circle d-flex align-item-center justify-content-center'
                        />
                    </div>  
                </div>
            </div>
        </>
    )
}