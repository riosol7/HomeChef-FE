import React from 'react'
import { Link } from "react-router-dom";
import CartModalBtn from "../../components/Feed/CartModalBtn"

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'50rem',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '25px',
    zIndex: 1
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex:1
}

export default function ItemModal({ open, onClose, item, uId, getUser }) {
    if(!open) return null

    return (
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                <button onClick={onClose}>Close Modal</button>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='container pt-2 pb-2'>
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
                        <div className='col-lg-6'>
                            <div className='pb-1 border-bottom d-flex align-items-center justify-content-between'>
                                <Link 
                                    to={{
                                        pathname: `/${uId}/item/${item._id}`
                                    }} 
                                    >
                                    <h4>{item.title}</h4>
                                </Link>
                                <h5>${item.price}</h5>
                            </div>
                            <div className='container pt-2 pb-2'>
                                <p>{item.description}</p> 
                            </div>
                            <div className='pt-2 pb-2'>
                                <CartModalBtn 
                                    item={item} 
                                    getUser={getUser}
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


