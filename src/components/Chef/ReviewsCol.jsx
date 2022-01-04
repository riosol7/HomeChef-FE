import React from 'react'
import { Icon } from '@iconify/react';

export default function ReviewsCol(props) {
    return (
        <div className='pt-5'>
      
            <div className='d-flex justify-content-between'>
            <h5 
                className='display-1'
                style={{
                    fontSize:'2rem'
                }}    
            >Reviews</h5>
             <div
                className='d-flex align-items-center justify-content-center'
                style={{
                    background:'#f4f6f8',
                    borderRadius:'12px',
                    width:'4rem',
                    height:'4rem',
                }}
            >
                <Icon
                    icon='bi:arrow-right'
                    style={{
                        fontSize:'2rem',

                    }}
                />
            </div>
            </div>

        </div>
    )
}
