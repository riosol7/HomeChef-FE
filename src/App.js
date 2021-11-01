//ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//PAGES
import Feed from "./pages/Feed";
import Chef from "./pages/Chef";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
//COMPONENTS
import Login from "./components/Login";
import NewChef from "./components/NewChef";
import Footer from "./components/Footer";
import Register from "./components/Register";
import EditItem from "./components/EditItem";
//CONTEXT
import ItemContextProvider from "./context/ItemContext";
import ChefContextProvider  from "./context/ChefContext";
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
            <ChefContextProvider>
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
                  exact path="/:uId/chef/:item/edit"
                  render={(renderProps) =>  <EditItem {...renderProps}/> }
                />
                <Route
                  exact path="/:uId/profile"
                  render={(renderProps) =>  <Profile {...renderProps}/> }
                />
                <Route
                  exact path="/:uId/cart"
                  render={(renderProps) =>  <Cart {...renderProps}/> }
                />
              </ItemContextProvider>
            </ChefContextProvider>
          </Switch>
          <Footer/>
        </Router>
      </div>
    </>
  );
}

export default App;
