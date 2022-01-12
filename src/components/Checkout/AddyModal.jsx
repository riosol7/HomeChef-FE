import React from 'react'
import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '40%',
    left: '50%',
    width:'30rem',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '10px',
    zIndex: 1
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex:1
}


export default function AddyModal({ open ,children, onClose }) {
 
    if(!open) return null

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
            <h2 className='pt-2 pb-2'>Saved</h2>
                {children}
            </div>
        </div>
    </>
    )
}
