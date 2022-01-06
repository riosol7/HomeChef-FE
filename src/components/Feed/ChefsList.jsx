import React from 'react'
import { Link } from "react-router-dom";
// import Slider from "react-slick"
import { Icon } from '@iconify/react';


export default function ChefsList(props) {
    const uId = props.uId
    const chefsData = props.chefsData

    // const setting = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    // }

    return (
        <>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                    {/* <Icon 
                        icon='ls:cookpad' 
                        style={{
                            fontSize:"2rem",
                            marginBottom:'8px',
                        }}
                    /> */}
                    <h5 
                        className='display-1 px-2'
                        style={{
                            fontSize:'2rem'
                        }}    
                    >Chefs</h5>
                </div>
                <p><u>See More</u></p>
            </div>
            <div className='row pb-5 pt-2 px-1'>
                {/* <Slider {...setting}> */}
                {
                    chefsData && chefsData.map((chef,idx) => (
                        <div key={idx} className='col-md-4'>
                            <Link 
                                to={`/${uId}/chef/${chef._id}`} 
                                className="text-decoration-none text-reset"
                            >
                                <div className=''>
                                    <img
                                        src={chef.image}
                                        alt='chefImage'
                                        style={{
                                            maxWidth:'100%'
                                        }}
                                    />
                                </div>
                                <div className='pt-2 d-flex align-items-center justify-content-between'>
                                    <h5
                                        className='display-6'
                                        style={{
                                            fontSize:'2rem'
                                        }} 
                                    >{chef.name}</h5>
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
                {/* </Slider> */}
            </div>
        </>
    )
}

