import React, {useState} from 'react'
import CartBtn from "../../components/Chef/CartBtn"
import UserNavMenu from "../../components/UserNavMenu"
import { Icon } from '@iconify/react';

export default function UserNav(props) {
    const user = props.user
    const cartColOpen = props.cartColOpen
    const setCartColOpen = props.setCartColOpen
    const cartNum = props.cartNum
    const [userNav, setUserNav] = useState(false)
    const openUserNav = () => {
        setUserNav(true)
    }
    const closeUserNav = () => {
        setUserNav(false)
    }
    return (
        <div className='d-flex align-items-center justify-content-end'
            style={{
                paddingTop:'.75rem',
                paddingRight:'.5rem',
            }}
        >
            <div className='d-flex align-items-center mx-2 pb-5' onMouseEnter={openUserNav} onMouseLeave={closeUserNav}> 
                <p
                    style={{
                        zIndex:'2'
                    }} 
                    className='m-0 mx-2'
                >{user.user}</p>
                <Icon 
                    icon='zmdi:account-circle'
                    style={{
                        fontSize:'2.23rem',
                        marginRight:'2rem',
                        zIndex:'2'
                    }}
                />
                {
                    userNav ? 
                    <UserNavMenu 
                        userNav={userNav}
                        setUserNav={setUserNav}
                        userData={user}
                        cartColOpen={cartColOpen}
                    />
                    :
                    <>
                    </>
                }
            </div>
            <CartBtn
                setCartColOpen={setCartColOpen}
                cartColOpen={cartColOpen}
                cartNum={cartNum}
                user={user}
            />
        </div>
    )
}
