import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./main/Home/Home";
import SignUp from "./session/SignUp/SignUp";
import PrivateRoute from "./navigation/PrivateRoute";
import Login from "./session/Login/Login";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Login} />
        <Route exact path={"/signup"} component={SignUp} />
        <PrivateRoute path={"/home"} component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
