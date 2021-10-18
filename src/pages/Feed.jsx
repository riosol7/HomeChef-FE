import React, {useState } from "react";
import { useParams } from "react-router-dom";
import { getUserToken } from "../utils/authToken";
//COMPONENTS
import SideNavbar from "../components/SideNavbar"
//CONTEXT
import { useItemAPI } from "../context/ItemContext";
//REACT ICONS
import { AiOutlineShoppingCart } from "react-icons/ai"
//ICONIFY
import { Icon } from '@iconify/react';
//BOOTSTRAP
import Spinner from 'react-bootstrap/Spinner'

export default function Feed (props) {
    const { data, isLoading } = useItemAPI()
    const {uId} = useParams()
 
    const [input, setInput] = useState({
        itemId: "",
        qty:0
    })
    
    //FETCH - USER cart, post item to user's cart -TBD
    const postCart = async (data) => {
        try{
            const config = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${getUserToken()}`,
                }
            };// eslint-disable-next-line
            const addToCart = await fetch(`http://localhost:9999/${uId}`, config)
            props.history.push(`/${uId}/feed`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleAddToCart = (e) => {
        console.log(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        postCart(input)
    }

    const tags = data.map((item) => item.tags)

    let b = []
    let len = tags.length
    
    for(let i = 0; i < len; i ++){
        if(b.indexOf(tags[i]) === -1 ){
            b.push(tags[i])
        }
    }
    const filtered = b.filter((e)=>{
        return e !== undefined
    })

    console.log('data',filtered)
 
    return (
        <>
            <SideNavbar uId={uId} />
            {/* POST BAR */}
            <div className='pb-3 pt-5 m-5'>
                <div className='row'>
                    <div className='col-sm-1'>
                        {/* LEAVE EMPTY */}
                    </div>
                        <div className='col-lg-10'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <a 
                                        href={`/${uId}/chef`}   
                                    >
                                    <img 
                                        src="https://i.pinimg.com/originals/23/cc/52/23cc5291fa261322336a405e45fc0cf7.gif"
                                        alt='post'
                                        className='post'
                                        id='cook' 
                                    />
                                    </a>    
                                </div> 
                                <div className='col-md-3 '>
                                    <img 
                                        src="https://wallpaperaccess.com/full/6221127.jpg"
                                        alt='post'
                                        className='post'
                                        id='delivery'
                                    />
                                </div> 
                                <div className='col-md-3 '>
                                    <a 
                                        href={`/${uId}/newChef`}
                                        alt='profile'
                                    >
                                    <img 
                                        src="https://i.pinimg.com/originals/9e/65/0e/9e650eec5e16ec899c75ce363ec66061.gif"
                                        alt='post'
                                        className='post'
                                        id='profile'
                                    /></a>
                                </div> 
                                <div className='col-md-3 '>
                                    <img 
                                        src="https://cdn.dribbble.com/users/992181/screenshots/5378811/cart.gif"
                                        alt='post'
                                        className='post'
                                        id='cart'
                                    />
                                </div> 
                            </div>
                        </div>
                    <div className='col-sm-1'>
                        {/* LEAVE EMPTY */}
                    </div>
                </div>    
            </div>
            <div className='container'>
                {/* TAG BAR */}
                <div className='row pt-5 pb-5 tag_bar'>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="noto-v1:wine-glass" className='icon-list' id='alcohol'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Alcohol</h6>
                        </div>
                    </div>      
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="map:bakery" className='icon-list' id='bakery'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Bakery</h6>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="twemoji:bubble-tea" className='icon-list' id='boba'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Boba</h6>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="fxemoji:hamburger" className='icon-list mx-1' id='burger'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Burger</h6>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="whh:chickenalt" className='icon-list' id='chicken'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Chicken</h6>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="noto:ice-cream" className='icon-list' id='dessert'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Dessert</h6>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="noto:tropical-drink" className='icon-list' id='drink'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Drink</h6>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="emojione:curry-rice" className='icon-list' id='japanese'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Japanese</h6>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="noto:taco" className='icon-list' id='mexican'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Mexican</h6>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="noto:pizza" className='icon-list' id='pizza'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Pizza</h6>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="emojione:sushi" className='icon-list' id='sushi'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Sushi</h6>
                        </div>
                    </div> 
                    <div className='col-sm-1'>
                        <div className='row'>
                            <div className='circle container d-flex justify-content-center align-items-center'>
                                <Icon icon="noto:teacup-without-handle" className='icon-list' id='tea'/>
                            </div>
                        </div>
                        <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                            <h6>Tea</h6>
                        </div>
                    </div>    
                </div>
                <br/>
                <div className='row'>
                    {/* CHEF ITEMS */}
                    <div className='col-md-8 container food_items p-5'>
                        <div className='row d-flex align-items-center'>
                            { isLoading ? (<> <Spinner animation='border' className='d-flex justify-content-center' variant='info'/> </>):(
                                data && data.map((item) => (
                                    <div key={item._id} className='col-md-5 m-4'>
                                        <div className='row d-flex align-items-center'>
                                            <div className='col-sm-6'>
                                                <img 
                                                    src={item.image} 
                                                    alt='img'
                                                    className='chef-img'
                                                />
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className='row'>
                                                    <h5 className="pb-2 border-bottom">{item.title}</h5>
                                                </div>
                                                <div className='row'>
                                                    <p className='text'>{item.description}</p>           
                                                </div>
                                                <div className='row d-flex align-items-center'>
                                                    <div className='col-sm-6 d-flex justify-content-center'>
                                                        <p>${item.price}</p>
                                                    </div>
                                                    <div className='col-sm-6 d-flex justify-content-center'>
                                                        <input
                                                            id='qty'
                                                            // name="qty"
                                                            type="Number"
                                                            value={input.qty}
                                                            onChange={handleChange}
                                                        ></input>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col d-flex justify-content-start'>
                                                            <button className='cartBtn'>
                                                                <AiOutlineShoppingCart  
                                                                    id='cart'
                                                                    onClick={() => handleAddToCart(item._id)}
                                                                    onChange={handleChange}
                                                                    onSubmit={handleSubmit}
                                                                ></AiOutlineShoppingCart>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>            
                                        </div>     
                                    </div>
                                ))
                            )}   
                        </div>
                    </div>
                    {/* SIDEBAR  */}
                    <div className='col-md-4 container'>
                        {/* <div className='row pt-5 pb-5'>
                            <div className='col'>
                                <h5> Rating: </h5>
                                <div className='rating'>
                                 
                                </div>
                            </div>    
                        </div> */}
                        <div className='row pt-5 pb-3'>
                            <h5 className='pt-2 pb-3'> Project: </h5>
                            <div className='col-sm-4 d-flex align-item-center justify-content-center'>
                                <a
                                    href="https://github.com/riosol7/HomeChef-FE"
                                    className='text-decoration-none'
                                    id='github'
                                > Front-
                                <Icon 
                                    icon="akar-icons:github-outline-fill" 
                                    className='icon-list'   
                                />
                                -End
                                </a>
                            </div>
                            <div className='col-sm-4 d-flex align-item-center'>
                                <a
                                    href="https://github.com/riosol7/HomeChef-BE"
                                    className='text-decoration-none'
                                    id='github'
                                > Back-
                                <Icon 
                                    icon="akar-icons:github-outline-fill" 
                                    className='icon-list' 
                                />
                                -End 
                                </a>
                            </div>      
                        </div>
                        <div className='row pt-5 pb-5'>
                            <div className='col'>
                                <h5> Tags: </h5>
                                <div className='row pt-3'>
                                    { 
                                        filtered.map((tag) => (
                                            <div className='col-sm-3 d-flex justify-content-center'>
                                                <div className='tags'>
                                                    {tag}
                                                </div>
                                            </div>
                                        )) 
                                    }
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}