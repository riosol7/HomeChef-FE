import React, {useState, useEffect} from 'react';
import {getUserToken} from '../utils/authToken'
import NewItem from '../components/NewItem';
import SideNavbar from '../components/SideNavbar';
import { useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {IoArrowBackCircleOutline} from 'react-icons/io5'

export default function Chef (props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {uId} = useParams()
    const [list, setList] = useState([{
        id:'',
        user:''
    }])
    
    //FETCH all chefs data
    const getChef = async (data) => {
        try{
            const config = {
                method:"GET",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`bearer ${getUserToken()}`
                }
            };
            const chefs = await fetch(`http://localhost:9999/${uId}/chef`, config)
            const parsedChefs = await chefs.json()
            setList(parsedChefs)
        } catch (err) {
            console.log(err)
        };
    };

    useEffect(() => {    
        getChef();// eslint-disable-next-line
    },[])

    let matchUser = list.filter(chef => chef.user === uId)

    return (
        <>
            <SideNavbar uId={uId} />
            <div className='container pt-5 pb-5'>
            <IoArrowBackCircleOutline onClick={()=>props.history.goBack()} id='goBack' className='text-decoration-none'></IoArrowBackCircleOutline>
                <div className='row pt-5 pb-5'>
                    <div className='col-lg-8'>
                    {
                        matchUser.map((chef) => (
                            <>
                                <div className='container border border-primary rounded'>
                                    <div className='row pt-3'>
                                        <h4>{chef.name}'s orders</h4>
                                    </div>
                                    <br/>
                                </div>
                            </>
                        ))
                    }
                    </div>
                    <div className='col-lg-4'>
                        <Button variant="primary" onClick={handleShow}>
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
                                <NewItem list={list} history={props.history} />
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}