import React from 'react'

function Modal({ closeModal }) {
    const [showModal, setShowModal] = useState(false)
    return (
        
        <button 
        onClick={()=> {setShowModal(true)}}
        className='openModalBtn'> 
            Sign in
    </button>
    {showModal && <Modal closeModal={setShowModal}/>}

        <div className='modal-background'>
            <div className='modal-Container'>
                <div className='titleCloseBtn'>
                    <button onClick={()=> closeModal(false)}>x</button>
                </div>
                <div className='modal-title'>
                    <h1>Sign in</h1>
                </div>
                <div className='modal-body'>
                    <p>form insert here</p>
                </div>
                <div className='modal-footer'>
                    <button onClick={()=> closeModal(false)}> cancel </button>
                    <button> login </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
