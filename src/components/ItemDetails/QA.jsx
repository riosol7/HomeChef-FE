import React from 'react'
import { Icon } from '@iconify/react';

function QA() {
    return (
        <div className='d-flex align-items-center'>
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
    )
}

export default QA
