import React from 'react';

import {Col, Grid, Image, Row} from "react-bootstrap";
import {apiURL, auth} from "../../api/helpers";
import {Redirect} from "react-router-dom";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: [],
            redirectToLogin: false
        };

    }

    componentDidMount() {
        fetch(apiURL + 'photos/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token')
            },
        }).then(function (response) {
            if (response.status === 401) {
                auth.signout(() => this.setState({redirectToLogin: true})
                )
            }
            else {
                return response.json()
            }

        }).then((data) => {
            if (data) {
                this.setState({imageList: data})
            }
        });
    }

    renderImages() {
        if (this.state.imageList.length > 0)
        return this.state.imageList.map((obj, index) => {
                return (
                    <Col xs={3} key={index}>
                        <Image
                            src={obj.thumbnail}
                            thumbnail/>
                    </Col>
                )
            }
        );
        return (
                    <Col xs={12} >
                        There's no images to show
                    </Col>
                )
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