import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth } from "./context/auth";
import history from "./utils/history";
import "./App.css";
import { Login, Home } from "./routes";

function App() {
  const auth = useAuth();

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
