import React, {Component} from 'react';
import {Alert, Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Panel} from "react-bootstrap";
import {apiURL} from "../../api/helpers";
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.saveUser = this.saveUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormErros = this.handleFormErros.bind(this);
        this.state = {
            username: '',
            usernmaErrorMessage: '',
            email: '',
            emailErrorMessage: '',
            password1: '',
            password1ErrorMessage: '',
            password2: '',
            password2ErrorMessage: '',
            non_field_errors: '',
            submited: false,
            success: false

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

        }).then((response) => {
            return response.json().then(data => { return {data: data, code:response.status} })
        }).then((data) => {
            if(data.code === 201){
                this.setState({success:true})
            }
            else if(data.code === 400){
                this.handleFormErros(data.data)
            }
        })
    }

    handleFormErros(data) {
        this.setState({
            nonFieldError: data.non_field_errors ? data.non_field_errors.join() : '',
            usernameErrorMessage: data.username ? data.username.join() : '',
            emailErrorMessage: data.email ? data.email.join() : '',
            password1ErrorMessage: data.password1 ? data.password1.join() : '',
            password2ErrorMessage: data.password2 ? data.password2.join() : '',
        })
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
        if (this.state.success) {
            return (
                <Grid>
                    <Col xs={12} md={6} mdOffset={3}>
                        <Panel>
                            <Panel.Body>
                                <h1>Register</h1>
                                <Alert bsStyle="success">
                                    <strong>Congratulations!</strong> Your profile was created with success.
                                    <div className='text-center'>
                                        <Link to="/user/login" className="btn btn-success">Login</Link>
                                    </div>

                                </Alert>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Grid>
            )
        }
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
                                    <HelpBlock>
                                        <p className="text-danger">{this.state.usernameErrorMessage}</p>
                                    </HelpBlock>
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
                                    <HelpBlock>
                                        <p className="text-danger">{this.state.emailErrorMessage}</p>
                                    </HelpBlock>
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
                                    <HelpBlock>
                                        <p className="text-danger">{this.state.password1ErrorMessage}</p>
                                    </HelpBlock>
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
                                    <HelpBlock>
                                        <p className="text-danger">{this.state.password2ErrorMessage}</p>
                                        <p className="text-danger">{this.state.nonFieldError}</p>
                                    </HelpBlock>
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