import React, { useState } from 'react'
import { useParams, Link } from "react-router-dom";

//COMPONENTS
import ItemModal from "../../components/Feed/ItemModal";

//CONTEXT
import { useItemAPI } from "../../context/ItemContext";
//BOOTSTRAP
import Spinner from 'react-bootstrap/Spinner';
import { Icon } from '@iconify/react';

export default function ItemList(props) {
    const {uId} = useParams()
    const { itemData, isLoading } = useItemAPI()
    const [isOpen, setIsOpen] = useState(false)
    const [item, setItem] = useState({})
    const chefsData = props.chefsData

    // console.log("item:",item)

    const viewOptionsClick = (data) => {
        setIsOpen(true)
        setItem(data)
    }

    const closeModal = () => {
        setIsOpen(false)
        setItem({})
    }

    const findChef = (id) => {
        const matchId = chefsData.filter(chef => chef._id === id)
        if(matchId[0] !== undefined){
            return matchId[0].name
        }
        return
    }

    return (
        <>
        <div className='col-md-1'></div>
        <div className='col-md-8 container food_items p-5'>
            <h4>All items</h4>
            <div className='row d-flex align-items-center'>
                { 
                    isLoading ? (
                        <> 
                            <Spinner 
                                animation='border' 
                                className='d-flex justify-content-center' 
                                variant='info'
                            /> 
                        </>
                    ):(
                    itemData && itemData.map((item, idx) => (
                        <div key={item._id} className='col-md-3 pb-5 p-3'>
                            <div className='container'> 
                              <img 
                                    src={item.image} 
                                    alt='img'
                                    className='chef-img'
                                />
                            </div>
                            <div className='pt-2 border-top d-flex justify-content-between'>
                                <h4>
                                    <Link 
                                        to={`/${uId}/item/${item._id}`}
                                        className="text-decoration-none"
                                    > 
                                        {item.title}
                                    </Link>
                                </h4>
                                <p>{item.timeDuration}</p>
                            </div>
                            <div className='container'>
                                <p>By: {findChef(item.chef)}</p>
                                <p className='text'>{item.description}</p>  
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h5>${item.price}</h5>
                                    <Icon 
                                        icon="akar-icons:circle-plus" 
                                        style={{fontSize: "2.5rem"}}
                                        onClick={() => viewOptionsClick(item)}    
                                    />
                                </div>
                                       
                            </div>     
                        </div>
                    ))
                )}
                <ItemModal 
                    open={isOpen} 
                    onClose={() => closeModal()}
                    item={item}
                    uId={uId}
                    getUser={props.getUser}
                    history={props.history} 
                    chefsData={chefsData}
                />  
            </div>
        </div>
        </>
    )
}
