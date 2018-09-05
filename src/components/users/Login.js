import React from 'react';

import {Link, Redirect} from "react-router-dom";
import {auth} from "../../api/helpers";
import {Button, Col, FormControl, FormGroup, Grid, HelpBlock, Row, ControlLabel, Panel} from "react-bootstrap";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            username: '',
            usernameErrorMessage: '',
            password: '',
            passwordErrorMessage: '',
            nonFieldError: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this)
    }

    login(e) {
        e.preventDefault();
        let authData = {
            username: this.state.username,
            password: this.state.password
        };
        auth.authenticate(authData, (errors) => {
                if (!errors) {
                    this.setState(() => ({
                        redirectToReferrer: true
                    }))
                } else {
                    this.setState({
                        nonFieldError: errors.non_field_errors,
                        usernameErrorMessage: errors.username,
                        passwordErrorMessage: errors.password
                    })
                }
            }
        )
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {redirectToReferrer} = this.state;
        if (redirectToReferrer === true) {
            return <Redirect to={from}/>
        }
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={6} mdOffset={3}>
                            <Panel>
                                <Panel.Body>
                                    <h1>Login</h1>
                                    <form onSubmit={this.login}>
                                        <FormGroup controlId="formUsername">
                                            <ControlLabel>Username</ControlLabel>
                                            <FormControl
                                                type="text"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.handleInputChange}
                                            />
                                            <FormControl.Feedback/>
                                            <HelpBlock>
                                                <p className="text-danger">{this.state.usernameErrorMessage}</p>
                                            </HelpBlock>
                                        </FormGroup>
                                        <FormGroup controlId="formPassword">
                                            <ControlLabel>Password</ControlLabel>
                                            <FormControl
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleInputChange}
                                            />
                                            <FormControl.Feedback/>
                                            <HelpBlock>
                                                <p className="text-danger">{this.state.passwordErrorMessage}</p>
                                                <p className="text-danger">{this.state.nonFieldError}</p>
                                            </HelpBlock>

                                        </FormGroup>
                                        <Button type="submit" className="btn btn-primary">Log in</Button>
                                    </form>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col xs={12} md={6} mdOffset={3} className="text-right">
                            <Link to='/user/reset-password'>Forgot your password?</Link>
                        </Col>
                        <Col xs={12} md={6} mdOffset={3} className="text-right">
                            <Link to='/user/create'> Create an account </Link>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Login;