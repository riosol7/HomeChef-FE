import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getUserToken } from "../../utils/authToken";

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
            props.getCart()
        } catch (err) {
            console.log(err)
        }
    }

    const handleQty = (e) => {
        setItem({...item,[e.target.name]: e.target.value})
        console.log("item:",item)
        updateQty(item)
    }

    useEffect(() => {
        updateQty(item)
        props.getCart()
        // eslint-disable-next-line  
    }, [item])


    return (
            <select 
                id="item.qty" 
                name="qty" 
                onChange={handleQty} 
                value={item.qty}
                style={{
                    width:'50px',
                    borderRadius:'24px',
                    paddingTop:'.1rem',
                    paddingBottom:'.1rem',
                    paddingLeft:'0.3rem',
                    border:'none',
                    background:'#efefef',
                    outline:'none'
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
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>
            </select>
      
    )
}