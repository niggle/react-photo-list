import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import Home from "./components/Home";
import Login from "./components/users/Login";
import UserCreate from "./components/users/UserCreate";
import AuthButton from "./components/users/AuthButton";
import PrivateRoute from "./components/PrivateRoute";


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Navbar>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <Link to="/">Photo List</Link>
                                </Navbar.Brand>
                            </Navbar.Header>
                            <Nav>
                                <NavItem componentClass={Link} href="/" to="/">
                                    Home
                                </NavItem>
                                <NavItem componentClass={Link} href="/user/login" to="/user/login">
                                    Login
                                </NavItem>
                                <NavItem componentClass={Link} href="/user/create" to="/user/create">
                                    Register
                                </NavItem>
                                <NavItem componentClass={Link} href="/photo/list" to="/photo/list">
                                    List Photos
                                </NavItem>
                                <NavItem componentClass={Link} href="/photo/upload" to="/photo/upload">
                                    Upload Photos
                                </NavItem>
                            </Nav>
                            <AuthButton/>

                        </Navbar>
                        <Route exact path="/" component={Home}/>
                        <Route path="/user/login" component={Login}/>
                        <Route path="/user/create" component={UserCreate}/>
                        <PrivateRoute path="/photo/list" component={UserCreate}/>
                        <PrivateRoute path="/photo/upload" component={UserCreate}/>
                    </div>

                </Router>
            </div>
        );
    }
}

export default App;
