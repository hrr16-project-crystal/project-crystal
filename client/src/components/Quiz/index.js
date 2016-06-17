import React, { Component } from 'react';
import './index.css';

class Quiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      //get from db later
      questions: [
        {id: 1, question: "Did you give your partner a compliment today?"},
        {id: 2, question: "Did you give your partner a hug today?"}, 
        {id: 3, question: "Did you help your partner in any way today?"}
      ]
    };
  }

  componentWillMount(){
    this.getQuestions();
  }

  //replace URL once available
  getQuestions(){
    $.ajax({
     type: 'GET',
     contentType: 'application/json',
     url: '/api/questions',
     success: questions => this.setState({ questions: questions }),
   });
  }

  postResponse(event){
    event.preventDefault();
    $.ajax({
       type: 'POST',
       contentType: 'application/json',
       url: '/api/user/questions/answered',
       data: JSON.stringify(data),
       success: data => {
         console.log('ajax called, postResponse sent');
       },
       error: function (data) {
         console.error('ajax called, postResponse failed');
       },
    });
  }

  render() {
    return (
      <div className="quiz-box">
        //need to pass id of question answered to post request
        <p>{this.state.questions.pop()}</p>
        <input type="submit" value="Yes" onClick={this.postResponse}>
        <input type="submit" value="No" onClick={this.postResponse}>
      </div>
    );
  }
}

Quiz.PropTypes = {};
Quiz.defaultProps = {};

export default Quiz;