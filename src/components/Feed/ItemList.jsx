import React, { useState } from 'react'
import { useParams, Link } from "react-router-dom";

//COMPONENTS
import ItemModal from "../../components/Feed/ItemModal";

//BOOTSTRAP
import Spinner from 'react-bootstrap/Spinner';

import { Icon } from '@iconify/react';

export default function ItemList(props) {
    const {uId} = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [item, setItem] = useState({})
    const chefsData = props.chefsData
    const itemData = props.itemData
    const isLoading = props.isLoading
    const searchResult = props.searchResult
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
            <div className='col-md-9 container food_items p-5 pt-2'>
                <div className='d-flex align-items-center'>
                    <Icon 
                        icon='whh:restaurantmenu' 
                        style={{
                            fontSize:"2rem", 
                            marginBottom:'6px'
                        }}
                    />
                    <h4 className='px-2'>All items</h4>
                </div>
                <div className='row'>
                    { 
                        isLoading ? (
                            <Spinner 
                                animation='border'
                                variant='info'
                            /> 
                        ):( 
                            searchResult.length >= 1 ?
                            searchResult.map(result => (
                                <div key={result._id} className='col-md-3 pb-5 p-3'>
                                <div className='container'> 
                                <img 
                                        src={result.image} 
                                        alt='img'
                                        className='chef-img'
                                    />
                                </div>
                                <div className='pt-2 border-top d-flex justify-content-between'>
                                    <h4>
                                        <Link 
                                            to={`/${uId}/item/${result._id}`}
                                            className="text-decoration-none"
                                        > 
                                            {result.title}
                                        </Link>
                                    </h4>
                                    <p className='text-muted'>{result.timeDuration}</p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <Icon 
                                        icon='ls:cookpad' 
                                        style={{
                                            fontSize:"1.5rem",
                                            marginBottom:"9px",
                                        }}
                                    />
                                    <p className='px-1'>{findChef(result.chef)}</p>
                                </div>
                                <p className='text'>{result.description}</p>  
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h5>${result.price}</h5>
                                    <Icon 
                                        icon="akar-icons:circle-plus-fill" 
                                        style={{fontSize: "2.5rem"}}
                                        onClick={() => viewOptionsClick(result)}    
                                    />
                                </div>         
                            </div>
                            ))
                            :
                        itemData && itemData.map((item, idx) => (
                            <div key={idx} className='col-md-3 pb-5 p-3'>
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
                                    <p className='text-muted'>{item.timeDuration}</p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <Icon 
                                        icon='ls:cookpad' 
                                        style={{
                                            fontSize:"1.5rem",
                                            marginBottom:"9px",
                                        }}
                                    />
                                    <p className='px-1'>{findChef(item.chef)}</p>
                                </div>
                                <p className='text'>{item.description}</p>  
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h5>${item.price}</h5>
                                    <Icon 
                                        icon="akar-icons:circle-plus-fill" 
                                        style={{fontSize: "2.5rem"}}
                                        onClick={() => viewOptionsClick(item)}    
                                    />
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
                        userData={props.userData}
                        chefsData={chefsData}
                        getItems={props.getItems}
                    />  
                </div>
            </div>
        </>
    )
}
