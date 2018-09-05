import {Link, withRouter} from "react-router-dom";
import React from "react";
import {auth} from "../../api/helpers";


const AuthButton = withRouter(({history}) => (
    auth.isAuthenticated() ? (
        <div className="text-right">
            Welcome! <a href="" onClick={() => {
            auth.signout(() => history.push('/'))
        }}>Sign out</a>
        </div>
    ) : (
        <div className="text-right">
            <Link to="/user/login" className="btn">Login</Link>
            <Link to="/user/create" className="btn">Create Account</Link>
        </div>
    )
));

export default AuthButton;