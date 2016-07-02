import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['intimacy', 'spontaneity', 'communication', 'generosity', 'respect'];
// ^^ All fields on last form

class FifthQuestion extends Component {
  render() {
    const {
      fields: { respect },
      handleSubmit,
      previousPage,
      submitting,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="question question-label center-align">
            <label className="white-text">What do your friends and family think of your partner?</label>
            <div className="quiz-questions input-field col s9 offset-1">
              <select {...respect}>
                <option
                  value=""
                  className="grey-text text-lighten-1"
                  disabled
                  selected
                >Select your answer...</option>
                <option>They think the two of you are soulmates</option>
                <option>They think s/he is good for you</option>
                <option>They are indifferent</option>
                <option>They have warned you about your partner and/or dont approve</option>
              </select>
            </div>
          </div>
          <div>
            <button type="button" disabled={submitting} onClick={previousPage}>
              <i /> Previous
            </button>
            <button type="submit" disabled={submitting}>
              {submitting ? <i /> : <i />} Finish
            </button>
          </div>
        </div>
      </form>
    );
  }
}

FifthQuestion.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  fields,                      // <------ all fields on last wizard page
  destroyOnUnmount: false,     // <------ preserve form data
})(FifthQuestion);
