import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import Create from "./Create";


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
        <Router>
            <Create/>
        </Router>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
});