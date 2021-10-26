import React, { createContext, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'

export const ItemContext = createContext()

export default function ItemContextProvider({ children }) {
    const {uId} = useParams()
    const [itemData, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //FETCH - LIST items
    const getItems = async () => {
        try{
            // const config = {
            //     method: "GET",
            //     // body: JSON.stringify(),
            //     // headers: {
            //     //     "Content-Type":"application/json",
            //     //     "Authorization": `bearer ${getUserToken()}`
            //     // }
            // };
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
        console.log(itemData)
    // eslint-disable-next-line  
    }, [])

    return(
        <ItemContext.Provider value={{ itemData, isLoading }}>
            { children }
        </ItemContext.Provider>
    )
}

export function useItemAPI() {
    const context = useContext(ItemContext);
    if (context === undefined) {
      throw new Error("Context must be used within a Provider");
    }
    return context;
  }