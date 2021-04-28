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
import TicketEdit from "./features/tickets/ticketEdit/TicketEdit";
import Login from "./components/userController/Login";
import Signup from "./components/userController/Signup";
import TicketView from "./components/TicketView";

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
            path="/ticket/edit/:ticketId"
            component={TicketEdit}
          />
          <ProtectedRoute exact path="/ticket/create" component={TicketEdit} />
          <ProtectedRoute
            exact
            path="/ticket/view/:id"
            component={TicketView}
          />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
