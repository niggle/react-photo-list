import React from 'react';

import {Button, Col, FormControl, FormGroup, Grid, Row} from "react-bootstrap";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import {apiURL} from "../../api/helpers";

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this)
    }

    uploadImage(e) {
        e.preventDefault();
        // api upload image
        let data = new FormData();
        data.append('photo', this.state.image);
        data.append('user', 1);
        fetch(apiURL + 'photos/create', {
            method: 'POST',
            body: data
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
        this.setState({
            image: event.target.files[0]
        });
    }

    render() {
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
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Create;