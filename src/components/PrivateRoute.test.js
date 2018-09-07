import React from 'react';
import ReactDOM from 'react-dom';

import List from "./photos/List";
import PrivateRoute from "./PrivateRoute";
import {BrowserRouter as Router,} from "react-router-dom";
import Home from "./Home";


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
        <Router>
            <PrivateRoute path="/test" component={Home}/>
        </Router>
    ), div)

    ReactDOM.unmountComponentAtNode(div);
});
