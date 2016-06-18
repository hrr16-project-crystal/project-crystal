import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './AuthActions';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ email, password }) {
    console.log(email, password);
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

// First arg is for configuration and second set of parenthesis is for the Component
// This gives us access to 'this.props.email' & 'this.props.password'
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
}, null, actions)(Signin);
