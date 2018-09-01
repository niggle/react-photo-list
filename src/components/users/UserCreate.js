import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Grid} from "react-bootstrap";

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordRepeat = this.handleChangePasswordRepeat.bind(this);

        this.state = {
            username: '',
            email:'',
            password: '',
            password2: ''
        };
    }

    getValidationState(field) {
        const length = this.state[field].length;
        if (length > 0) return 'success';
        return null;
    }

    handleChangeUsername(e) {
        this.setState({username: e.target.value});
    }

    handleChangeEmail(e) {
        this.setState({password2: e.target.value});
    }

    handleChangePassword(e) {
        this.setState({password: e.target.value});
    }
    handleChangePasswordRepeat(e) {
        this.setState({password2: e.target.value});
    }

    render() {
        return (
            <Grid>
                <Col xs={6} xsOffset={3}>
                    <h1>Register</h1>
                    <form>
                        <FormGroup
                            controlId="userInput"
                            validationState={this.getValidationState('username')}
                        >
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.username}
                                onChange={this.handleChangeUsername}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup
                            controlId="emailInput"
                            validationState={this.getValidationState('email')}
                        >
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.email}
                                onChange={this.handleChangeEmail}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup
                            controlId="passwordInput"
                            validationState={this.getValidationState('password')}
                        >
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup
                            controlId="password2Input"
                            validationState={this.getValidationState('password2')}
                        >
                            <ControlLabel>Repeat Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChangePasswordRepeat}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <Button type="submit" bsStyle="primary">Submit</Button>

                    </form>
                </Col>

            </Grid>
        );
    }
}

export default Login;