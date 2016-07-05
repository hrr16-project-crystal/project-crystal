import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['Communication'];

class ThirdQuestion extends Component {
  render() {
    const {
      fields: { Communication },
      handleSubmit,
      previousPage,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="question question-label center-align">
            <label className="white-text">Have you ever caught your partner in a lie?</label>
            <div className="quiz-questions input-field col s9 offset-1">
              <select {...Communication}>
                <option
                  value=""
                  className="grey-text text-lighten-1"
                  disabled
                  selected
                >Select your answer...</option>
                <option value={100}>Never</option>
                <option value={75}>Once, but it was minor or a misunderstanding</option>
                <option value={50}>A few times</option>
                <option value={25}>It feels like lying is a constant issue in our relationship</option>
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

ThirdQuestion.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
})(ThirdQuestion);
