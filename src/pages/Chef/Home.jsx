import React from 'react'
import MiniIconBar from "../../components/Chef/MiniIconBar"
import Ad from "../../components/Chef/Ad"
import ReviewsCol from "../../components/Chef/ReviewsCol"
import AllItems from "../../components/Chef/Allitems"
import CartBtn from "../../components/Chef/CartBtn"
import { Icon } from '@iconify/react';

export default function Home(props) {
    const uId = props.uId
    const chefData = props.chefData
    const cartColOpen=props.cartColOpen
    const setCartColOpen = props.setCartColOpen
    const cartNum = props.cartNum

    return (
        <>
        <div className='col-lg-8 px-5'>
            <div className='d-flex justify-content-between pb-2'>
                <h1 className='display-2'>{chefData.name}</h1>
                <div
                    className='d-flex align-items-center justify-content-center'
                    style={{
                        background:'#f4f6f8',
                        borderRadius:'12px',
                        width:'4rem',
                        height:'4rem',
                    }}
                >
                <Icon
                    icon='akar-icons:search'
                    style={{
                        fontSize:'2rem',

                    }}
                />
                </div>
            </div>
            <MiniIconBar
                cartColOpen={cartColOpen}
            />
            <AllItems
                uId={uId}
                chefData={chefData}
                clickMenu={props.clickMenu}
            />
        </div>
        <div className='col-lg-2'>
            <CartBtn
                setCartColOpen={setCartColOpen}
                cartColOpen={cartColOpen}
                cartNum={cartNum}
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
