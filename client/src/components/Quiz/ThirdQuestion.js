import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['communication'];

class ThirdQuestion extends Component {
  render() {
    const {
      fields: { communication },
      handleSubmit,
      previousPage,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="question question-label center-align">
            <label className="white-text">Have you ever caught your partner in a lie?</label>
            <div className="quiz-questions input-field col s9 offset-1">
              <select {...communication}>
                <option
                  value=""
                  className="grey-text text-lighten-1"
                  disabled
                  selected
                >Select your answer...</option>
                <option>Never</option>
                <option>Once, but it was minor or a misunderstanding</option>
                <option>A few times</option>
                <option>It feels like lying is a constant issue in our relationship</option>
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
