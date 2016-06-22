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
    return this.props.questions.data.map(question => {
      return (
        <div>
          <label>{question.body}</label>
          <div>
            <select className="quiz-questions" {...fields[question.tag]}>
              <option></option>
              <option value={20}>{question.answers.answers[0]}</option>
              <option value={15}>{question.answers.answers[1]}</option>
              <option value={10}>{question.answers.answers[2]}</option>
              <option value={5}>{question.answers.answers[3]}</option>
            </select>
          </div>
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

const mapStateToProps = state => {
  return { questions: state.quiz.questions };
};

export default reduxForm({
  form: 'answers',
  fields: ['friendsFamily', 'finances', 'pastRelationships', 'lifePicture', 'celebrate'],
}, mapStateToProps, actions)(Quiz);