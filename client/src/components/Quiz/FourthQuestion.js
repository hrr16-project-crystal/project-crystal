import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['generosity'];

class FourthQuestion extends Component {
  render() {
    const {
      fields: { generosity },
      handleSubmit,
      previousPage,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="question question-label center-align">
            <label className="white-text">Do you celebrate your anniversaries or special moments?</label>
            <div className="quiz-questions input-field col s9 offset-1">
              <select {...generosity}>
                <option
                  value=""
                  className="grey-text text-lighten-1"
                  disabled
                  selected
                >Select your answer...</option>
                <option>Every single one</option>
                <option>A lot of them</option>
                <option>Not our thing</option>
                <option>We dont have any or no</option>
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

FourthQuestion.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
})(FourthQuestion);
