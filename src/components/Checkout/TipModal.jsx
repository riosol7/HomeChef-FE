import React from 'react';
import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '35%',
    left: '50%',
    width:'20rem',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '4px',
    color:'black',
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

export default function TipModal({ open ,children, onClose }) {
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
                <h2 className='pt-3 pb-2' style={{color:'black'}}>Enter Amount</h2>
                    {children}
                </div>
            </div>
        </>
    )
}