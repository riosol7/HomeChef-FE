//ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//PAGES
import Feed from "./pages/Feed";
import Chef from "./pages/Chef";
import Register from "./pages/Register";
import Cart from "./pages/Cart"
//COMPONENTS
import Sidebar from "./components/Sidebar"
import Login from "./components/Login";
import NewChef from "./components/NewChef";
import Footer from "./components/Footer";
//BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
//CSS/SASS
import "./Styles/App.css";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Route exact path="/*" component={Sidebar}/>
          <Switch>
            <Route
              exact path="/"
                render={(renderProps) =>  <Register {...renderProps}/> }
            />
            <Route
              exact path="/login"
              render={(renderProps) =>  <Login {...renderProps}/> }
            />
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
              exact path="/:uId/cart"
              render={(renderProps) =>  <Cart {...renderProps}/> }
            />
          </Switch>
          <Footer/>
        </Router>
      </div>
    </>
  );
}

export default App;
