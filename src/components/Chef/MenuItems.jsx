import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import ItemModal from "../../components/Feed/ItemModal";

export default function MenuItems(props) {
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
        infinite: true,
        dots: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        slidesPerShow:4,
        rows:4,
    }

    return (
        <>
            <div className='col-lg-12'>
            <Slider {...settings}>
                {
                    chefData.items && chefData.items.map((item, idx) => 
                        <div 
                            key={idx} 
                            className='col-lg-4 p-5'
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
