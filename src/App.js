import React from "react";
import Loadable from "react-loadable";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth } from "./context/auth";
import history from "./utils/history";
import "./App.css";
import { Home } from "./routes";

const Loading = () => <p>Loading...</p>;

const LoadableLogin = Loadable({
  loader: () => import("./routes/login"),
  loading: Loading
});

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
            <LoadableLogin />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
