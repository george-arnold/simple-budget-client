import React, { Component } from 'react';
import './Signin.css';
import config from '../config';
import TokenService from '../token-service';

const validEmailRegex = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    val => val.length > 0 && (valid = false)
  );
  return valid;
};
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    };
  }
  handleEmail = event => {
    let message = '';
    const { value } = event.target;
    if (!validEmailRegex.test(value)) {
      message = '--Email is not valid';
    }
    this.setState(prevState => {
      return {
        email: value,
        errors: {
          email: message,
          password: prevState.errors.password
        }
      };
    });
  };
  handlePassword = event => {
    let passwordError = '';
    const { value } = event.target;
    if (value.length < 8) {
      passwordError = '--Password must be at least 8 characters';
    }
    this.setState(prevState => {
      return {
        password: value,
        errors: {
          email: prevState.errors.email,
          password: passwordError
        }
      };
    });
  };
  // handleUserName = event => {
  //   this.setState({
  //     userName: event.target.value
  //   });
  // };

  handleSubmit = event => {
    event.preventDefault();
    if (!validateForm(this.state.errors) || !(this.state.email && this.state.password)) {
      alert('Error: please complete the form' + this.state.errors.email + ' ' + this.state.errors.password);
    } else {
      const { email, password } = this.state;
      TokenService.saveAuthToken(TokenService.makeBasicAuthToken(email, password));
      const register = {
        email: email,
        password: password
      };
      fetch(`${config.API_ENDPOINT}/register`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(register)
      })
        .then(response => response.json())
        .then(user => {
          if (user) {
            // this.props.loadUser(user);
            this.props.onRouteChange('home');
          }
        });
    }
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="Create-Account">
        <h1>Create account</h1>
        <form className="Login-Forms">
          {/* <label className="Label">Name</label> */}
          {/* <input className="Sign-Up-Input" type="text" value={this.state.userName} onChange={this.handleUserName} /> */}
          <label className="Label">Email Address</label>
          <input
            text="Email Address"
            className="Sign-Up-Input"
            type="email"
            id="register-email"
            name="register-email"
            value={this.state.email}
            onChange={this.handleEmail}
          />
          {errors.email.length > 0 && <span className="error">{errors.email}</span>}

          <label className="Label">Password</label>
          <input
            type="password"
            id="register-password"
            name="register-password"
            className="Sign-Up-Input"
            value={this.state.password}
            onChange={this.handlePassword}
          />
          {errors.password.length > 0 && <span className="error">{errors.password}</span>}

          <input onClick={this.handleSubmit} className="Submit" type="submit" value="submit"></input>
        </form>
      </div>
    );
  }
}

export default Register;
