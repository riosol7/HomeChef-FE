import React from 'react'
import MiniIconBar from "../../components/Chef/MiniIconBar"
import Ad from "../../components/Chef/Ad"
import ReviewsCol from "../../components/Chef/ReviewsCol"
import AllItems from "../../components/Chef/Allitems"
import CartBtn from "../../components/Chef/CartBtn"
import SearchBar from "../../components/Chef/SearchBar"
// import { Icon } from '@iconify/react';

export default function Home(props) {
    const uId = props.uId
    const user = props.user
    const chefData = props.chefData
    const cartColOpen=props.cartColOpen
    const setCartColOpen = props.setCartColOpen
    const cartNum = props.cartNum

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
            <CartBtn
                setCartColOpen={setCartColOpen}
                cartColOpen={cartColOpen}
                cartNum={cartNum}
                user={user}
            />
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
