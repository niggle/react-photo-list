import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./Login";
import {BrowserRouter as Router,} from "react-router-dom";



class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
};

global.localStorage = new LocalStorageMock;

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render((
        <Router>
            <Login location={{state:null}} />
        </Router>
    ), div);
     ReactDOM.unmountComponentAtNode(div);
});
