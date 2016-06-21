import React, { PropTypes } from 'react';

const Question = (props) => {
  return (
    <div>
      <p>{props.question}</p>
      <label>
        <input type="radio" {...props.key} value="yes" checked={props.key === 'yes'} /> Yes
      </label>
      <label>
        <input type="radio" {...props.key} value="no" checked={props.key === 'no'} /> No
      </label>
    </div>
  );
};

Question.PropTypes = {};

export default Question;
