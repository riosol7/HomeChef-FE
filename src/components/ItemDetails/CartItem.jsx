import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getUserToken } from "../../utils/authToken";

export default function CartItem(props)  {
    const {uId} = useParams()
    const id = props.id
    const oldQty = props.qty
    const cartItem = props.cartItem
    // console.log(cartItem)

    const [item, setItem] = useState({
        _id:id,
        qty:oldQty,
    })

    // const [itemFound, setItemFound] = useState({})

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
            // const findItemArr = parsedItem && parsedItem.cart.filter(item => item._id === id)
            // const foundItem = findItemArr[0]
            // setItemFound({
            //     _id: foundItem._id,
            //     qty: foundItem.qty
            // })
            props.getUser()
        } catch (err) {
            console.log(err)
        }
    }

    const handleQty = (e) => {
        setItem({...item,[e.target.name]: e.target.value})
        // console.log("qtyChange(new)",qtyChange.current)
        // console.log("item:",item)
        updateQty(item)
    }

    useEffect(() => {
        updateQty(item)
        props.getUser()
        // eslint-disable-next-line  
    }, [item])
    
    // useEffect(() => {
    //     if(props.getCart)
    //     updateQty(item)
    //     props.getCart()
    //      // eslint-disable-next-line
    // },[item])

    // useEffect(() => {
    //     updateQty(itemFound)
    //     props.getUser()
    //     // eslint-disable-next-line  
    // }, [itemFound])



    return (
        <>
            <div className='row pb-3 pt-3'>
                <div className='col-md-4'>
                    <img
                        src={cartItem.item.image}
                        alt='cartItemImg'
                    />
                </div>
                <div className='col-md-8 d-flex align-items-center justify-content-between'> 
                    <div className='col-md-6'>
                        <a 
                            className='text-decoration-none text-reset'
                            href={`/${uId}/item/${item._id}`} 
                            >
                            <p>{cartItem.item.title}</p>
                        </a>
                        <select 
                            id="itemQty" 
                            name="qty" 
                            onChange={handleQty} 
                            value={item.qty}
                            style={{
                                width:'45%', 
                                background:'#f6f6f6',
                                borderRadius:'12px',
                                paddingLeft:'4px',
                                fontSize:'12px',

                            }}
                        >
                            <option value="Remove">Remove</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                    </div> 
                    <p>${cartItem.total}</p>    
                </div>
            </div> 
        </>
      
    )
}