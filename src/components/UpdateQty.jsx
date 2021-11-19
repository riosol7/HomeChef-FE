import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getUserToken } from "../utils/authToken";

export default function UpdateQty(props) {
    const {uId} = useParams()
    const id = props.id
    const oldQty = props.qty

    const [item, setItem] = useState({
        _id:id,
        qty:oldQty,
    })

    // const qtyChange = useRef(item.qty)
    

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
            props.history.push(`/${uId}/checkout`)
            // window.location.reload(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleQty = (e) => {
        setItem({...item,[e.target.name]: e.target.value})
        // console.log("qtyChange(new)",qtyChange.current)
        console.log("item:",item)
        updateQty(item)
    }

    useEffect(() => {
        updateQty(item)
        props.getCart()
        // eslint-disable-next-line  
    }, [item])




    return (
      
            <select id="item.qty" name="qty" onChange={handleQty} value={item.qty}>
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
      
    )
}