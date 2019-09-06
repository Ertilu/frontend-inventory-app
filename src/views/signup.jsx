import React, {Component} from "react";
import AuthHelperMethods from '../components/auth/AuthHelperMethods';
import './login.css'
import axios from "axios";
import { Link } from 'react-router-dom';

export default class Signup extends Component {
    
    Auth = new AuthHelperMethods();
    state = {
        name: "",
        username: "",
        email: "",
        password: ""
    }

    _handleChange = (e) => {        
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
        console.log(this.state);
    }

    handleFormSubmit = (e) => {

        e.preventDefault();
        
        axios.post("http://localhost:8000/user/register", this.state).then((data) => {
                console.log(data);
                this.props.history.replace('/login');
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper semuaform">
                    <div className="box">
                        <div className="box-header">
                            <h1 className="title tulisan">Signup</h1>
                        </div>
                        <form className="box-form form">
                        <input
                                className="form-item"
                                placeholder="Your full name"
                                name="name"
                                type="text"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Username"
                                name="username"
                                type="text"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Email"
                                name="email"
                                type="email"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this._handleChange}
                            />
                            <button className="form-submit title" onClick={this.handleFormSubmit}>Signup</button>
                        </form>
                        {/* <Link className="link" to="/login">Already have an account? <span className="link-signup">Login</span></Link> */}
                    </div>
                    {/* <div className="signiture">
                        <h1>Template Built & Designed by Roman Chvalbo</h1>
                    </div> */}
                </div>
                
            </React.Fragment>
        );
    }

}