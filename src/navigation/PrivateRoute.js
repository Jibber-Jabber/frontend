import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component, ...rest }) => {
  //let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        false ? (
          component
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
