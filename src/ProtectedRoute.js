import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ token, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if(token) return <Component {...props} />;
                if(token === "") return <Redirect to={{ pathname:"/", state: {from: props.location}}}/>;
                    
            }}
        />
    )
}

export default ProtectedRoute