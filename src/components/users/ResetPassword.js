import React from 'react';

import {Alert, Button, Col, FormControl, FormGroup, Grid, ControlLabel, Row, Panel, HelpBlock} from "react-bootstrap";
import {apiURL} from "../../api/helpers";


class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            emailErrorMessage: '',
            nonFieldError:'',
            success: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetPassword = this.resetPassword.bind(this)
    }

    resetPassword(e) {
        e.preventDefault();
        // api call
        fetch(apiURL + 'user/password/reset/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,

            })

        }).then((response) => {
            return response.json().then(data => { return {data: data, code:response.status} })

        }).then((data) => {
            if (data.code === 400) {
                this.handleFormErros(data.data)
            } else {
                this.setState({success: true})
            }

        });
    };
    handleFormErros(data) {
        this.setState({
            nonFieldError: data.non_field_errors ? data.non_field_errors.join() : '',
            emailErrorMessage: data.email ? data.email.join() : '',
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
                                    <strong>Congratulations!</strong> Password reset was successfully, check your email.
                                </Alert>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Grid>
            )
        }
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6} mdOffset={3}>
                        <Panel>
                            <Panel.Body>
                                <h1>Reset password</h1>
                                <form onSubmit={this.resetPassword}>
                                    <FormGroup controlId="formUsername">
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl
                                            type="text"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                        />
                                        <FormControl.Feedback/>
                                        <HelpBlock>
                                            <p className="text-danger">{this.state.emailErrorMessage}</p>
                                            <p className="text-danger">{this.state.nonFieldError}</p>
                                        </HelpBlock>
                                    </FormGroup>
                                    <Button type="submit" className="btn btn-primary">Reset password</Button>
                                </form>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    {this.state.status === 'success' ?
                        <Col xs={12} md={6} mdOffset={3}>
                            <Alert bsStyle="success">
                                You can now check your email to continue make the password reset.
                            </Alert>;
                        </Col> :
                        null}

                </Row>
            </Grid>
        )
    }
}

export default ResetPassword;