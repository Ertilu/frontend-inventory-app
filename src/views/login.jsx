import React from "react";

/* We want to import our 'AuthHelperMethods' component in order to send a login request */
import AuthHelperMethods from '../components/auth/AuthHelperMethods';
import { Link } from 'react-router-dom';
import './login.css'
import axios from "axios";
import Signup from './signup';

// class Login extends Component {

// }
class Login extends React.Component {
  /* In order to utilize our authentication methods within the AuthService class, we want to instantiate a new object */
  Auth = new AuthHelperMethods();

  state = {
      username: "",
      password: "",
      token:''
  }

  /* Fired off every time the use enters something into the input fields */
  _handleChange = (e) => {
      this.setState(
          {
              [e.target.name]: e.target.value
          }
      )
  }

  handleFormSubmit = (e) => {
      
      e.preventDefault();
  
      axios
      .post("http://localhost:8000/user/login", this.state)
      .then(res => {
          this.setState({
              token: res.data.token
          })
          console.log(this.state.token); 
      
          localStorage.setItem('token', this.state.token)

          if (this.state.token == undefined) {
              return alert("Wrong username / password");
          } else {
              this.props.history.push('/admin/dashboard');
          }
      })    
  }

  // componentWillMount() {
  //     /* Here is a great place to redirect someone who is already logged in to the protected route */
  //     if (this.Auth.loggedIn())
  //         this.props.history.replace('/');
  // }

  render() {
      return (
          <React.Fragment>
              <div className="main-wrapper semuaform">
                  <div className="box">
                      <div className="box-header">
                          <h1 className="title tulisan">Login</h1>
                      </div>
                      <form className="box-form form">
                          <input
                              className="form-item"
                              placeholder="Username"
                              name="username"
                              type="text"
                              onChange={this._handleChange}
                          />
                          <input
                              className="form-item"
                              placeholder="Password"
                              name="password"
                              type="password"
                              onChange={this._handleChange}
                          />
                          <button className="form-submit title" onClick={this.handleFormSubmit}>Login</button>
                      </form>
                      {/* <Link className="link" to="/signup">Don't have an account? <span className="link-signup">Signup</span></Link>
                      <Route path="./signup" component={Signup} /> */}
                  </div>
                  {/* <div className="signiture">
                      <h1>Template Built & Designed by Roman Chvalbo</h1>
                  </div> */}
              </div>
   
          </React.Fragment>
      );
  }

}

export default Login;