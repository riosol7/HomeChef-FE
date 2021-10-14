import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { getUserToken } from "../utils/authToken";
import { AiOutlineShoppingCart } from "react-icons/ai"

export default function Feed () {
    const {uId} = useParams()
    const [list, setList] = useState([])

    const getItems = async () => {
        try{
            const config = {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `bearer ${getUserToken()}`
                }
            };
            const items = await fetch(`http://localhost:9999/${uId}/item`, config)
            const parsedItems = await items.json()
            setList(parsedItems)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getItems()
    // eslint-disable-next-line  
    }, [])


    return (
        <>
            <div className='container'>
                <div className='row'>
                    {
                        list && list.map((item) => (
                            <div key={item._id} className='col-sm-4 border border-primary'>
                                <div className='row border border-primary'>
                                    {item.image}
                                </div>
                                <div className='row'>
                                    <h5>{item.title}</h5>
                                </div>
                                <div className='row'>
                                    <p className='text'>{item.description}</p>           
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <p>${item.price}</p>
                                    </div>
                                    <div className='col-sm-6 d-flex justify-content-end'>
                                        <AiOutlineShoppingCart id='cart'></AiOutlineShoppingCart>
                                    </div>
                                </div>
                            </div>
                        ))
                    }   
                </div>
            </div>  
            <div>
                <Link to={`/${uId}/chef`}>Start cooking?</Link>
                <Link to={`/${uId}/newChef`}>Create a Chef Account</Link>
            </div>
        </>
    )
}