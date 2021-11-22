import React from 'react'
import { useParams, Link } from "react-router-dom";

//COMPONENTS
import Cart from "../components/Cart";
//CONTEXT
import { useItemAPI } from "../context/ItemContext";
//BOOTSTRAP
import Spinner from 'react-bootstrap/Spinner';

export default function ItemList(props) {
    const {uId} = useParams()
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
                                    <Link 
                                        to={{
                                            pathname: `/${uId}/item/${item._id}`,
                                            // state: {
                                            //     itemId:item._id
                                            // }
                                        }} 
                                        >
                                        <img 
                                            src={item.image} 
                                            alt='img'
                                            className='chef-img'
                                        />
                                    </Link>
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
                                        <Cart itemId={item._id} history={props.history} getUser={props.getUser}/>
                                    </div>
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
