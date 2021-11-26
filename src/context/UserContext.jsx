import { createContext } from "react";
import { getUserToken } from "../utils/authToken";

export const UserContext = createContext({
    currentUser: null,
    isAuth: false,
    token: getUserToken()
}) 
