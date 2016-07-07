import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './todoAction';
import { Link } from 'react-router';
import moment from 'moment';
import './todo.css';

// Compare function to order the todos by start date (newest to oldest)
const compareFunc = (a, b) => {
  const first = Number(moment(a.created_at).format('x'));
  const second = Number(moment(b.created_at).format('x'));
  if (first > second) {
    return -1;
  } else if (first < second) {
    return 1;
  } else {
    return 0;
  }
};

class TodoCard extends Component {
  
  componentWillMount() {
    this.props.getTodos(this.props.user.data.couple_id);
  }

  // Render todos into boxes in the Todo card
  renderTodos() {
    const sortedTodos = this.props.todos.sort(compareFunc);

    return sortedTodos.splice(0, 3).map((todoObj, index) => {
      const date = moment(todoObj.created_at).format('MMMM Do @ h:mmA');
      return (
        <div key={`todo-${index}`} className="col s12 m6 l4">
          <div className="card ternaryColor">
            <div className="card-content">
              <Link to="/todo">
                  <div className="our-card-title black-text">{todoObj.content}</div>
                  <p className="black-text">{date}</p>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    // If there are no todos yet, load a spinner
    if (!this.props.todos) {
      return (
        <div className="center-align todo-spinner">
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
    // Call the renderTodos function and place each todo into the todo card
    return (
      <div className="col s12 m6 l6">
        <div className="card white card-height">
          <h5 className="center-align card__header">Recent To-do's</h5>
          <div className="card-content">
            <div className="row">
              {this.renderTodos()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { todos: state.todo.fetchTodos, user: state.auth.user };
};

export default connect(mapStateToProps, actions)(TodoCard);
