import React, { createContext, useState, useEffect, useContext } from 'react'
// import {getUserToken} from '../utils/authToken';
import { useParams } from "react-router-dom";

export const ChefsContext = createContext()

export default function ChefsContextProvider({ children }) {
    const {uId} = useParams()
    const [chefData, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //FETCH - All CHEFS data
    const getChefs = async () => {
        try{
            // const config = {
            //     method:"GET",
            //     body: JSON.stringify(data),
            //     headers: {
            //         "Content-Type":"application/json",
            //         "Authorization":`bearer ${getUserToken()}`
            //     }
            // };
            const chefs = await fetch(`http://localhost:9999/${uId}/chef/all`)
            const parsedChefs = await chefs.json()
            setData(parsedChefs)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        };
    };
    
    useEffect(()=>{
        getChefs();
        console.log("chefData(ufx):",chefData)
    // eslint-disable-next-line  
    }, [])

    return(
        <ChefsContext.Provider value={{ chefData, isLoading }}>
            { children }
        </ChefsContext.Provider>
    )
}

export function useChefAPI() {
    const context = useContext(ChefsContext);
    if (context === undefined) {
      throw new Error("Context must be used within a Provider");
    }
    return context;
  }