import React from 'react';

import {Alert, Button, Col, FormControl, FormGroup, Grid, ControlLabel, Row, Panel} from "react-bootstrap";
import {apiURL} from "../../api/helpers";


class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            status: ''
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

        }).then(function (response) {
            return response.json()

        }).then(function (data) {
            console.log(data)
        });
    };

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
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