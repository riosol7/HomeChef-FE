import React, {useContext, useEffect}  from 'react'

import { clearUserToken } from "../utils/authToken";

import { UserContext } from "../context/UserContext"
import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '0%',
    left:'98rem',
    width: '14rem',
    height:'4.5rem',
    background:'radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(250,242,238,1) 100%)',
    borderRadius:'4px',
    padding:'5px',
    zIndex: 1
}

const MODAL_SM = {
    position: 'fixed',
    top: '0%',
    left:'74rem',
    width: '18rem',
    height:'4.5rem',
    background: 'radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(250,242,238,1) 100%)',
    borderRadius:'4px',
    padding:'5px',
    zIndex: 1
}


export default function UserNavMenu(props) {
    // const uId = props.userData && props.userData._id
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

    useEffect(() => {
        window.addEventListener("scroll", ()=>props.setUserNav(false))
        return () => 
        window.removeEventListener("scroll", props.setUserNav(false))
         // eslint-disable-next-line  
    }, [])
    
    return (
        <>

                <div style={props.cartColOpen ? MODAL_SM : MODAL_STYLES }>
                    <div className='d-flex m-0 pt-4'>
                        <div 
                            className='d-flex align-items-center ' 
                            onClick={handleLogout}
                            style={{
                                fontSize:'1rem',
                                color:'#f53783'
                            }}
                        >
                            <Icon
                                icon='ri:logout-circle-line'
                                
                            />
                            <p className='m-0 mx-1'>Logout</p>
                        </div>
                    </div>
                </div>
        </>
    )
}
