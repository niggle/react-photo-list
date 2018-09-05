import React from 'react';

import {Button, Col, FormControl, FormGroup, Grid, Row, ControlLabel} from "react-bootstrap";
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