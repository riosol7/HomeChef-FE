import React from 'react'

const MODAL_STYLES = {
    position: 'fixed',
    top: '6.55%',
    left: '71.4%',
    width: '32rem',
    backgroundColor: '#FFF',
    padding:20,
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

export default function CartModal({ open ,children, onClose }) {
    if(!open) return null
    return (
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <button onClick={onClose}>Close Modal</button>
                    {children}
                </div>
            </div>
        </>
    )
}


