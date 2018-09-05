import React from "react";

import {Redirect, Route} from "react-router-dom";
import {auth} from "../api/helpers";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        auth.isAuthenticated() ? <Component {...props} /> : <Redirect to='/user/login'/>
    )}/>
);

export default PrivateRoute