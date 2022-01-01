import React from 'react'
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';


export default function ChefsList(props) {
    const uId = props.uId
    const chefsData = props.chefsData

    return (
        <>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                    <Icon 
                        icon='ls:cookpad' 
                        style={{
                            fontSize:"2rem",
                            marginBottom:'8px',
                        }}
                    />
                    <h2 className='px-2'>Chefs</h2>
                </div>
                <p><u>See More</u></p>
            </div>
            <div className='row pb-5 pt-2'>
            {
                chefsData && chefsData.map((chef,idx) => (
                    <div key={idx} className='col-md-3'>
                        <Link 
                            to={`/${uId}/chef/${chef._id}`} 
                            className="text-decoration-none text-reset"
                        >
                            <img
                                src={chef.image}
                                alt='chefImage'
                                style={{
                                    maxWidth:'100%'
                                }}
                            />
                            <div className='pt-2 d-flex align-items-center justify-content-between'>
                                <h5>{chef.name}</h5>
                                <p 
                                    style={{
                                        background:'#6b6373', 
                                        color:'white',
                                        borderRadius:'50%',
                                        width:'1.5rem',
                                        textAlign:'center'
                                    }}
                                    >
                                    {chef.rating}
                                </p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <Icon
                                    icon='healthicons:i-schedule-school-date-time'
                                    style={{
                                        fontSize:'2rem',
                                        marginBottom:'8px',
                                    }}
                                />
                                <p>{chef.availability}</p>
                            </div>
                        </Link>
                    </div>
                ))
            }
            </div>
        </>
    )
}

