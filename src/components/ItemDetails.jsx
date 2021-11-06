import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export default function ItemDetails (props) {
    const {uId} = useParams()
    const itemId = props.itemId
    const [item, setItem] = useState({})

    const getItem = async (data) => {
        try{
            const fetchItem = await fetch(`http://localhost:9999/${uId}/item/${itemId}`)
            const parsedItem = fetchItem.json()
            setItem(parsedItem)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getItem()
        // eslint-disable-next-line   
    }, [])

    console.log('getItem:', item)

    return (
        <>
        </>
    )
}