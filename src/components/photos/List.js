import React from 'react';

import {Col, Grid, Image, Row} from "react-bootstrap";
import {apiURL} from "../../api/helpers";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: []
        };

    }

    componentDidMount() {
        console.log('Token ' + localStorage.getItem('token'))
        fetch(apiURL + 'photos/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            })

        }).then(function (response) {
            return response.json()

        }).then((data) => {
            if (data) {
                this.setState({imageList: data})
            }

        });
    }

    renderImages() {
        return this.state.imageList.map((obj, index) => {
                return (
                    <Col xs={3} key={index}>
                        <Image
                            src={obj.photo}
                            thumbnail/>
                    </Col>
                )
            }
        );
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h1>Image List</h1>
                            <Row>
                                {this.renderImages()}
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default List;