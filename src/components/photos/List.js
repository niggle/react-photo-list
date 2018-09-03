import React from 'react';

import {Col, Grid, Image, Row} from "react-bootstrap";

class List extends React.Component {

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h1>Image List</h1>
                            <Row>
                                <Col xs={3}>
                                    <Image src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed86b965826826e3dd08bb3b33726543&auto=format&fit=crop&w=1414&q=80" thumbnail />
                                </Col>
                                <Col xs={3}>
                                    <Image src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed86b965826826e3dd08bb3b33726543&auto=format&fit=crop&w=1414&q=80" thumbnail />
                                </Col>
                                <Col xs={3}>
                                    <Image src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed86b965826826e3dd08bb3b33726543&auto=format&fit=crop&w=1414&q=80" thumbnail />
                                </Col>
                                <Col xs={3}>
                                    <Image src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed86b965826826e3dd08bb3b33726543&auto=format&fit=crop&w=1414&q=80" thumbnail />
                                </Col>
                                <Col xs={3}>
                                    <Image src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed86b965826826e3dd08bb3b33726543&auto=format&fit=crop&w=1414&q=80" thumbnail />
                                </Col>
                                <Col xs={3}>
                                    <Image src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed86b965826826e3dd08bb3b33726543&auto=format&fit=crop&w=1414&q=80" thumbnail />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default List;