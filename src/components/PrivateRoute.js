import {Redirect} from "react-router-dom";
import React from "react";
import Route from "react-router-dom/es/Route";
import {auth} from "../api/helpers";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        auth.isAuthenticated() ? <Component {...props} /> : <Redirect to='/user/login'/>
    )}/>
);

export default PrivateRoute