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

    const viewItemModalClick = (data) => {
        setIsOpen(true)
        setItem(data)
        props.getItems()
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
            <div className='d-flex align-items-center'>
                {/* <Icon 
                    icon='whh:restaurantmenu' 
                    style={{
                        fontSize:"2rem", 
                        marginBottom:'6px'
                    }}
                /> */}
                <h5 
                    className='display-1 px-2'
                    style={{
                        fontSize:'2rem'
                    }}    
                >All items</h5>
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
                                    <h4   
                                        className='display-6'
                                        style={{
                                            fontSize:'2rem'
                                        }} 
                                    >
                                        <Link 
                                            to={`/${uId}/item/${result._id}`}
                                            className="text-decoration-none text-reset"
                                            // style={{color:'#f53783'}}
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
                                    <a href={`/${uId}/chef/${result.chef}`} className="text-decoration-none text-reset">
                                        <p className='px-1'>{findChef(result.chef)}</p>
                                    </a>
                                </div>
                                <p className='text'>{result.description}</p>  
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h5>${result.price}</h5>
                                    <Icon 
                                        icon="akar-icons:circle-plus-fill" 
                                        style={{fontSize: "2.5rem"}}
                                        onClick={() => viewItemModalClick(result)}    
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
                                    <h4   
                                        className='display-6'
                                        style={{
                                            fontSize:'2rem'
                                        }} 
                                    >
                                        <Link 
                                            to={`/${uId}/item/${item._id}`}
                                            className="text-decoration-none text-reset"
                                            // style={{color:'#f53783'}}
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
                                   <a href={`/${uId}/chef/${item.chef}`} className='text-reset'>
                                        <p className='px-1'>{findChef(item.chef)}</p>
                                    </a>
                                </div>
                                <p className='text'>{item.description}</p>  
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h5>${item.price}</h5>
                                    <Icon 
                                        icon="akar-icons:circle-plus-fill" 
                                        style={{fontSize: "2.5rem"}}
                                        onClick={() => viewItemModalClick(item)}    
                                    />
                                </div>         
                            </div>
                        )
                    )
                )
            }
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
        </>
    )
}
