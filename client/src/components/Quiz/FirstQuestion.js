import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['intimacy'];

class FirstQuestion extends Component {
  render() {
    const {
      fields: { intimacy },
      handleSubmit,
    } = this.props;
    return (
      <div>
        <div className="section center-align">
          <h2 className="white-text">Let's get to know you...</h2>
          <p className="white-text question-body">Answer these questions below to allow us to get a snapshot
          of where your relationship is right now. Please take your time and answer these questions
          honestly. Spark is here to help YOU!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="question question-label center-align">
            <label className="white-text">How much time do the two of you spend together?</label>
            <div className="quiz-questions input-field col s9 offset-1">
              <select {...intimacy}>
                <option
                  value=""
                  className="grey-text text-lighten-1"
                  disabled
                  selected
                >Select your answer...</option>
                <option>We spend a fair amount but not all of our time together</option>
                <option>We have some shared interests that we do together</option>
                <option>It depends on the week - sometimes we are inseperable and other times we arent</option>
                <option>We spend very little time together</option>
              </select>
            </div>
          </div>
          <div>
            <button type="submit">
              Next <i />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

FirstQuestion.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
})(FirstQuestion);
