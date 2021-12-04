import React, { useState } from 'react'
import { useParams, Link } from "react-router-dom";

//COMPONENTS
import Cart from "../../components/Feed/Cart";
import ItemModal from "../../components/Feed/ItemModal";

//CONTEXT
import { useItemAPI } from "../../context/ItemContext";
//BOOTSTRAP
import Spinner from 'react-bootstrap/Spinner';

export default function ItemList(props) {
    const {uId} = useParams()
    const { itemData, isLoading } = useItemAPI()
    const [isOpen, setIsOpen] = useState(false)
    const [item, setItem] = useState({})

    console.log("item:",item)

    const viewOptionsClick = (data) => {
        setIsOpen(true)
        console.log("data:",data)
        setItem(data)
    }

    const closeModal = () => {
        setIsOpen(false)
        setItem({})
    }

    return (
        <>
        <div className='col-md-1'></div>
        <div className='col-md-8 container food_items p-5'>
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
                        <div key={item._id} className='col-md-4 pb-5'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-sm-6'>
                                    <img 
                                        src={item.image} 
                                        alt='img'
                                        className='chef-img'
                                    />
                                </div>
                                <div className='col-sm-6'>
                                    <div className='row pt-3'>
                                        <h4 
                                            className="pb-2 border-bottom"
                                        >
                                            <Link 
                                                to={{
                                                    pathname: `/${uId}/item/${item._id}`
                                                }}
                                            > 
                                                {item.title}
                                            </Link>
                                        </h4>
                                    </div>
                                    <div className='row'>
                                        <p className='text'>{item.description}</p> 
                                        <p
                                            onClick={() => viewOptionsClick(item)}
                                        >
                                            view
                                        </p>   
                                    </div>
                                    <div className='row d-flex align-items-center'>
                                        <p>${item.price}</p>
                                        <Cart 
                                            itemId={item._id} 
                                            history={props.history} 
                                            getUser={props.getUser}
                                        />
                                    </div>
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
                />  
            </div>
        </div>
        </>
    )
}
