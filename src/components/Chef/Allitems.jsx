import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import ItemModal from "../../components/Feed/ItemModal";

export default function Allitems(props) {
    const uId = props.uId
    const chefData = props.chefData
    const [isOpen, setIsOpen] = useState(false)
    const [item, setItem] = useState({})

    const viewItemModalClick = (data) => {
        setIsOpen(true)
        setItem(data)
    }

    const closeModal = () => {
        setIsOpen(false)
        setItem({})
    }

    const settings = {
        arrows:true,
        // className: "center",
        // centerMode: true,
        infinite: true,
        dots: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        slidesPerShow:3,
        
        rows:3,
    }

    return (
        <>
            <div className='d-flex justify-content-between'>
                <h5 
                    className='display-1 px-2'
                    style={{
                        fontSize:'2rem'
                    }}    
                >All items</h5>
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
                    onClick={()=> props.clickMenu()}
                />
            </div>
            </div>
            <div className='row'>
            <Slider {...settings}>
                {
                    chefData.items && chefData.items.map((item, idx) => 
                        <div 
                            key={idx} 
                            className='col-lg-4 p-4'
                        >
                            <div>
                                <img
                                    src={item.image}
                                    alt='item_Img'
                                />
                                <Icon 
                                    icon="akar-icons:circle-plus-fill" 
                                    style={{fontSize: "2.5rem"}}
                                    onClick={() => viewItemModalClick(item)}    
                                />
                            </div>
                            <div className=''>  
                                 
                                    <h5 
                                        className='display-6'
                                        style={{
                                            fontSize:'2rem'
                                        }}    
                                    >{item.title}</h5>
                                    <p className='text text-muted'>{item.description}</p>
                                    <h4>${item.price}</h4>
                           
                            </div>
                        </div>
                    )
                }
            </Slider> 
            </div>
            <ItemModal 
                open={isOpen} 
                onClose={() => closeModal()}
                item={item}
                uId={uId}
                getUser={props.getUser}
                userData={props.userData}
                chefData={chefData}
                getItems={props.getChef}
                getCart={props.getCart}
            /> 
        </>
    )
}
