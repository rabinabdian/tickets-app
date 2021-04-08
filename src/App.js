import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./ProtectedRoute";

import { useSelector, useDispatch } from "react-redux";

import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const { isLoggedIn } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Router>
      <div className="App">
        <ProtectedRoute path="/" component={Nav} />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <ProtectedRoute path="/" exact component={LandingPage} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
        {/* {isLoggedIn ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(authActions.logout());
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(authActions.login("email", "pass"));
            }}
          >
            Login
          </button>
        )} */}

        {/* <Switch>
          <Route path="/" exact component={LandingPage} />
          <ProtectedRoute path="/login" component={Login} />
          <ProtectedRoute path="/signup" component={Signup} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch> */}
      </div>
    </Router>
  );
}

export default App;
