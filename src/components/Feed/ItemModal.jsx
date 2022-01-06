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
    background: 'white',
    // background: 'linear-gradient(rgba(0,0,0,0.6),#FFF 30%)',
    backgroundColor: '#FFF',
    padding: '0px',
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
    const userData = props.userData && props.userData
    const chefData = props.chefData && props.chefData
    const chefName= chefData && chefData.name 
    const chefsData = props.chefsData
    const [updatedItem, setUpdatedItem] = useState(item)

    useEffect(() => {
        return () => {
            setUpdatedItem(item);
        }; 
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        props.getItems()
        props.getUser()
        // eslint-disable-next-line
    },[updatedItem])

    useEffect(() => {
        if(props.getCart)
        props.getCart()
         // eslint-disable-next-line
    },[updatedItem])

    if(!props.open) return null
    
    const findChef = (id) => {
        if(chefsData){
            const matchById = chefsData.filter(chef => chef._id === id)
            if(matchById[0] !== undefined){
                return matchById[0].name
            }
            return
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

    console.log(item)
    
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
                    <div className='pt-4'>
                        <div className='container pt-2 pb-2 d-flex justify-content-center border-bottom'>
                            <img
                                src={item.image} 
                                alt='img-modal'
                                className='chef-img'
                            />
                        </div>
                        <div className='pt-2 d-flex justify-content-end'>
                        {
                            item.likes && item.likes.map((person, index) => 
                                <p key={index}>{person}</p>
                            )
                        }
                        </div>
                        <div className='d-flex align-items-center justify-content-end mx-3'>
                        {
                            updatedItem.likes && updatedItem.likes.filter((userName) => userName === userData.user).length >= 1 ?
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
                        <div className='d-flex align-items-center px-2'>
                            <Link 
                                className='text-decoration-none text-reset'
                                to={{
                                    pathname: `/${uId}/item/${item._id}`
                                }} 
                                >
                                <h4 
                                    className='display-1'
                                    style={{
                                        fontSize:'5rem',
                                        // color:'#f53783',
                                    }}
                                >{item.title}</h4>
                            </Link>
                            <h4 
                                className='display-4 mx-2'
                                style={{
                                    marginBottom:'3.5rem',
                                    fontSize:'2.5rem'
                                }}
                            >
                                ${item.price}
                            </h4>
                        </div>
                        <div className='pt-3 pb-2 px-2 d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Icon 
                                    icon='ls:cookpad' 
                                    style={{
                                        fontSize:"2rem",
                                        marginBottom:"9px",
                                    }}
                                />
                                <p className='px-1'>{chefName || findChef(item.chef)}</p>
                            </div>
                            <p className='text-muted'>{item.timeDuration}</p>
                        </div>
                        <p className='pb-1 px-2'>{item.description}</p> 
                        <ItemModalBtn 
                            item={item} 
                            getUser={() => props.getUser()}
                            onClose={props.onClose}
                        />
                    </div>        
                </div>
            </div>
        </>
    )
}


