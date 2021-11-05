import React, { useState } from 'react'
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

    const handleChange = (e) => {
        setItem({...item,[e.target.name]: e.target.value})
        console.log("item:",item)
        updateQty(item)
    }


    return (
      
            <select id="select_Qty" name="qty" onChange={handleChange} value={item.qty}>
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