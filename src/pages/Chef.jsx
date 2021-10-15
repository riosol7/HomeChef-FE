import React, {useState, useEffect} from 'react';
import {getUserToken} from '../utils/authToken'
import NewItem from '../components/NewItem';
import { useParams, Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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

    return (
        <>
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
            <p className='p-3'>Don't wanna cook?<Link to={`/${uId}/feed`} className='text-decoration-none'> Home</Link></p>
        </>
    )
}