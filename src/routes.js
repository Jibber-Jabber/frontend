import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./main/Home/Home";
import SignUp from "./session/SignUp/SignUp";
import PrivateRoute from "./navigation/PrivateRoute";
import Login from "./session/Login/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import UserProfile from "./main/UserProfile/UserProfile";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const queryClient = new QueryClient();

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 1400,
  },
};

const Routes = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route exact path={"/"} component={Login} />
            <Route exact path={"/signup"} component={SignUp} />
            <PrivateRoute path={"/home"} component={Home} />
            <PrivateRoute path={"/profile/:userId?"} component={UserProfile} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </AlertProvider>
  );
};

export default Routes;
