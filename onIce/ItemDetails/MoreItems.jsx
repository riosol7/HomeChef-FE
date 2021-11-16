import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

export default function MoreItems(props) {
    const {uId} = useParams()
    const itemId = props.itemId


    const [chef, setChef] = useState({})

    const getChefByItem = async (e) => {
        try {
            const foundChef =  await fetch(`http://localhost:9999/${uId}/chef/item/${e ||itemId}`)
            const parsedChef = await foundChef.json()
            setChef(parsedChef)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getChefByItem()
        // eslint-disable-next-line 
    }, [])

    const filterItems = chef.items && chef.items.filter(item => item._id !== itemId)


    const handleClick = (e) => {
        getChefByItem(e)
        window.location.reload()
    }

    return (
        <>
            <div className='row'>
            {filterItems && filterItems.map(item => (
                    <div key={item._id} className='col-lg-2 px-3'>
                        <div className='row'>
                            <div className='container'>
                                
                                    <Link 
                                        to={{
                                            pathname: `/${uId}/item/${item._id}`,
                                            // state: {
                                            //     itemId:item._id
                                            // }
                                        }} 
                                        >
                                            <button onClick={() => handleClick(itemId)}>
                                        <img
                                            src={item.image}
                                            alt='otherChefItemImg'
                                            className='chef-img'
                                        />
                                              </button>
                                    </Link>
                          
                            </div>
                        </div>
                        <div className='row'>
                            <h6>{item.title}</h6> 
                            <p className='d-flex justify-content-end'>{item.price}</p>
                            <div className='container'>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
            ))}
            </div>
        </>
    )

}
