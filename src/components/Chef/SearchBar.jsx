import React from 'react'
import { Icon } from '@iconify/react';

export default function SearchBar(props) {
    const chefData = props.chefData
    return (
        <div className='d-flex justify-content-between pb-2 pt-2'>
            <h1 className='display-2'>{chefData.name}</h1>
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
                icon='akar-icons:search'
                style={{
                    fontSize:'2rem',

                }}
            />
            </div>
        </div>
    )
}
