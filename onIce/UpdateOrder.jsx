import React, { useReducer, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { getUserToken } from "./../../utils/authToken";

const ACTIONS = {
    DECLINED: 'Declined',
    ACCEPTED: 'Accepted',
    READY: 'Ready for Delivery'

}

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.DECLINED:
            return { status: "Declined" }
        case ACTIONS.ACCEPTED:
            return { status: "Accepted" }
        case ACTIONS.READY:
            return { status: "Ready for Delivery" }
        default:
            return state
    }
}

export default function UpdateOrder(props) {
    const {uId} = useParams()
    const oId = props.oId
    const oStatus = props.oStatus

    // const [showBtn, setShowBtn] = useState({
    //     declineBtn: true,
    //     acceptBtn: true,
    //     readyBtn: false
    // })
  
    const [status, dispatch] = useReducer(reducer, {
        status: oStatus
    })


    const updateOrder = async (e) => {   
        try {
            const config = {
                method: "PUT",
                body:JSON.stringify(e),
                headers:{
                    "Content-Type":"application/json",
                    // "Authorization": `bearer ${getUserToken()}`,
                },
            };
            const updateStatus = await fetch(`http://localhost:9999/${uId}/chef/order/${oId}`, config);
            const parsedUpdateStatus = await updateStatus.json()
            console.log("after update:", parsedUpdateStatus)
        } catch (err) {
            console.log(err)
        }
    }

    const declineOrder = async () => {
        dispatch({ type: ACTIONS.DECLINED })
        console.log("status (click):",status)
        updateOrder(status)

    }

    const acceptOrder = () => {
        dispatch({ type: ACTIONS.ACCEPTED })
        console.log("status (click):",status)
        updateOrder(status)
        // setShowBtn({
        //     declineBtn: false, 
        //     acceptBtn: false,
        //     readyBtn: true
        // })
    }

    const readyOrder = () => {
        dispatch({ type: ACTIONS.READY })
        console.log("status (click):",status)
        updateOrder(status)
    }

    useEffect(() => {
        console.log("status(ufx):",status)
        updateOrder(status)
        // eslint-disable-next-line 
    }, [status])


    return (
        <>
            <div className='row pt-4 pb-2'>
                <div className='col-md-6'>

                </div>
                <div className='col-md-3'>
                    <input
                        type='button'
                        value='decline'
                        onClick={() => declineOrder()} 
                    />
                </div>
                <div className='col-md-3'>
                    <input
                        type='button'
                        value='accept'
                        onClick={acceptOrder} 
                    />
                    <input
                        type='button'
                        value='ready'
                        onClick={readyOrder}
                    />
                </div>
            </div>
        </>
    )
}
