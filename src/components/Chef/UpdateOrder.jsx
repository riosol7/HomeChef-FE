import React from 'react'
// { useState } 
export default function UpdateOrder(props) {

    // const oId = props.oId
    
    // const [input, setInput] = useState({
    //     _id:oId,
    //     status:"Not Accepted"
    // }) 

    // const updateOrder = async () => {
    //     try {
    //         const config = {
    //             method: "PUT",
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <>
            <div className='row pt-4 pb-2'>
                <div className='col-md-6'>

                </div>
                <div className='col-md-3'>
                    <button
                        
                    >
                    decline
                    </button>
                </div>
                <div className='col-md-3'>
                    <button
                    
                    >
                        accept
                    </button>
                </div>
            </div>
        </>
    )
}
