import React, { Component } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import Logo from './Logo';
class Navigation extends Component {
  render() {
    const { signedIn, route } = this.props;

    if (signedIn) {
      return (
        <nav className="Navigation">
          <Logo />
          <button onClick={() => this.props.onRouteChange('signout')} className="Button">
            <Link className="Logout-Link" to="/">
              Logout
            </Link>
          </button>
        </nav>
      );
    } else if (route === 'signup') {
      return (
        <nav className="Navigation">
          <Logo />
          <button onClick={() => this.props.onRouteChange('register')} className="Button">
            Register
          </button>
        </nav>
      );
    } else {
      return (
        <nav className="Navigation">
          <Logo />
          <button onClick={() => this.props.onRouteChange('signup')} className="Button">
            Sign in
          </button>
        </nav>
      );
    }
  }
}

export default Navigation;
