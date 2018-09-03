import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import Home from "./components/Home";
import Login from "./components/users/Login";
import UserCreate from "./components/users/UserCreate";
import AuthButton from "./components/users/AuthButton";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./components/users/ResetPassword";
import ChangePassword from "./components/users/ChangePassword";
import Create from "./components/photos/Create";
import List from "./components/photos/List";


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
                        <Route path="/user/reset-password" component={ResetPassword}/>
                        <Route path="/user/change-password/:token" component={ChangePassword}/>
                        <PrivateRoute path="/photo/list" component={List}/>
                        <PrivateRoute path="/photo/upload" component={Create}/>
                    </div>

                </Router>
            </div>
        );
    }
}

export default App;
