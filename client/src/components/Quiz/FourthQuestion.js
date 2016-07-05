import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['Generosity'];

class FourthQuestion extends Component {
  render() {
    const {
      fields: { Generosity },
      handleSubmit,
      previousPage,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="question question-label center-align">
            <label className="white-text">Do you celebrate your anniversaries or special moments?</label>
            <div className="quiz-questions input-field col s9 offset-1">
              <select {...Generosity}>
                <option
                  value=""
                  className="grey-text text-lighten-1"
                  disabled
                  selected
                >Select your answer...</option>
                <option value={100}>Every single one</option>
                <option value={75}>A lot of them</option>
                <option value={50}>Not our thing</option>
                <option value={25}>We dont have any or no</option>
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
