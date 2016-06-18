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
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password} />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

// First arg is for configuration and second set of parenthesis is for the Component
// This gives us access to 'this.props.email' & 'this.props.password'
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
}, mapStateToProps, actions)(Signin);
