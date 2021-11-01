import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
//COMPONENTS
import NewItem from '../components/NewItem';
import SideNavbar from '../components/SideNavbar';
//BOOTSTRAP
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//ICONS
import { Icon } from '@iconify/react';
import {IoArrowBackCircleOutline} from 'react-icons/io5';
//CONTEXT API
// import { useChefAPI } from '../context/ChefContext';



export default function Chef (props) {
    // const { chefData } = useChefAPI();
    const {uId} = useParams()
    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [chefData, setData] = useState([])


    //FETCH - CHEF data
    const getChef = async (data) => {
        try{
            const chef = await fetch(`http://localhost:9999/${uId}/chef/ID`)
            const parsedChef = await chef.json()
            setData(parsedChef)
        } catch (err) {
            console.log(err)
        };
    };


    console.log("chefData:", chefData)

    //CHEF INFO:
    // let matchUser = chefData.filter(chef => chef.user === uId)
    // console.log("matchUser:",matchUser)
    // let chefIdArr = matchUser.map(chef => chef._id)
    // let chefId = chefIdArr.toString()

    // let chefObj = matchUser[0]
    // console.log("chefObj:",chefObj)

    //FETCH Chef
    // const [uChef, setChef] = useState([])

    // const getChef = async () => {
    //     try{
    //         const chef = await fetch(
    //             `http://localhost:9999/${uId}/chef/${chefId}`
    //         )
    //         const parsedChef = await chef.json()
    //         setChef(parsedChef)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // console.log("uChef:",uChef)

    //FETCH Orders
    const [chefOrderData, setChefOrderData] = useState([])

    const getChefOrders = async () => {
        try{
            const chefOrders = await fetch(
                `http://localhost:9999/${uId}/chef/order`
            );
            const parsedChefOrders = await chefOrders.json();
            setChefOrderData(parsedChefOrders);
    
        } catch (err) {
            console.log(err);
        }
    }


    //UPDATE Chef
    // const bioArr = matchUser.map(chef => chef.bio)
    // const bio = bioArr.toString()

    // const availabilityArr = matchUser.map(chef => chef.availability)
    // const availability = availabilityArr.toString()

    // const imageArr = matchUser.map(chef => chef.image)
    // const image = imageArr.toString()

    // const nameArr = matchUser.map(chef => chef.name)
    // const name = nameArr.toString()

    // const phoneArr = matchUser.map(chef => chef.phone)
    // const phone = phoneArr.toString()

    // const initialState = {
    //     address:{
    //         street:"",
    //         city:"",
    //         state:"",
    //         zip:""
    //     },
    //     availability: availability,
    //     bio: bio,
    //     image:image,
    //     name:name,
    //     phone:phone
    // }

    // const [input, setInput] = useState(initialState)



    useEffect(()=> {
        getChef();
        console.log("chefData(ufx):",chefData)
        // getChef();
        // console.log("uChef(ufx):",uChef)
        getChefOrders();
        console.log("chefOrderData(ufx):",chefOrderData)
        // eslint-disable-next-line       
    }, [])
    
    return (
        <>
            <SideNavbar uId={uId} />
            <div className='chef_page container pt-5'>
                <a 
                    href={`/${uId}/feed`}
                    id='goBack'
                    className='text-decoration-none'
                    >
                    <IoArrowBackCircleOutline 
                        id='goBack' 
                        className='text-decoration-none'>
                    </IoArrowBackCircleOutline>
                </a>
                <div className='row pt-5 pb-5'>
                    {/* CHEF INFO */}
                    <div className='col-lg-8'>
                  
                                <div className='container'>
                                    <div className='row pt-5 pb-4 pb-5'>
                                        <div className='col-sm-3'>
                                            <div className='container'>
                                                <img
                                                    src={chefData.image}
                                                    alt='profile'
                                                    className='profile-circle border circle d-flex align-item-center justify-content-center'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-9'>
                                            <h4 className='border-bottom pb-2'>{chefData.name}</h4>
                                            <div className='row pt-2'>
                                                <div className='col-md-4'>
                                                    <h6>Hours:</h6>
                                                    <p>{chefData.availability}</p>
                                                </div>
                                                <div className='col-md-4 d-flex align-item-center justify-content-center'>
                                                    <h6>Contact:</h6>
                                                    <p className='mx-1'>{chefData.phone}</p>
                                                </div>
                                                <div className='col-md-4 d-flex align-item-center justify-content-center'>
                                                    <h6>Rating:</h6>
                                                    <p className='mx-1'>{chefData.rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row pb-5 pt-2'>
                                        <div className='col-sm-1'>
                                        </div>
                                        <div className='col-md-10 border-bottom pb-5'>
                                            <h5>Bio:</h5>
                                            <div className='row'>
                                                <p>{chefData.bio}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-1'>
                                        </div>
                                    </div>
                                    {/* ORDERS */}
                                    <div className='row pt-3'>
                                        <h4>Orders</h4>
                                    </div>
                                    <div className='container d-flex justify-content-center pt-5 pb-5'>
                                      
                                    </div>
                                    <br/>
                                </div>
                         
                      
                    </div>
                    {/* ITEMS */}
                    <div className='col-lg-4 pt-5 pb-5'>
                        <div className='row'>
                            <Button variant="success" onClick={handleShow}>
                                Add new Item
                            </Button>
                            <Modal
                                animation={false}
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header>
                                    <Modal.Title>List Item</Modal.Title>
                                    <Button variant="danger" onClick={handleClose}>X</Button>
                                </Modal.Header>
                                <Modal.Body>
                                    <NewItem cId={chefData._id} getChef={getChef} history={props.history} />
                                </Modal.Body>
                            </Modal>
                        </div>
                        <div className='row pt-2'>
                            {chefData.items && chefData.items.map(item => 
                                <>  
                                     <div className='col-md-12 pt-3 pb-3'>
                                         <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className='row'>
                                                    <h5 className='pb-2'>{item.title}</h5>
                                                </div>
                                                <div className='row'>
                                                    <p className='text'>{item.description}</p>  
                                                </div>
                                                <div className='row'>
                                                    <p className='text'>${item.price}</p>  
                                                </div>
                                                <div className='row'>
                                                    <div className='col-sm-6'>
                                                        <p className='text'>Likes: {item.likes}</p>  
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <Link to={{
                                                            pathname: `/${uId}/chef/${item._id}/edit`,
                                                            state: {
                                                                item:item,
                                                                cId:chefData._id
                                                            }
                                                        }} 
                                                        className='text-decoration-none'>
                                                            <Icon 
                                                                icon="clarity:note-edit-line" 
                                                                className='icon-list' 
                                                                id='edit'/>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <img 
                                                    src={item.image} 
                                                    alt='img'
                                                    className='chef-img'
                                                />
                                            </div>
                                         </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}