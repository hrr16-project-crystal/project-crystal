import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['spontaneity'];

class SecondQuestion extends Component {
  render() {
    const {
      fields: { spontaneity },
      handleSubmit,
      previousPage,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="question question-label center-align">
            <label className="white-text">Its one of your birthdays. How do you spend it?</label>
            <div className="quiz-questions input-field col s9 offset-1">
              <select {...spontaneity}>
                <option
                  value=""
                  className="grey-text text-lighten-1"
                  disabled
                  selected
                >Select your answer...</option>
                <option>Something intimate, just the two of us</option>
                <option>With friends and each other</option>
                <option>With friends only</option>
                <option>No plans</option>
              </select>
            </div>
          </div>
          <div>
            <button type="button" onClick={previousPage}>
              <i /> Previous
            </button>
            <button type="submit">
              Next <i />
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
