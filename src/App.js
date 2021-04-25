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
import TicketEdit from "./components/editTicketsComponenets/TicketEdit";
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
          <ProtectedRoute
            exact
            path="/ticket/edit/:id"
            component={TicketEdit}
          />
          <ProtectedRoute exact path="/ticket/create" component={TicketEdit} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
