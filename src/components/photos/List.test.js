import React from 'react';
import ReactDOM from 'react-dom';
import List from "./List";
import {BrowserRouter as Router} from "react-router-dom";
import { XMLHttpRequest } from 'xmlhttprequest';
global.XMLHttpRequest = XMLHttpRequest;

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
            <List/>
        </Router>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
});
