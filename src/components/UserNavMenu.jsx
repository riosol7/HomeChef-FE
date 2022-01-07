import React, {useContext}  from 'react'

import { clearUserToken } from "../utils/authToken";

import { UserContext } from "../context/UserContext"
// import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '0%',
    left:'102.385rem',
    width: '10rem',
    background: 'radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(250,242,238,1) 100%)',
    borderRadius:'4px',
    padding:'5px',
    zIndex: 1
}

const MODAL_SM = {
    position: 'fixed',
    top: '0%',
    left:'82.385rem',
    width: '10rem',
    background: 'radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(250,242,238,1) 100%)',
    padding:'5px',
    borderRadius:'4px',
    zIndex: 1
}


export default function UserNavMenu(props) {
    const uId = props.userData && props.userData._id
    const { user, setUser }  = useContext(UserContext)
    // const userData = props.userData
    const handleLogout = async () => {
        try{
            const logout = await fetch(`http://localhost:9999/auth/logout`, user) 
            const parsedLogout = await logout.json();
            console.log("parsedLogout:",parsedLogout)
            setUser({
                currentUser: null, 
                isAuth: false,
                token: clearUserToken("")
            })
            clearUserToken("")
            props.history.push("/")
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <>

                <div style={props.cartColOpen ? MODAL_SM : MODAL_STYLES }>
                    <div className='pt-5 pb-5'>
                        <div className='row pt-3 pb-2'>
                            <a href={`/${uId}/profile`} className='text-decoration-none'> Account</a>
                        </div>
                    </div>
                    <div className='pt-5'>
                        <input
                            onClick={handleLogout}
                            type='button'
                            value='logout'
                        />
                    </div>
                </div>
        </>
    )
}
