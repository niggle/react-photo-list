import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Grid} from "react-bootstrap";
import Panel from "react-bootstrap/es/Panel";
import {apiURL} from "../../api/helpers";

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.saveUser = this.saveUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
            submited: false
        };
    }

    saveUser(e) {
        e.preventDefault();
        fetch(apiURL + 'user/registration/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password1: this.state.password1,
                password2: this.state.password2,
                email: this.state.email,
            })

        }).then(function (response) {
            return response.json()

        }).then(function (data) {
            console.log(data)
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Grid>
                <Col xs={12} md={6} mdOffset={3}>
                    <Panel>
                        <Panel.Body>
                            <h1>Register</h1>
                            <form onSubmit={this.saveUser}>
                                <FormGroup controlId="userInput">
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.username}
                                        name="username"
                                        onChange={this.handleInputChange}
                                    />
                                    <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup controlId="emailInput">
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.handleInputChange}
                                    />
                                    <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup controlId="passwordInput">
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        value={this.state.password1}
                                        name="password1"
                                        onChange={this.handleInputChange}
                                    />
                                    <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup controlId="password2Input">
                                    <ControlLabel>Repeat Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        value={this.state.password2}
                                        name="password2"
                                        onChange={this.handleInputChange}
                                    />
                                    <FormControl.Feedback/>
                                </FormGroup>
                                <Button type="submit" bsStyle="primary">Submit</Button>
                            </form>
                        </Panel.Body>
                    </Panel>
                </Col>

            </Grid>
        );
    }
}

export default Login;