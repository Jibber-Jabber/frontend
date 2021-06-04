import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./main/Home/Home";
import SignUp from "./session/SignUp/SignUp";
import PrivateRoute from "./navigation/PrivateRoute";
import Login from "./session/Login/Login";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Routes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/signup"} component={SignUp} />
          <PrivateRoute path={"/home"} component={Home} />
          <PrivateRoute path={"/profile/"} component={Home} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default Routes;
