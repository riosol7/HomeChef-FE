//ROUTER
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//PAGES
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
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
              render={(renderProps) => <Register {...renderProps}/>}
            />
            <Route
              exact path="/login"
              render={(renderProps) => <Login {...renderProps}/>}
            />
            <Route
              exact path="/:uId/feed"
              render={(renderProps) => <Feed {...renderProps}/>}
            />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
