import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../QuizOld/quizAction';
import { browserHistory } from 'react-router';
export const fields = ['Intimacy', 'Spontaneity', 'Communication', 'Generosity', 'Respect'];

class FifthQuestion extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    for (const key in formProps) {
      formProps[key] = Number(formProps[key]);
    }
    let total = 0;
    for (const key in formProps) {
      total += formProps[key];
    }
    formProps.Total = Math.floor(total / 5);
    formProps.user_id = this.props.user.data.user_id;

    this.props.postResponse(formProps);

    setTimeout(() => {
      browserHistory.push('/dashboard');
    }, 1000);
  }

  render() {
    const {
      fields: { Respect },
      handleSubmit,
      previousPage,
      submitting,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div>
          <div className="question question-label center-align">
            <label className="white-text">What do your friends and family think of your partner?</label>
            <div className="quiz-questions input-field col s9 offset-1">
              <select {...Respect}>
                <option
                  value=""
                  className="grey-text text-lighten-1"
                  disabled
                  selected
                >Select your answer...</option>
                <option value={100}>They think the two of you are soulmates</option>
                <option value={75}>They think s/he is good for you</option>
                <option value={50}>They are indifferent</option>
                <option value={25}>They have warned you about your partner and/or dont approve</option>
              </select>
            </div>
          </div>
          <div className="center-align">
            <button
            className="btn form-btn light-blue darken-1"
            type="button"
            disabled={submitting}
            onClick={previousPage}
            ><i className="material-icons left">skip_previous</i>Previous
            </button>
            <button
              className="btn form-btn light-blue darken-1"
              type="submit"
              disabled={submitting}
            ><i className="material-icons right">done</i>
            {submitting ? <i /> : <i />}Finish
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

FifthQuestion.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  postResponse: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  fields,                      // <------ all fields on last wizard page
  destroyOnUnmount: false,     // <------ preserve form data
}, mapStateToProps, actions)(FifthQuestion);
