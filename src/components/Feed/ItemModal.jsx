import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import ItemModalBtn from "../../components/Feed/ItemModalBtn"
import { Icon } from '@iconify/react';


const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'43rem',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(rgba(0,0,0,0.6),#FFF 30%)',
    backgroundColor: '#FFF',
    padding: '15px',
    zIndex: 1
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex:1
}

export default function ItemModal(props) {
    const item = props.item
    const uId = props.uId
    const userData = props.userData
    const chefsData = props.chefsData
    const [updatedItem, setUpdatedItem] = useState(item)

    useEffect(() => {
        props.getItems()
        // eslint-disable-next-line
    },[updatedItem])

    if(!props.open) return null

    const findChef = (id) => {
        const matchId = chefsData.filter(chef => chef._id === id)
        if(matchId[0] !== undefined){
            return matchId[0].name
        }
        return
    }

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
            props.getItems()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <Icon 
                        icon="ion:close-circle" 
                        style={{
                            fontSize:"3.4rem",
                            color:"#ebebeb",
                        }} 
                        onClick={props.onClose}
                    />
                    <div className='pt-4 pb-2'>
                        <div className='container pt-2 pb-2 d-flex justify-content-center'>
                            <img
                                src={item.image} 
                                alt='img-modal'
                                className='chef-img'
                            />
                        </div>
                        <div className='pb-1 border-bottom d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Link 
                                    className='text-decoration-none'
                                    to={{
                                        pathname: `/${uId}/item/${item._id}`
                                    }} 
                                    >
                                    <h4 
                                        style={{
                                            fontSize:'5rem',
                                            color:'#f53783',
                                        }}
                                    >{item.title}</h4>
                                </Link>
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
                            </div>
                            <h5>${item.price}</h5>
                        </div>
                        <div className='pt-3 pb-2 d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Icon 
                                    icon='ls:cookpad' 
                                    style={{
                                        fontSize:"2rem",
                                        marginBottom:"9px",
                                    }}
                                />
                                <p className='px-1'>{findChef(item.chef)}</p>
                            </div>
                            <p className='text-muted'>{item.timeDuration}</p>
                        </div>
                        <div className='pt-1 pb-1'>
                            <p>{item.description}</p> 
                        </div>
                        <ItemModalBtn 
                            item={item} 
                            getUser={props.getUser}
                            onClose={props.onClose}
                        />
                    </div>        
                </div>
            </div>
        </>
    )
}


