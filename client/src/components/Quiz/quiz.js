import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from './quizAction';
import './quiz.css';

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
            <select className="quiz-questions" {...fields[question.question_id]}>
              <option>Select your answer...</option>
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
    let result = {};
    // for (var key in formProps) {
    //   let count;
    //   let tempArr = formProps[key] ? formProps[key].split(',') : [];
    //   if (!result[tempArr[0]]) {
    //     result[tempArr[0]] = [+tempArr[1], 1];

    //   } else {
    //     result[tempArr[0]][0] += +tempArr[1];
    //     result[tempArr[0]][1]++;
    //   }
    // }

    result = {
      user_id: 9, // We will access this from redux store and redux store will save this after signin/signup
      Respect: 69,
      Spontaneity: 58,
      Intimacy: 50,
      Generosity: 25,
      Total: 62,
    };
    console.log('After running math func....');
    console.log(result);
    this.props.postResponse(result);
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
  return { questions: state.quiz.questions, user: state.auth.user };
};

export default reduxForm({
  form: 'answers',
  fields: ['6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22'],
}, mapStateToProps, actions)(Quiz);
