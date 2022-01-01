import React, { useContext, useState } from "react";
//ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//PAGES
import Feed from "./pages/Feed/Feed";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Admin from "./pages/Admin/Admin";
import Checkout from "./pages/Checkout/Checkout";
import Profile from "./pages/Profile";
import Chef from "./pages/Chef/Chef";
//COMPONENTS
import Login from "./components/Login";
import NewChef from "./components/NewChef";
import Footer from "./components/Footer";
import Register from "./components/Register";

import ProtectedRoute from "./ProtectedRoute"; 
//CONTEXT
import { UserContext } from "./context/UserContext"
import ItemContextProvider from "./context/ItemContext";
import ChefsContextProvider from "./context/ChefsContext";
import StripeContextProvider from "./context/StripeContext";
// import userReducer from "./reducer/UserReducer";
//BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
//CSS/SASS
import "./Styles/App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  const userState = useContext(UserContext)
  const [user, setUser] = useState(userState)

  return (
    <>
      <div className="App">
        <Router>
          <Switch>
          <UserContext.Provider value={{ user, setUser }}>
            <Route
              exact path="/register"
                render={(renderProps) =>  <Register {...renderProps}/> }
            />
            <Route
              exact path="/"
              render={(renderProps) =>  <Login {...renderProps}/> }
            />
            <ChefsContextProvider>
              <ItemContextProvider>
                <ProtectedRoute 
                  token={user.token}
                  exact path="/:uId/newChef"
                  component={NewChef}
                />
                <ProtectedRoute 
                  token={user.token}
                  exact path="/:uId/feed"
                  component={Feed}
                />
                <ProtectedRoute 
                  token={user.token}
                  exact path="/:uId/item/:id"
                  component={ItemDetails}
                />
                <ProtectedRoute 
                  token={user.token}
                  exact path="/:uId/admin/:id"
                  component={Admin}
                />
                 <ProtectedRoute 
                  token={user.token}
                  exact path="/:uId/chef/:id"
                  component={Chef}
                />
                <ProtectedRoute 
                  token={user.token}
                  exact path="/:uId/profile"
                  component={Profile}
                />                
                <StripeContextProvider>
                <ProtectedRoute 
                  token={user.token}
                  exact path="/:uId/checkout"
                  component={Checkout}
                />
                </StripeContextProvider>
              </ItemContextProvider>
            </ChefsContextProvider>
            </UserContext.Provider>
          </Switch>
          <Footer/>
        </Router>
      </div>
    </>
  );
}

export default App;
