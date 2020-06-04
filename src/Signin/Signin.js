import React, { Component } from 'react';
import './Signin.css';
import config from '../config';
import TokenService from '../token-service';
import { trackPromise } from 'react-promise-tracker';

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

class Signin extends Component {
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
        loginError: '',
        password: value,
        errors: {
          email: prevState.errors.email,
          password: passwordError
        }
      };
    });
  };
  handleDemo = event => {
    event.preventDefault();
    const email = 'demo@gmail.com';
    const password = 'demopassword1234';
    TokenService.saveAuthToken(TokenService.makeBasicAuthToken(email, password));
    const signIn = {
      email: email,
      password: password
    };
    trackPromise(
      fetch(`${config.API_ENDPOINT}/signin`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(signIn)
      })
        .then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()))
        .then(user => {
          if (user.id) {
            this.props.onRouteChange('home');
            this.props.setDemo(true);
          }
        })
    );
  };
  handleSubmit = event => {
    event.preventDefault();
    if (!validateForm(this.state.errors) || !(this.state.email && this.state.password)) {
      alert('Error: please complete the form' + this.state.errors.email + ' ' + this.state.errors.password);
    } else {
      const { email, password } = this.state;
      TokenService.saveAuthToken(TokenService.makeBasicAuthToken(email, password));
      const signIn = {
        email: email,
        password: password
      };
      fetch(`${config.API_ENDPOINT}/signin`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(signIn)
      })
        .then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()))
        .then(user => {
          if (user.id) {
            this.props.onRouteChange('home');
            this.props.setDemo(false);
          }
        })
        .catch(res => {
          this.setState(prevState => {
            if (res.email) {
              return {
                errors: {
                  email: res.email,
                  password: prevState.errors.password
                }
              };
            } else {
              return {
                errors: {
                  email: prevState.errors.email,
                  password: res.password
                }
              };
            }
          });
        });
    }
  };

  render() {
    const { errors } = this.state;
    const { onRouteChange } = this.props;
    return (
      <main className="Landing-Page">
        <section className="Create-Account" name="Login-Section" id="Login-Section">
          <h2>Budget Management, Made Simple </h2>
          <h3>Sign In to Get Started</h3>

          <form className="Login-Forms">
            <input
              onClick={this.handleDemo}
              className="Submit"
              id="submit-demo"
              name="submit-demo"
              type="submit"
              value="Use Demo Account"
            ></input>
            <label htmlFor="email-address" className="Label">
              email
            </label>
            <input
              className="Sign-Up-Input"
              type="email"
              name="email-address"
              id="email-address"
              value={this.state.email}
              onChange={this.handleEmail}
            />
            {errors.email.length > 0 && <span className="error">{errors.email}</span>}

            <label htmlFor="pasword-entry" className="Label">
              Password
            </label>
            <input
              type="password"
              id="password-entry"
              className="Sign-Up-Input"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            {errors.password.length > 0 && <span className="error">{errors.password}</span>}

            <input
              onClick={this.handleSubmit}
              className="Submit"
              id="submit-signin"
              name="submit-signin"
              type="submit"
              value="submit"
            ></input>
          </form>
          <p className="Register" onClick={() => onRouteChange('register')}>
            Click to create an account?{' '}
          </p>
        </section>
        <h2 className="Info-Heading">How Simple Budget Works</h2>
        <section className="Landing-Page-Info">
          <div className="Flex-Container-1">
            <div className="Landing-Page-Section">
              <h3 className="Landing-Page-Heading">Step 1: Set up your categories</h3>
              <p>By categorizing your expenses you can easily see where you are over-spending</p>
              <img
                className="Landing-Page-Icon"
                alt="entry chart"
                src="https://cdn2.iconfinder.com/data/icons/business-management-158/32/05.Pie_curve-512.png
                "
              />
            </div>
          </div>
          <div className="Flex-Container-2">
            <div className="Landing-Page-Section">
              <h3 className="Landing-Page-Heading">Step 2: Add Transactions</h3>
              <p>
                Either each time you spend money, or by taking 2 minutes a day, upload your any financial transaction
                that you want to track
              </p>
              <img
                className="Landing-Page-Icon"
                alt="money"
                src="https://cdn0.iconfinder.com/data/icons/business-management-line-2/24/cash-512.png"
              />
            </div>
          </div>
          <div className="Flex-Container-3">
            <div className="Landing-Page-Section">
              <h3 className="Landing-Page-Heading">Step 3: Enjoy your savings!</h3>
              <p>Make a daily routine out of checking your budget, and you'll learn to save!</p>
              <img
                className="Landing-Page-Icon"
                alt="see your savings"
                src="https://cdn2.iconfinder.com/data/icons/business-management-158/32/03.Profit_increases-512.png"
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Signin;
