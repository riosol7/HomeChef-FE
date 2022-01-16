import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//COMPONENTS
import Navbar from "../../components/Navbar"
import Banner from "../../components/Feed/Banner"
import IconBar from "../../components/Feed/IconBar";
import ItemList from "../../components/Feed/ItemList";
import SideBar from "../../components/Feed/SideBar";
import ChefsList from "../../components/Feed/ChefsList";
import CartCol from "../../components/ItemDetails/CartCol";
//CONTEXT
import { useChefsAPI } from "../../context/ChefsContext"


export default function Feed (props) {
    const {uId} = useParams()
    const [userData, setUserData] = useState({})
    const { chefsData } = useChefsAPI()
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])
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
    const [cartColOpen, setCartColOpen] = useState(false)

    useEffect(() => {
        getUser()
        return () => {
            setUserData({});
        };  
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='d-flex'>   
                <div className={cartColOpen ? 'col-lg-10' : 'col-lg-12'}>
                    <Navbar 
                        uId={uId} 
                        userData={userData}
                        cartNum={cartNum}
                        cart={userData.cart}
                        getUser={getUser}
                        cartColOpen={cartColOpen}
                        setCartColOpen={setCartColOpen}
                        history={props.history}
                    />
                    {/* POST BAR */}
                    <div className='pb-2 pt-2'>
                        <Banner
                            uId={uId}
                            userData={userData}
                            chefsData={chefsData}
                            itemData={itemData}
                            cartColOpen={cartColOpen}
                        />  
                    </div>
                    <IconBar
                        cartColOpen={cartColOpen}
                    />
                    <div className='container-fluid pt-3'>
                        <div className='row pt-2'>
                            {/* SIDEBAR */}
                            <SideBar 
                                setSearchTerm={setSearchTerm}
                                setSearchResult={setSearchResult}
                                searchTerm={searchTerm}
                            />
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
                        </div>
                    </div> 
                </div> 
                {
                    cartColOpen ?
                    <CartCol
                        uId={uId}
                        user={userData}
                        cart={userData.cart}
                        getUser={getUser}
                    />
                    :
                    <>
                    </>
                }
            </div>
        </>
    )
}