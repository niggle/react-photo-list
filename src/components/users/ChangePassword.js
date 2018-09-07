import React from 'react';

import {Button, Col, FormControl, FormGroup, Grid, Row, ControlLabel, Panel, Alert, HelpBlock} from "react-bootstrap";
import {apiURL} from "../../api/helpers";
import {Link} from "react-router-dom";

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            password1: '',
            password1ErrorMessage: '',
            password2: '',
            password2ErrorMessage: '',
            uid: props.match.params.uidb64,
            uidErrorMessage: '',
            token: props.match.params.token,
            tokenErrorMessage: '',
            success: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetPassword = this.resetPassword.bind(this)
    }

    resetPassword(e) {
        e.preventDefault();
        fetch(apiURL + 'user/password/reset/confirm/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: this.state.uid,
                new_password1: this.state.password1,
                new_password2: this.state.password2,
                token: this.state.token,
            })

        }).then((response) => {
            return response.json().then(data => {
                return {data: data, code: response.status}
            })
        }).then((data) => {
            if (data.code === 200) {
                this.setState({success: true})
            }
            else if (data.code === 400) {
                this.handleFormErros(data.data)
            }
        })
    }

    handleFormErros(data) {
        this.setState({
            nonFieldError: data.non_field_errors ? data.non_field_errors.join() : '',
            tokenErrorMessage: data.token ? data.token.join() : '',
            uidErrorMessage: data.uid ? data.uid.join() : '',
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
                                <h1>Reset Password</h1>
                                <Alert bsStyle="success">
                                    <strong>Congratulations!</strong> Your password was changed with success.
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
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={6} mdOffset={3}>
                            <h1>Reset password</h1>
                            <form onSubmit={this.resetPassword}>
                                <FormGroup controlId="formUsername">
                                    <ControlLabel>New password</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="password1"
                                        value={this.state.password1}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormControl.Feedback/>
                                    <HelpBlock>
                                        <p className="text-danger">{this.state.password1ErrorMessage}</p>
                                    </HelpBlock>
                                </FormGroup>
                                <FormGroup controlId="formUsername">
                                    <ControlLabel>Repeat new password</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormControl.Feedback/>
                                    <HelpBlock>
                                        <p className="text-danger">{this.state.password2ErrorMessage}</p>
                                    </HelpBlock>
                                    <HelpBlock>
                                        <p className="text-danger">{this.state.uidErrorMessage || this.state.tokenErrorMessage ? 'This link is not valid': null}</p>
                                    </HelpBlock>
                                </FormGroup>

                                <Button type="submit" className="btn btn-primary">Change password</Button>

                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default ResetPassword;