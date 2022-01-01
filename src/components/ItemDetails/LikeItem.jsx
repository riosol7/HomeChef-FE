import React, {useState, useEffect} from 'react'

import { Icon } from '@iconify/react';

export default function LikeItem(props) {
    const uId = props.uId
    const userData = props.userData
    const item = props.item
    const [updatedItem, setUpdatedItem] = useState(item)

    const likeItem = async (id) => {
        try {
            const configs = {
                method:'PUT',
                body:JSON.stringify(item),
                headers:{
                    "Content-Type":"application/json",
                    // "Authorization":`bearer ${getUserToken()}`,
                },
            };
            const like = await fetch(`http://localhost:9999/${uId}/item/like/${item._id || id}`, configs)
            const parsedLikedItem = await like.json()
            console.log("after update:", parsedLikedItem)
            setUpdatedItem(parsedLikedItem)
            props.getItems()
        } catch (err) {
            console.log(err)
        }
    }

    const unlikeItem = async (id) => {
        try {
            const configs = {
                method:'PUT',
                body:JSON.stringify(item),
                headers:{
                    "Content-Type":"application/json",
                    // "Authorization":`bearer ${getUserToken()}`,
                },
            };
            const unlike = await fetch(`http://localhost:9999/${uId}/item/unlike/${item._id || id}`, configs)
            const parsedUnlikedItem = await unlike.json()
            console.log("after update:", parsedUnlikedItem)
            setUpdatedItem(parsedUnlikedItem)
            props.getItem()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        props.getItem()
        // eslint-disable-next-line
    },[updatedItem])

    return (
            <div className='d-flex align-items-center mx-3 pb-5'>
                {
                updatedItem.likes && updatedItem.likes.filter(user => user === userData.user).length >= 1 ?
                        <Icon
                            icon='ci:heart-fill'
                            style={{
                                color:'#e74e5f',
                                fontSize:'1.2rem' 
                            }}
                            onClick={() => unlikeItem(item._id)}    
                        />
                        :
                        <Icon
                            icon='akar-icons:heart'
                            style={{
                                color:'#e74e5f',
                                fontSize:'1.2rem' 
                            }}  
                            onClick={() => likeItem(item._id)}      
                        />
                }
                <p>{updatedItem.likeTotal || item.likeTotal}</p>
            </div>
    )
}

