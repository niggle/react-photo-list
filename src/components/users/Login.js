import React from 'react';

import {Link, Redirect} from "react-router-dom";
import {fakeAuth} from "../../api/helpers";
import {Button, Col, FormControl, FormGroup, Grid, Row} from "react-bootstrap";
import ControlLabel from "react-bootstrap/es/ControlLabel";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            username: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this)
    }

    login(e) {
        e.preventDefault();
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
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
                                </FormGroup>
                                <Button type="submit" >Submit</Button>

                            </form>
                        </Col>
                        <Col xs={12} md={6} mdOffset={3} className="text-right">
                            <Link to='/' >Forgot your password?</Link>
                        </Col>
                        <Col xs={12} md={6} mdOffset={3} className="text-right">
                            <Link to='/user/create' > Create an account </Link>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Login;