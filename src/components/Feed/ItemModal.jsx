import React from 'react'
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

export default function ItemModal({ open, onClose, item, uId, getUser, chefsData }) {
    if(!open) return null

    const findChef = (id) => {
        const matchId = chefsData.filter(chef => chef._id === id)
        if(matchId[0] !== undefined){
            return matchId[0].name
        }
        return
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
                        onClick={onClose}
                    />
                <div className='container pt-4 pb-2'>
                    <div className='row'>
                        <div className='container pt-2 pb-2 d-flex justify-content-center'>
                            <img
                                src={item.image} 
                                alt='img-modal'
                                className='chef-img'
                            />
                        </div>
                        <div>
                            <p>Like:{item.likes}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='pb-1 border-bottom d-flex align-items-center justify-content-between'>
                            <Link 
                                className='text-decoration-none'
                                to={{
                                    pathname: `/${uId}/item/${item._id}`
                                }} 
                                >
                                <h4 
                                    style={{
                                        fontSize:'5rem'
                                    }}
                                >{item.title}</h4>
                            </Link>
                            <h5>${item.price}</h5>
                        </div>
                        <div className='container'>
                            <div className='pt-2 pb-2 d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <Icon icon='icon-park-outline:chef-hat-one' style={{fontSize:"1.5rem"}}/>
                                    <p className='pt-3 px-1'>{findChef(item.chef)}</p>
                                </div>
                                <p className='text-muted'>{item.timeDuration}</p>
                            </div>
                            <div className='pt-2 pb-2'>
                                <p>{item.description}</p> 
                            </div>
                            <div className='pt-2 pb-2'>
                                <ItemModalBtn 
                                    item={item} 
                                    getUser={getUser}
                                    onClose={onClose}
                                />
                            </div>
                        </div>
                    </div>
                </div>        
                </div>
            </div>
        </>
    )
}


