import React from 'react'
import SearchBar from "../../components/Chef/SearchBar"
import MenuItems from "../../components/Chef/MenuItems"
import UserNav from '../../components/Chef/UserNav'

export default function Menu(props) {
    const uId = props.uId
    const chefData = props.chefData
    const setCartColOpen = props.setCartColOpen
    const cartColOpen = props.cartColOpen
    const cartNum = props.cartNum
    const user = props.user
 

    return (
        <>
        <div className='col-lg-10'>
            <div className='row'>
                <div 
                    className='col-lg-10'
                    style={{
                        paddingLeft:'3.75rem',
                        paddingRight:'11.15rem'
                    }}
                >
                    <SearchBar 
                        chefData={chefData}
                    />
                </div>
                <div className='col-lg-2'>
                    <UserNav
                        user={user}
                        setCartColOpen ={setCartColOpen}
                        cartColOpen={cartColOpen}
                        cartNum ={cartNum}
                    />
                </div>
            </div>
            <div className='px-5'>
            <MenuItems
                uId={uId}
                chefData={chefData}
                clickMenu={props.clickMenu}
                getUser={props.getUser}
                userData={props.userData}
                getChef={props.getChef}
                getCart={props.getCart}
            />
        </div>
        </div>
    </>
    )
}
