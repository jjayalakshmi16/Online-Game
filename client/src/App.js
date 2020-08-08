import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "../src/components/Main";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import { UserContext } from "./utils/UserContext";
import Details from "./components/Details";
import User from "./components/User";
import MatchDetails from "./components/MatchDetails";

function App() {
  const [value, setValue] = useState(null);
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);
  return (
    <Router>
      <div className="App">
        <Switch>
          <UserContext.Provider value={providerValue}>
            <Route exact path="/" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/details" component={Details} />
            <Route exact path="/matchdetails" component={MatchDetails} />
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
