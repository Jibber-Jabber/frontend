import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import PrivateRoute from "./navigation/PrivateRoute";
import Login from "./Login/Login";

const routes = () => {
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

export default routes;
