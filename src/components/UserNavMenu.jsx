import React, {useContext}  from 'react'

import { clearUserToken } from "../utils/authToken";

import { UserContext } from "../context/UserContext"
// import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '0%',
    left:'102.385rem',
    width: '10rem',
    backgroundColor: 'white',
    padding:'5px',
    zIndex: 1
}

const MODAL_SM = {
    position: 'fixed',
    top: '0%',
    left:'82.385rem',
    width: '10rem',
    backgroundColor: 'white',
    padding:'5px',
    zIndex: 1
}


export default function UserNavMenu(props) {
    const uId = props.userData._id
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
                {/* <div 
                    className='d-flex align-items-center justify-content-end'
                    style={{
                        paddingTop:'1.1rem'
                    }}
                > 
                    <p className='m-0 mx-2'>{userData.user}</p>
                    <Icon 
                        icon='zmdi:account-circle'
                        style={{
                            fontSize:'2.23rem',
                            marginRight:'2rem',
                        }}
                    />
                </div> */}
                    <div className='pt-5 pb-5'>
                        <div className='row pt-3 pb-2'>
                            <a href={`/${uId}/profile`}> Account</a>
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
