import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './AuthActions';
import axios from 'axios';
import './index.css'; 

class Signup extends Component {
  constructor(props) {
    super(props);
    this.facebookLogin = this.facebookLogin.bind(this);
  }
  handleFormSubmit(formProps) {
    // Call action creator to signup the user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  facebookLogin() {
    this.props.facebookLogin();
  }

  render() {
    const { handleSubmit, fields: { firstName, lastName, email, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>First Name:</label>
          <input className="form-control" {...firstName} />
          {firstName.touched && firstName.error && <div className="error">{firstName.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Last Name:</label>
          <input className="form-control" {...lastName} />
          {lastName.touched && lastName.error && <div className="error">{lastName.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password} />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input type="password" className="form-control" {...passwordConfirm} />
            {passwordConfirm.touched && passwordConfirm.error &&
              <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Would you like to initiate a new couple?</label>
          <select className="signup-questions">
            <option>Select an answer...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </fieldset>
        {this.renderAlert()}
        <button action="Submit" className="btn btn-primary">Signup</button>
      </form>
    );
  }
}
// <button><a href="/auth/facebook">Signup with Facebook</a></button>

const validate = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'signup',
  fields: ['firstName','lastName', 'email', 'password', 'passwordConfirm'],
  validate,
}, mapStateToProps, actions)(Signup);
