import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//COMPONENTS
import FeedNavbar from "../../components/Feed/FeedNavbar";
import IconBar from "../../components/Feed/IconBar";
import ItemList from "../../components/Feed/ItemList";
import SideBar from "../../components/Feed/SideBar";
import ChefsList from "../../components/Feed/ChefsList";
//CONTEXT
import { useChefsAPI } from "../../context/ChefsContext"

import cookGIF from "../../assets/cook.gif";
import delivery from "../../assets/delivery.jpeg"; 
import profileGIF from "../../assets/profile.gif";
import cartGIF from "../../assets/cart.gif";


export default function Feed (props) {
    const {uId} = useParams()
    const [userData, setUserData] = useState({})
    const { chefsData } = useChefsAPI()
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const matchChefUserArr = chefsData.filter(chef => chef.user === uId)
    const matchChefUser = matchChefUserArr[0] 
    const matchChefUserId = matchChefUser && matchChefUser.user

    const [itemData, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //FETCH - LIST items
    const getItems = async () => {
        try{
            const items = await fetch(`http://localhost:9999/${uId}/item`)
            const parsedItems = await items.json()
            setData(parsedItems)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(()=>{
        getItems()
        // console.log("itemData:",itemData)
        return () => {
            setData([]);
        }; 
    // eslint-disable-next-line  
    }, [])

    const getUser = async () => {
        try { 
            const user = await fetch(`http://localhost:9999/${uId}`)
            const parsedUser = await user.json()
            console.log("getUser:", parsedUser)
            setUserData(parsedUser)
            // setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    //FOR NAVBAR TOTAL AMT OF ITEMS IN CART
    const cartNum = userData.cart && userData.cart.length

    useEffect(() => {
        getUser()
        return () => {
            setUserData({});
        };  
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <FeedNavbar 
                uId={uId} 
                history={props.history} 
                cartNum={cartNum} 
                cart={userData.cart} 
                getUser={getUser}
            />
            {/* POST BAR */}
            <div className='container-fluid pb-3 pt-3'>
                <div className='row'>
                    <div className='col-md-3 p-3'>
                        {
                            (matchChefUserId === uId)?
                            <a 
                                href={`/${uId}/admin/${matchChefUser._id}`}   
                            >
                            <img 
                                src={cookGIF}
                                alt='cook'
                                className='post'
                                id='cook' 
                            />
                            </a> 
                            :
                            <a 
                            href={`/${uId}/newChef`}   
                            >
                            <img 
                                src={cookGIF}
                                alt='cook'
                                className='post'
                                id='cook' 
                            />
                            </a>  
                        }
                    </div> 
                    <div className='col-md-3 p-3'>
                        <img 
                            src={delivery}
                            alt='delivery'
                            className='post'
                            id='delivery'
                        />
                    </div> 
                    <div className='col-md-3 p-3'>
                        <a 
                            href={`/${uId}/profile`}
                            alt='profile'
                        >
                        <img 
                            src={profileGIF}
                            alt='profile'
                            className='post'
                            id='profile'
                        /></a>
                    </div> 
                    <div className='col-md-3 p-3'>
                        <a 
                            href={`/${uId}/checkout`}
                            alt='cart'
                        >
                        <img 
                            src={cartGIF}
                            alt='cart'
                            className='post'
                            id='cart'
                        /></a>
                    </div>
                </div>     
            </div>
            <div className='container-fluid'>
                {/* TAG BAR */}
                <IconBar />
                <div className='row'>
                    {/* ALL CHEFS/ITEMS */}
                    <div className='col-md-9 food_items p-5 pt-2'>
                        <ChefsList
                            uId={uId}
                            chefsData={chefsData}
                        />
                        <ItemList
                            getUser={getUser}
                            userData={userData}
                            chefsData={chefsData}
                            itemData={itemData}
                            isLoading={isLoading}
                            searchResult={searchResult}
                            getItems={getItems}
                        />
                    </div>
                    {/* SIDEBAR */}
                    <SideBar 
                        setSearchTerm={setSearchTerm}
                        setSearchResult={setSearchResult}
                        searchTerm={searchTerm}
                    />
        
                </div>
            </div>  
        </>
    )
}