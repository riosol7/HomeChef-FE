import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getUserToken } from "../../utils/authToken";

export default function CartModalItem(props) {
    const {uId} = useParams()
    const id = props.id
    const oldQty = props.qty
    const cartItem = props.cartItem


    const [item, setItem] = useState({
        _id:id,
        qty:oldQty,
    })

     //REMOVE ITEM/UPDATE ITEM QTY
    const updateQty = async (data) => {
        try{
            const config = {
                method:"PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `bearer ${getUserToken()}`
                }
            };
            const changeQty = await fetch(`http://localhost:9999/${uId}/cart/${id}`, config)
            const parsedItem = await changeQty.json()
            console.log("updateQty:",parsedItem)
            props.getUser()
        } catch (err) {
            console.log(err)
        }
    }


    const decrementQty = async () => {
        if(item.qty === 1){
           
                try {
                    const config = {
                        method:"PUT",
                        body: JSON.stringify(item),
                        headers: {
                            "Content-Type":"application/json",
                            "Authorization": `bearer ${getUserToken()}`
                        }
                    };
                    const removedItem = await fetch(`http://localhost:9999/${uId}/cart/remove/${id}`, config)
                    const parsedRemovedItem = await removedItem.json()
                    console.log("removedItem:", parsedRemovedItem)
                    props.getUser()
                } catch (err) {
                    console.log(err)
                }
            
        } else {
            const newQty = item.qty - 1
            setItem({...item, qty: newQty})
            updateQty(item)
        }
    }

    const incrementQty = () => {
        const newQty = item.qty + 1
        setItem({...item, qty: newQty})
        updateQty(item)
    }

    useEffect(() => {
        updateQty(item)
        props.getUser()
        // eslint-disable-next-line  
    }, [item])




    return (
        <>
            <div className='row'>
                <div className='col-md-3'>
                    <input
                        type='button'
                        value='trash'
                        // onClick={() => removeItem()}
                    />
                </div>
                <div className='col-md-7'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <p>{cartItem.item.title}</p>
                        </div>
                        <div className='col-md-6'>
                            <input
                                type='button'
                                value='-'
                                onClick={() => decrementQty()}
                            />
                            <input
                                type='button'
                                value='+'
                                onClick={() => incrementQty()}
                            />
                        </div>  
                    </div>
                </div>
                <div className='col-md-2 d-flex justify-content-end'>
                    <p>${cartItem.total}</p>
                </div>
            </div>
           
        </>
      
    )
}