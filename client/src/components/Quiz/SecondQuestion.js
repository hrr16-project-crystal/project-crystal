import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['Spontaneity'];

class SecondQuestion extends Component {
  render() {
    const {
      fields: { Spontaneity },
      handleSubmit,
      previousPage,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="question question-label center-align">
            <label className="white-text">Its one of your birthdays. How do you spend it?</label>
            <div className="quiz-questions input-field col s9 offset-1">
              <select {...Spontaneity}>
                <option
                  value=""
                  className="grey-text text-lighten-1"
                  disabled
                  selected
                >Select your answer...</option>
                <option value={100}>Something intimate, just the two of us</option>
                <option value={75}>With friends and each other</option>
                <option value={50}>With friends only</option>
                <option value={25}>No plans</option>
              </select>
            </div>
          </div>
          <div className="center-align">
            <button className="btn form-btn light-blue darken-1" type="button" onClick={previousPage}>
              <i className="material-icons left">skip_previous</i>Back
            </button>
            <button className="btn form-btn light-blue darken-1" type="submit">
              <i className="material-icons right">skip_next</i>Next
            </button>
          </div>
        </div>
      </form>
    );
  }
}

SecondQuestion.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
})(SecondQuestion);
