import React, { useReducer, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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


export default function Orders(props) {
    const {uId} = useParams()
    const order = props.order
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

    const declineOrder = () => {
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
            <div key={order._id} className='col-lg-12 border border-primary p-3 my-3'>
                <p>Order ID:{order._id}</p>
                <p 
                    className='d-flex justify-content-end'
                >
                    {order.date}
                </p>
                <h4>{order.user.firstName} {order.user.lastName}</h4>
                <p>{order.user.phone}</p>
                <div className='row pt-4 pb-4 d-flex justify-content-center align-items-center'>
                    {status.status ||order.status}
                </div>
                {/* Order Item(s) */}
                <div className='row pt-4 pb-4'>
                    {
                        order && order.items.map(item => (
                            <>
                                <div key={item._id} className='col-md-3'>
                                    <p>{item.item.title}</p>
                                </div>
                                <div className='col-md-3'>
                                    <p>${item.item.price}</p>
                                </div>
                                <div className='col-md-3'>
                                    <p>Qty:{item.qty}</p>
                                </div>
                                <div className='col-md-3'>
                                    <img
                                        src={item.item.image}
                                        alt='chefOrder-img'
                                        className='post'
                                    />
                                </div>
                                <div className='row pt-2 pb-2'>
                                    {order.note}
                                </div>
                            </>
                        ))
                    }
                </div>
                <div className='row'>
                    <div className='col-md-8'>

                    </div>
                    <div className='col-md-4'>
                        <div className='row'>
                            <div className='col-sm-8'>
                                <p className='d-flex justify-content-end'>Tip :</p>
                                <p className='d-flex justify-content-end'>Sub total :</p>
                                <p className='d-flex justify-content-end'>Total Amount :</p>
                            </div>
                            <div className='col-sm-4'>
                                <p>{order.tip}</p>
                                <p>{order.subTotal}</p>
                                <p>{order.grandTotal}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row pt-4 pb-2'>
                    {
                        (status.status === "Ready for Delivery") ?
                        <>
                            <div>
                                <p>You've earned ${order.tip + order.subTotal}</p>
                            </div>
                        </>
                        :
                        (status.status === "Accepted") ?
                        <>
                            <div className='col-md-10'>

                            </div>
                            <div className='col-md-2'>
                                <input
                                    type='button'
                                    value='ready'
                                    onClick={readyOrder}
                                />
                            </div>
                        </>
                        :
                        (status.status === "Declined") ?
                        <>
                            <div>
                                <p>Need to logout?</p>
                            </div>
                        </>
                        :
                        <>
                            <div className='col-md-8'>

                            </div>
                            <div className='col-md-2'>
                                <input
                                    type='button'
                                    value='decline'
                                    onClick={() => declineOrder()} 
                                />
                            </div>
                            <div className='col-md-2'>
                                <input
                                    type='button'
                                    value='accept'
                                    onClick={acceptOrder} 
                                />
                            </div>
                        </>
                    }
                </div>
            </div>    
        </>
    )
}
