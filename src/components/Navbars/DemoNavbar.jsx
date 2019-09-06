/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
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
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import routes from "routes.js";
import AuthHelperMethods from '../auth/AuthHelperMethods';

export const MContext = React.createContext(); 
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent",
      search: "",
      by: ""
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.sidebarToggle = React.createRef();
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "dark"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  getBrand() {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  }
  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
 
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
    localStorage.setItem('page', e.target.value);
  }
 
  searchProduct = (e) => {
    // localStorage.setItem('value', )
    localStorage.setItem('search', this.state.search);
  } 

  sort = (e) => {
    let byWhat = e.target.name;
    let splited = byWhat.split('_')
    let by = splited[0];
    let type = splited[1];
    localStorage.setItem('by', by);
    localStorage.setItem('type', type);
  }

  logoutConfirm = () =>  {
    confirmAlert({
      title: 'Confirmation',
      message: `Are you sure want to logout ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this._handleLogout()
        },
        {
          label: 'No',
          onClick: () => {} 
        }
      ]
    })
  }

  render() {
    
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
    
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          > 
          <div className="col-4">
            <select defaultValue="Select Page" className="form-control btn btn-success" name="page" onChange={this.handlerChange}>
              <option disabled name="null">Select Page</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
            <form onSubmit={this.searchProduct}>
              <InputGroup className="no-border">
                <Input type="text" placeholder="Search Product..." name="search" onChange={this.handlerChange} autoComplete="off" />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <Nav navbar>
              {/* <NavItem>
                <Link to="#pablo" className="nav-link btn-magnify">
                  <i className="nc-icon nc-layout-11" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem> */}
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  Sort By
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a" name="pName_ASC" onClick={this.sort}>Name (Ascending)</DropdownItem>
                  <DropdownItem tag="a" name="pName_DESC" onClick={this.sort}>Name (Descending)</DropdownItem>
                  <DropdownItem tag="a" name="pCategory_ASC" onClick={this.sort}>Category (Ascending)</DropdownItem>
                  <DropdownItem tag="a" name="pCategory_DESC" onClick={this.sort}>Category (Descending)</DropdownItem>
                  <DropdownItem tag="a" name="pQty_ASC" onClick={this.sort}>Quantity (Ascending)</DropdownItem>
                  <DropdownItem tag="a" name="pQty_DESC" onClick={this.sort}>Quantity (Descending)</DropdownItem>
                  <DropdownItem tag="a" name="pDateUpdated_ASC" onClick={this.sort}>Date Updated (Ascending)</DropdownItem>
                  <DropdownItem tag="a" name="pDateUpdated_DESC" onClick={this.sort}>Date Updated (Descending)</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link to="#" className="nav-link btn-rotate" onClick={this.logoutConfirm}>
                  <i className="nc-icon nc-button-power" /> LOGOUT
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
