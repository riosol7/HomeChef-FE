import React from 'react'
//COMPONENTS
import Cart from "../components/Cart";
import ItemDetails from "../components/ItemDetails"
//CONTEXT
import { useItemAPI } from "../context/ItemContext";
//BOOTSTRAP
import Spinner from 'react-bootstrap/Spinner';

export default function ItemList(props) {
    const { itemData, isLoading } = useItemAPI()

    

    return (
        <>
        <div className='col-md-1'></div>
        <div className='col-md-8 container food_items p-5'>
            <div className='row d-flex align-items-center'>
                { isLoading ? (<> <Spinner animation='border' className='d-flex justify-content-center' variant='info'/> </>):(
                    itemData && itemData.map((item) => (
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
                                        <h5 className="pb-2 border-bottom">{item.title}</h5>
                                    </div>
                                    <div className='row'>
                                        <p className='text'>{item.description}</p>           
                                    </div>
                                    <div className='row d-flex align-items-center'>
                                        <p>${item.price}</p>
                                        <Cart itemId={item._id} history={props.history}/>
                                    </div>
                                    <ItemDetails itemId={item._id}/>
                                </div>            
                            </div>     
                        </div>
                    ))
                )}   
            </div>
        </div>
        </>
    )
}
