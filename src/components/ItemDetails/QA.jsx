import React from 'react'
import { Icon } from '@iconify/react';

export default function QA(props) {
    return (
        <div className='col-lg-3 pb-5 pt-3'>
            <div className='d-flex align-items-center pb-2 pt-2'>
                <Icon
                    icon='fluent:chat-bubbles-question-16-filled'
                    style={{
                        fontSize:'1.5rem',
                        position:'absolute',
                    }}
                />
                <input
                    type='text'
                    style={{
                        paddingLeft:'1.6rem',
                        width:'100%'
                    }}
                />
            </div>
        </div>
    )
}

