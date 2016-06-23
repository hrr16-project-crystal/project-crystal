import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './authAction';
import './auth.css';

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
    const { handleSubmit, fields: { firstName, lastName, email, password, passwordConfirm, couple }} = this.props;
    return (
      <div className="signup--box">
        <div className="signup__overlay">
          <form className="signup__form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <h6 className="signup--box__title">A better relationship is right around the corner</h6>
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
              <label>Would you like to start a new couple?</label>
              <div>
                <select className="signup-questions" {...couple}>
                  <option>Select an answer...</option>
                  <option value="yes">Yes - my partner has not signed up yet</option>
                  <option value="no">No - connect with my partner</option>
                </select>
              </div>
            </fieldset>
            {this.renderAlert()}
            <button action="Submit" className="btn btn-primary waves-effect waves-light">Signup</button>
          </form>
        </div>
      </div>
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

// be sure to add otherEmail as a field to indicate the other person's email address if they are
// not the first to sign up
export default reduxForm({
  form: 'signup',
  fields: ['firstName', 'lastName', 'email', 'password', 'passwordConfirm', 'couple'],
  validate,
}, mapStateToProps, actions)(Signup);
