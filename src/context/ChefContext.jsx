import React, { createContext, useState, useEffect, useContext } from 'react'
import {getUserToken} from '../utils/authToken';
import { useParams } from 'react-router'

export const ChefContext = createContext()

export default function ChefContextProvider({ children }) {
    const {uId} = useParams()
    const [chefData, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //FETCH - All CHEFS data
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
            setData(parsedChefs)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        };
    };
    
    useEffect(()=>{
        getChef();
        console.log(chefData)
    // eslint-disable-next-line  
    }, [])

    return(
        <ChefContext.Provider value={{ chefData, isLoading }}>
            { children }
        </ChefContext.Provider>
    )
}

export function useChefAPI() {
    const context = useContext(ChefContext);
    if (context === undefined) {
      throw new Error("Context must be used within a Provider");
    }
    return context;
  }