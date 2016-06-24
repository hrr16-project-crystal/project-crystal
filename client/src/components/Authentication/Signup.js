import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './authAction';
import './auth.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  render() {
    const { handleSubmit, fields: { firstName, lastName, email, password, passwordConfirm, couple }} = this.props;
    return (
      <div className="signup--box">
        <div className="signup__overlay">
          <form className="signup__form" onSubmit={handleSubmit(this.handleFormSubmit)}>
            <h6 className="signup--box__title">A better relationship is right around the corner</h6>
            <fieldset className="form-group">
              <div className="input-field">
                <i id="small-icon" className="material-icons prefix">person_pin</i>
                <input type="text" className="form-control" {...firstName} />
                <label>First Name:</label>
                {firstName.touched && firstName.error &&
                  <div className="error">{firstName.error}</div>}
              </div>
            </fieldset>
            <fieldset className="form-group">
              <div className="input-field">
                <i id="small-icon" className="material-icons prefix">person_pin</i>
                <input type="text" className="form-control" {...lastName} />
                <label>Last Name:</label>
                {lastName.touched && lastName.error &&
                  <div className="error">{lastName.error}</div>}
              </div>
            </fieldset>
            <fieldset className="form-group col 4">
              <label>Email:</label>
              <input className="form-control col 4" {...email} />
              {email.touched && email.error && <div className="error">{email.error}</div>}
            </fieldset>
            <fieldset className="form-group">
              <div className="input-field">
                <i id="small-icon" className="material-icons prefix">lock</i>
                <input type="password" className="form-control" {...password} />
                <label>Password:</label>
                {password.touched && password.error &&
                  <div className="error">{password.error}</div>}
              </div>
            </fieldset>
            <fieldset className="form-group col 4">
              <label>Confirm Password:</label>
              <input type="password" className="form-control" {...passwordConfirm} />
                {passwordConfirm.touched && passwordConfirm.error &&
                  <div className="error">{passwordConfirm.error}</div>}
            </fieldset>
            <fieldset className="form-group col 4">
              <label>Would you like to initiate a new couple?</label>
              <div>
                <select className="signup-questions" {...couple}>
                  <option>Select an answer...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </fieldset>
            <fieldset className="form-group">
              <div
                className="input-field"
                hidden={this.props.fields.couple.value === 'no' ? false : true}
              >
                <i id="small-icon" className="material-icons prefix">email</i>
                <input type="email" className="form-control" {...otherEmail} />
                <label>Partner's Email:</label>
              </div>
            </fieldset>
            {this.renderAlert()}
            <button action="Submit" className="btn btn-primary">Signup</button>
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

export default reduxForm({
  form: 'signup',
  fields: ['firstName', 'lastName', 'email', 'password', 'passwordConfirm', 'couple'],
  validate,
}, mapStateToProps, actions)(Signup);
