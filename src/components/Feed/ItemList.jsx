import React, { useState } from 'react'
import { useParams, Link } from "react-router-dom";

//COMPONENTS
import ItemModal from "../../components/Feed/ItemModal";


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
        if(matchId.length >= 1){
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
                    <spinner 
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
                        itemData && itemData.map((product, idx) => (
                            <div key={idx} className='col-md-3 pb-5 p-3'>
                                <div className='container'> 
                                    <img 
                                        src={product.image} 
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
                                            to={`/${uId}/item/${product._id}`}
                                            className="text-decoration-none text-reset"
                                            // style={{color:'#f53783'}}
                                        > 
                                            {product.title}
                                        </Link>
                                    </h4>
                                    <p className='text-muted'>{product.timeDuration}</p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <Icon 
                                        icon='ls:cookpad' 
                                        style={{
                                            fontSize:"1.5rem",
                                            marginBottom:"9px",
                                        }}
                                    />
                                   <a href={`/${uId}/chef/${product.chef}`} className='text-reset'>
                                        <p className='px-1'>{findChef(product.chef)}</p>
                                    </a>
                                </div>
                                <p className='text'>{product.description}</p>  
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h5>${product.price}</h5>
                                    <Icon 
                                        icon="akar-icons:circle-plus-fill" 
                                        style={{fontSize: "2.5rem"}}
                                        onClick={() => viewItemModalClick(product)}    
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
