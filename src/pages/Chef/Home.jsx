import React, {useState}  from 'react'
import MiniIconBar from "../../components/Chef/MiniIconBar"
import Ad from "../../components/Chef/Ad"
import ReviewsCol from "../../components/Chef/ReviewsCol"
import AllItems from "../../components/Chef/Allitems"
import CartBtn from "../../components/Chef/CartBtn"
import SearchBar from "../../components/Chef/SearchBar"
import { Icon } from '@iconify/react';

import UserNavMenu from "../../components/UserNavMenu"

export default function Home(props) {
    const uId = props.uId
    const user = props.user
    const chefData = props.chefData
    const cartColOpen=props.cartColOpen
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
        <>
        <div className='col-lg-8 px-5'>
            <SearchBar 
                chefData={chefData}
            />
            <MiniIconBar
                cartColOpen={cartColOpen}
            />
            <AllItems
                uId={uId}
                chefData={chefData}
                clickMenu={props.clickMenu}
                getUser={props.getUser}
                userData={props.userData}
                getChef={props.getChef}
                getCart={props.getCart}
            />
        </div>
        <div className='col-lg-2'>
            <div className='d-flex align-items-center justify-content-end'>
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
            <Ad
              chefData={chefData}
            />
            <ReviewsCol
              chefData={chefData}
              clickReviews={props.clickReviews}
            />
        </div>
    </>
    )
}
