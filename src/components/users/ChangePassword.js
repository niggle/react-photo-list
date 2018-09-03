import React from 'react';

import {Button, Col, FormControl, FormGroup, Grid, Row} from "react-bootstrap";
import ControlLabel from "react-bootstrap/es/ControlLabel";

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            password: '',
            password2: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetPassword = this.resetPassword.bind(this)
    }

    resetPassword(e) {
        e.preventDefault();
        // api call
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
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormControl.Feedback/>
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
                                </FormGroup>

                                <Button type="submit" className="btn btn-primary">Reset password</Button>

                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default ResetPassword;