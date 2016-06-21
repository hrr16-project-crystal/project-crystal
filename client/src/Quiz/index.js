import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from './QuizActions';
import './index.css';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getQuestions();
  }

  renderQuestions() {
    const { fields } = this.props;
    return this.props.questions.map(question => {
      return (
        <div>
          <h2>{question.body}</h2>
          <label>
            <input type="radio" {...fields[question.id]} value="yes" />Yes
          </label>
          <label>
            <input type="radio" {...fields[question.id]} value="no" />No
          </label>
        </div>
      );
    });
  }

  handleFormSubmit(formProps) {
    this.props.postResponse(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    if (!this.props.questions) {
      return <div>Loading...</div>;
    }

    return (
      <div className="quiz-box">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          {this.renderQuestions()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// Quiz.PropTypes = {};
// Quiz.defaultProps = {};

const mapStateToProps = state => {
  return { questions: state.quiz.questions };
};

export default reduxForm({
  form: 'answers',
  fields: ['hug', 'kiss'],
}, mapStateToProps, actions)(Quiz);