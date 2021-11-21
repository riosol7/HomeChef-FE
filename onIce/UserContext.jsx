import React, { createContext, useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";

export const UserContext = createContext()

export default function UserContextProvider({ children }) {
    const {uId} = useParams()
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const getUser = async () => {
        try { 
            const user = await fetch(`http://localhost:9999/${uId}`)
            const parsedUser = await user.json()
            console.log("fetchedUser:", parsedUser)
            setUserData(parsedUser)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUser()
        // eslint-disable-next-line  
    }, [])

    return (
        <UserContext.Provider value={{ userData, isLoading }}>
            { children }
        </UserContext.Provider>
    )
}

export function useUserAPI() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context
}
