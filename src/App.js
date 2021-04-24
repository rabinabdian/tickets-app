import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import TicketEdit from "./components/TicketEdit";
import Login from "./components/userController/Login";
import Signup from "./components/userController/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <ProtectedRoute path="/" component={Nav} />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <ProtectedRoute path="/" exact component={HomePage} />
          <ProtectedRoute path="/ticket/edit/" component={TicketEdit} />
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
