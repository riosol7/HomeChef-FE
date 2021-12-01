import { createContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"; 

export const StripeContext = createContext()

export default function StripeContextProvider({ children }) {

    const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

    return(
        <StripeContext.Provider value={{stripePromise}}>
            <Elements stripe={stripePromise}>
                { children }
            </Elements>
        </StripeContext.Provider>
    )
}