import React from 'react'
import SideNavbar from '../components/SideNavbar'
import { useParams } from 'react-router-dom'
import { useChefAPI } from '../context/ChefContext'

export default function Profile (props) {
    const { chefData } = useChefAPI();
    const {uId} = useParams()
    console.log(chefData.filter(chef => chef.user === uId))
    return(
        <>
            <SideNavbar uId={uId} />
            
        </>
    )
}