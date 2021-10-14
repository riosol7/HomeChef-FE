import React from 'react';
import NewItem from '../components/NewItem';

export default function Chef (props) {
    return (
        <>
            <NewItem />
            <button onClick={()=>props.history.goBack()}>Go Back</button>
        </>
    )
}