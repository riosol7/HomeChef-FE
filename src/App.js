import React, { useContext, useState } from "react";
//ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//PAGES
import Feed from "./pages/Feed";
import ItemDetails from "./pages/ItemDetails";
import Chef from "./pages/Chef";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
//COMPONENTS
import Login from "./components/Login";
import NewChef from "./components/NewChef";
import Footer from "./components/Footer";
import Register from "./components/Register";

// import ProtectedRoute from "./ProtectedRoute"; 
//CONTEXT
import { UserContext } from "./context/UserContext"
import ItemContextProvider from "./context/ItemContext";
import ChefsContextProvider from "./context/ChefsContext";

// import userReducer from "./reducer/UserReducer";
//BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
//CSS/SASS
import "./Styles/App.css";

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
                <Route
                  exact path="/:uId/newChef"
                  render={(renderProps) =>  <NewChef {...renderProps}/> }
                />
                {/* <ProtectedRoute 
                  exact path="/:uId/feed"
                  render={(renderProps) =>  <Feed {...renderProps}/>}
                  auth={}
                /> */}
                <Route
                  exact path="/:uId/feed"
                  render={(renderProps) =>  <Feed {...renderProps}/>}
                />
                <Route
                  exact path="/:uId/item/:id"
                  render={(renderProps) =>  <ItemDetails {...renderProps}/>}
                />
                <Route
                  exact path="/:uId/chef"
                  render={(renderProps) =>  <Chef {...renderProps}/> }
                />
                <Route
                  exact path="/:uId/profile"
                  render={(renderProps) =>  <Profile {...renderProps}/> }
                />
                <Route
                  exact path="/:uId/checkout"
                  render={(renderProps) =>  <Checkout {...renderProps}/> }
                />
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
