import React from 'react';
import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    // width:'38rem',
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex:1
}

export default function NewItemModal({ open ,children, onClose }) {
    if(!open) return null
    return (
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <Icon  
                        icon="ion:close-circle" 
                        style={{
                            fontSize:"3rem",
                            color:"",
                        }} 
                        onClick={onClose}/>
                    {children}       
                </div>
            </div>
        </>
    )
}