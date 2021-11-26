import { clearUserToken } from "../utils/authToken";

export default function userReducer(state, action) {
    switch (action.type) {
        case "REGISTER":
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case "LOGIN":
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case "LOGOUT": 
            return {
                ...state,
                currentUser: null,
                isAuth: false,
                token: clearUserToken()
            }
        default:
            return state
    }
}