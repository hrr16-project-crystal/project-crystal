import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['firstName', 'lastName'];

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length > 15) {
    errors.lastName = 'Must be 15 characters or less'
  }
  return errors
};

class FourthQuestion extends Component {
  render() {
    const {
      fields: { firstName, lastName },
      handleSubmit,
      previousPage
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <input type="text" placeholder="First Name" {...firstName}/>
          </div>
          {firstName.touched && firstName.error &&
          <div>{firstName.error}</div>}
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input type="text" placeholder="Last Name" {...lastName}/>
          </div>
          {lastName.touched && lastName.error && <div>{lastName.error}</div>}
        </div>
        <div>
          <button type="button" onClick={previousPage}>
            <i/> Previous
          </button>
          <button type="submit">
            Next <i/>
          </button>
        </div>
      </form>
    )
  }
}

FourthQuestion.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
  validate                     // <------ only validates the fields on this page
})(FourthQuestion)
