import React, { PropTypes } from 'react';

const Question = (props) => {
  return (
    <div>
      <p>{props.question}</p>
    </div>
  );
};

Question.PropTypes = {};

export default Question;
