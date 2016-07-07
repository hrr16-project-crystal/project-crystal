import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './app.css';

class Footer extends Component {

  render() {
    return (
        <div className="page-footer footer__box footer-copyright">
          <span className="footer__text grey-text text-lighten-4 left">© 2016 Sparkq</span>
          <a className="footer__text grey-text text-lighten-4 right" href="#!">Privacy Policy</a>
        </div>
    );
  }
}

export default Footer;
