import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Login from 'views/login';
import Signup from 'views/signup';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

class App extends Component {
  render() {
    return (
        
       <Router>
         <div className="container-fluid">
           <ul>
             <li>
               <Link to="/login">Sign in</Link>
             </li>
             <li>
               <Link to="/signup">Sign up</Link>
             </li>
           </ul>
            <hr/>
            <h1>Welcome to inventory application please login.</h1>
         
          </div>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
       </Router>
       );
     
    
        
    
  }
}

export default App;
