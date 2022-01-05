import React from 'react'
import foodgif from "../../assets/foodgif.gif";

export default function Ad(props) {
    return (
    
        <div 
            className=''
            style={{
                // height:'12rem',
                borderRadius:'12px'
            }}
        >
            <img
                src={foodgif}
                alt='food'
                style={{
                    width:'100%',
                    borderRadius:'12px'
                }}
            />   
        </div>
    )
}
