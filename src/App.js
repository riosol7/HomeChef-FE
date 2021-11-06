//ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//PAGES
import Feed from "./pages/Feed";
import Chef from "./pages/Chef";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
//COMPONENTS
import Login from "./components/Login";
import NewChef from "./components/NewChef";
import Footer from "./components/Footer";
import Register from "./components/Register";
import EditItem from "./components/EditItem";
import NewItem from "./components/NewItem";
//CONTEXT
import ItemContextProvider from "./context/ItemContext";
import ChefsContextProvider from "./context/ChefsContext";
//BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
//CSS/SASS
import "./Styles/App.css";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Switch>
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
                <Route
                  exact path="/:uId/feed"
                  render={(renderProps) =>  <Feed {...renderProps}/>}
                />
                <Route
                  exact path="/:uId/chef"
                  render={(renderProps) =>  <Chef {...renderProps}/> }
                />
                <Route
                  exact path="/:uId/chef/item"
                  render={(renderProps) =>  <NewItem {...renderProps}/> }
                />
                <Route
                  exact path="/:uId/chef/:item/edit"
                  render={(renderProps) =>  <EditItem {...renderProps}/> }
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
          </Switch>
          <Footer/>
        </Router>
      </div>
    </>
  );
}

export default App;
