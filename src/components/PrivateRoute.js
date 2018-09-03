import { Redirect } from "react-router-dom";
import React from "react";
import Route from "react-router-dom/es/Route";
import {fakeAuth} from "../api/helpers";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default PrivateRoute