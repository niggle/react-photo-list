import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Grid, Col, Button} from "react-bootstrap";

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);


        this.state = {
            username: '',
            password: ''
        };
    }

    getValidationState() {
        const length = this.state.password.length;
        if (length > 0) return 'success';
        return null;
    }

    handleSubmit(e) {
        e.preventDefault();
        //handle login
    }


    render() {
        return (
            <Grid>
                <Col xs={6} xsOffset={3}>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup
                            controlId="userInput"
                            validationState={this.getValidationState()}
                        >
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.username}
                                onChange={e => this.setState({username: e.target.value})}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup
                            controlId="passwordInput"
                            validationState={this.getValidationState()}
                        >
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value})}
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