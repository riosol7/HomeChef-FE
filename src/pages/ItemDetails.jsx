import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SideNavbar from '../components/SideNavbar'

export default function ItemDetails (props) {
    const {uId} = useParams()
    const itemId = props.match.params.id 
  
    //GET ITEM DETAIL
    const [item, setItem] = useState({})

    const getItem = async () => {
        try{
            const fetchItem = await fetch(`http://localhost:9999/${uId}/item/${itemId}`)
            const parsedItem = await fetchItem.json()
            setItem(parsedItem)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getItem()
        // eslint-disable-next-line   
    }, [])

    console.log('getItem:', item)

    return (
        <>
            <SideNavbar />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-1'>
                    </div>
                    <div className='col-lg-11'>
                        <div className='row'>
                            <div className='col-lg-9'>
                                <h4>{item.title}</h4>
                                <div className='row'>
                                    <div className='container'>
                                        <img
                                            src={item.image}
                                            alt='item-detail-img'
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='container'>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-1'>

                    </div>
                    <div className='col-lg-10'>
                        
                    </div>
                    <div className='col-lg-1'>
                        
                    </div>
                </div>
            </div>
        </>
    )
}