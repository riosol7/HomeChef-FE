import React from 'react'

function OrderHistory(props) {
    const userData = props.userData

    return (
        <div className='container border border-primary p-3'>
            {
                userData.orderHistory && userData.orderHistory.map((order, idx) =>
                    <div key={idx}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <h5>Cooks:</h5>
                                {
                                    order.chefs.map((chef, ix) => 
                                        <h6 key={ix} className='px-2'>
                                            {chef.name}
                                        </h6>
                                    )
                                }
                            </div>
                            <h5>${order.grandTotal}</h5>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p>{order.date}</p>
                            <p>view receipt</p>
                            <p>status: {order.status}</p>
                        </div>
                        {
                            order.items.map((item, index) => 
                                <div key={index} className='row'>
                                    <div className='col-md-3 container'> 
                                        <img 
                                            src={item.image} 
                                            alt='img'
                                            className='chef-img'
                                        />
                                    </div>
                                    <div className='col-md-7'>
                                        <div className='d-flex align-items-center'>
                                            <p>qty:{item.qty}</p>
                                            <p>{item.item.title}</p>
                                        </div>
                                    </div>
                                    <div className='col-md-2 p-2'>
                                        <input
                                            type='button'
                                            value='Reorder'
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default OrderHistory
