import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from './QuizActions';
import { Link, browserHistory } from 'react-router';
import Header from '../App/Header';
import './index.css';
import Header from '../App/Header';

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
        <div className="row" key={question.question_id}>
          <div className="quiz-questions col s10 offset-1">
          <label>{question.body}</label>
            <select className="quiz-questions col s10 offset-1" {...fields[question.question_id]}>
              <option className="tip">Select your answer...</option>
              <option value={[question.category, 20]}>{question.answers.answers[0]}</option>
              <option value={[question.category, 15]}>{question.answers.answers[1]}</option>
              <option value={[question.category, 10]}>{question.answers.answers[2]}</option>
              <option value={[question.category, 5]}>{question.answers.answers[3]}</option>
            </select>
          </div>
        </div>
      );
    });
  }

  handleFormSubmit(formProps) {

    const result = {};
    for (var key in formProps) {
      const tempArr = formProps[key] ? formProps[key].split(',') : [];
      if (!result[tempArr[0]]) {
        result[tempArr[0]] = [+tempArr[1], 1];
      } else {
        result[tempArr[0]][0] += +tempArr[1];
        result[tempArr[0]][1]++;
      }
    }
    let total = 0;
    let userTotal = 0;
    for (var key in result) {
      userTotal += result[key][0];
      total += result[key][1];
      result[key] = Math.floor((result[key][0] / (result[key][1] * 20)) * 100);
    }
    result.Total = Math.floor((userTotal / (total * 20)) * 100);
    result.user_id = this.props.user.user_id;
    this.props.postResponse(result);
    // This works, but the health meter doesn't display scores until you  go home then back to dashboard
    // Issue with the data being 0 immediately... 
    browserHistory.push('/dashboard');
  }

  render() {
    const { handleSubmit } = this.props;

    if (!this.props.questions) {
      return <div>Loading...</div>;
    }

    return (
      <div className="teal lighten-5">
        <Header />
        <h2>Let's get to know you...</h2>
        <div className="quiz-box container">
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            {this.renderQuestions()}
            <button className="waves-effect waves-light btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { questions: state.quiz.questions, user: state.auth.user };
};

export default reduxForm({
  form: 'answers',
  fields: [
    '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
  ],
}, mapStateToProps, actions)(Quiz);
