import React, { useState, useReducer, useEffect } from "react";
import { useParams } from 'react-router-dom'

//COMPONENTS
import Navbar from "../components/Navbar"
import EditUser from "../components/Profile/EditUser"
import Favorites from "../components/Profile/Favorites"
import OrderHistory from "../components/Profile/OrderHistory"

function reducer(state, action) {
    switch(action.type) {
        case "Edit":
            return { show: "Edit" }
        case "Order History":
            return { show: "Order History" }
        case "Favorites":
            return { show: "Favorites" }
        default:
            return state
    }
}

export default function Profile (props) {
    const {uId} = useParams()
    const [userData, setUserData] = useState({})

    const [ show, dispatch ] = useReducer(reducer, {
        show: "Edit"
    })
  
    const getUser = async () => {
        try { 
            const user = await fetch(`http://localhost:9999/${uId}`)
            const parsedUser = await user.json()
            console.log("getUser:", parsedUser)
            setUserData(parsedUser)
            // setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const cartNum = userData.cart && userData.cart.length

    const edit = () => {
        dispatch({ type: "Edit"})
    }

    const orderHistory = () => {
        dispatch({ type: "Order History"})
    }

    const favorites = () => {
        dispatch({ type: "Favorites"})
    }

    useEffect(() => {
        getUser()
        // console.log("userData(ufx):",userData)
        return () => {
            setUserData({});
        };  
          // eslint-disable-next-line
    }, [])

    return(
        <>
            <Navbar 
                uId={uId} 
                userData={userData}
                history={props.history} 
                cartNum={cartNum} 
                cart={userData.cart} 
                getUser={getUser}
            />
            <div className='container'>
                <div className='row pt-3 pb-3'>
                <h4
                    onClick={edit}
                    style={{cursor: "pointer"}}
                >
                    Your Account
                </h4>
                    <div className='col-lg-3'>
                        <div className='container'>
                            <p 
                                onClick={orderHistory}
                                style={{cursor: "pointer"}}
                            >
                                Order History
                            </p>
                            <p
                                onClick={favorites}
                                style={{cursor: "pointer"}}
                            >
                                Favorites
                            </p>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        {
                            show.show === "Edit" ?
                                <EditUser
                                    uId={uId}
                                    userData={userData}
                                />
                            :
                            show.show === "Order History" ?
                                <OrderHistory
                                    userData={userData}
                                />
                            :
                            show.show === "Favorites" ?
                                <Favorites
                                    userData={userData}
                                />
                            :
                            <>
                            </>
                        }
                    </div>

                </div>
            </div>

            
        </>
    )
}