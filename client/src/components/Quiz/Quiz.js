import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './quizAction';
import './quiz.css';
<<<<<<< 27ba9b9cbcc75b2ea56f13c68a7010d0634b11e9
import { browserHistory } from 'react-router';
=======
import { Link, browserHistory } from 'react-router';
>>>>>>> Refactor directory
import Header from '../App/Header';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getQuestions();
  }

  handleFormSubmit(formProps) {

    const result = {};
    for (const key in formProps) {
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
    for (const key in result) {
      userTotal += result[key][0];
      total += result[key][1];
      result[key] = Math.floor((result[key][0] / (result[key][1] * 20)) * 100);
    }
    result.Total = Math.floor((userTotal / (total * 20)) * 100);
    result.user_id = this.props.user.data.user_id;
    this.props.postResponse(result);

    setTimeout(() => {
      browserHistory.push('/dashboard');
    }, 1000);
  }

  renderQuestions() {
    const { fields } = this.props;
    return this.props.questions.data.map(question => {
      return (
        <div className="row" key={question.question_id}>
            <label>{question.body}</label>
          <div className="quiz-questions input-field col s10 offset-1">
            <select className="quiz-questions col s10 offset-1" {...fields[question.question_id]}>
              <option value='' className="grey-text text-lighten-1" disabled selected>Select your answer...</option>
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

  render() {
    const { handleSubmit } = this.props;

    if (!this.props.questions) {
      return (
        <div className="center-align quiz-spinner">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="teal lighten-5">
        <Header />
        <div className="quiz-box container">
          <h2>Let's get to know you...</h2>
          <p>Answer these questions below to allow us to get a snapshot of where your
          relation is right now. Please take your time and answer these questions honestly. SparkQ
          is here to help YOU!</p>
          <div className="divider divide"></div>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            {this.renderQuestions()}
            <button className="waves-effect waves-light btn" type="submit">Submit</button>
          </form>
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
