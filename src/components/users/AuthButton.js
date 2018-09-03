import {withRouter} from "react-router-dom";
import React from "react";
import {fakeAuth} from "../../api/helpers";
import Link from "react-router-dom/es/Link";

const AuthButton = withRouter(({history}) => (
    fakeAuth.isAuthenticated ? (
        <div className="text-right">
            Welcome! <a href="" onClick={() => {
            fakeAuth.signout(() => history.push('/'))
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