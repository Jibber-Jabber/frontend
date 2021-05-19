import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/signup"} component={SignUp} />
        <Route path={"/home"} component={Home} />
      </Switch>
    </Router>
  );
};

export default routes;
