import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { sessionSelector } from "../session/sessionSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector(sessionSelector);
  return (
    <Route
      {...rest}
      render={({ location, match }) =>
        isLoggedIn ? (
          <Component match={match} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
