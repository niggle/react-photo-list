import React from 'react';

import {Button, Col, FormControl, FormGroup, Grid, Row, ControlLabel, Alert} from "react-bootstrap";
import {apiURL, auth} from "../../api/helpers";
import {Redirect} from "react-router-dom";

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            status: '',
            redirectToLogin: false
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
            if (response.status === 401) {
                auth.signout(() =>  this.setState({redirectToLogin: true})
               )
            }
            else{
                return response.json()
            }
        }).then((data) => {
            this.setState({status:'success'})
        });
    };

    handleInputChange(event) {
        this.setState({
            image: event.target.files[0]
        });
    }

    render() {
        if(this.state.redirectToLogin){
            return <Redirect to="/user/login" />
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
                                </FormGroup>
                                <Button type="submit" className="btn btn-primary">Upload</Button>
                            </form>
                        </Col>
                        {this.state.show  ?
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