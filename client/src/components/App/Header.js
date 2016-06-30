import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './app.css';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show link to sign out
      return [
        <li className="menu__item" key={1}>
          <Link to="/calendar" className="menu__link">Calendar</Link>
        </li>,
        <li className="menu__item" key={2}>
          <Link to="/todo" className="menu__link">ToDo</Link>
        </li>,
        <li className="menu__item" key={3}>
          <Link to="/quiz" className="menu__link">Quiz</Link>
        </li>,
        <li className="menu__item" key={4}>
          <Link to="/dashboard" className="menu__link">Dashboard</Link>
        </li>,
        <li className="menu__item" key={5}>
          <Link to="/signout" className="menu__link">Sign Out</Link>
        </li>,
      ];
    } else {
      // show link to sign in or sign up
      return [
        <li className="menu__item" key={6}>
          <Link to="/signin" className="menu__link">Sign In</Link>
        </li>,
        <li className="menu__item" key={7}>
          <Link to="/signup" className="menu__link">Sign Up</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <nav className="nav">
        <Link to="/" className="logo">Spark</Link>
        <ul className="menu">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Header);
