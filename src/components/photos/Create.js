import React from 'react';

import {Button, Col, FormControl, FormGroup, Grid, Row, ControlLabel, Alert, HelpBlock, Panel} from "react-bootstrap";
import {apiURL, auth} from "../../api/helpers";
import {Link, Redirect} from "react-router-dom";


class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imageErrorMessage: '',
            status: '',
            redirectToLogin: false,
            nonFieldError: '',
            success: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this)
    }

    uploadImage(e) {
        e.preventDefault();
        // api upload image
        let data = new FormData();
        data.append('photo', this.state.image);
        fetch(apiURL + 'photos/create', {
            method: 'POST',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token')
            },
            body: data
        }).then((response) => {
            return response.json().then(data => {
                return {data: data, code: response.status}
            })
        }).then((data) => {
            if (data.code === 401) {
                auth.signout(() => this.setState({redirectToLogin: true})
                )
            } else if (data.code === 400) {
                this.handleFormErros(data.data)
            } else if (data.code === 201) {
                this.setState({success: true})
            }


        });
    };

    handleFormErros(data) {
        this.setState({
            nonFieldError: data.non_field_errors ? data.non_field_errors.join() : '',
            imageErrorMessage: data.photo ? data.photo.join() : '',

        })
    }

    handleInputChange(event) {
        this.setState({
            image: event.target.files[0]
        });
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to="/user/login"/>
        }


        if (this.state.success) {
            return (
                <Grid>
                    <Col xs={12} md={6} mdOffset={3}>
                        <Panel>
                            <Panel.Body>
                                <h1>Register</h1>
                                <Alert bsStyle="success">
                                    <strong>Congratulations!</strong> Your photo was uploaded with success.
                                    <div className='text-center'>
                                        <Link to="/photo/list" className="btn btn-success">Photo list</Link>
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
                        <Col xs={12}>
                            <h1>Upload new image</h1>
                            <form onSubmit={this.uploadImage}>
                                <FormGroup controlId="formUsername">
                                    <ControlLabel>File</ControlLabel>
                                    <FormControl
                                        type="file"
                                        name="image"
                                        onChange={this.handleInputChange}
                                    />
                                    <FormControl.Feedback/>
                                    <HelpBlock>
                                        <p className="text-danger">{this.state.imageErrorMessage}</p>
                                        <p className="text-danger">{this.state.nonFieldError}</p>
                                    </HelpBlock>
                                </FormGroup>
                                <Button type="submit" className="btn btn-primary">Upload</Button>
                            </form>
                        </Col>
                        {this.state.show ?
                            <Col xs={12} md={6} mdOffset={3}>
                                <Alert bsStyle={this.state.status}>
                                    Image uploaded with success.
                                </Alert>;
                            </Col> :
                            null}
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Create;