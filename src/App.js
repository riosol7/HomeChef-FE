//ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//PAGES
import Feed from "./pages/Feed";
import Chef from "./pages/Chef";
//COMPONENTS
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import NewChef from "./components/NewChef";
//BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
//CSS/SASS
import "./Styles/App.css";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar/>
          <Switch>
            <Route
              exact path="/"
              render={(renderProps) => <Register {...renderProps}/>}
            />
            <Route
              exact path="/login"
              render={(renderProps) => <Login {...renderProps}/>}
            />
            <Route
              exact path="/:uId/newChef"
              render={(renderProps) => <NewChef {...renderProps}/>}
            />
            <Route
              exact path="/:uId/feed"
              render={(renderProps) => <Feed {...renderProps}/>}
            />
            <Route
              exact path="/:uId/chef"
              render={(renderProps) => <Chef {...renderProps}/>}
            />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
