import React, { Component } from 'react';
import * as actions from './todoAction';
import './todo.css';
import Header from '../App/Header';

class ToDo extends Component {
  constructor(props) {
    super(props);

  }

  // componentWillMount() {
  //   this.props.getTodos();
  // }

  render() {
    return (
      <div className="teal lighten-5">
        <Header />
        <div className="todo">
          <div className="todo__overlay">
            <div className="container">
              <h3 className="todo__mainTitle">Shared todos never felt so good</h3>
              <a className="todo__addBtn btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
              <div className="divider divide"></div>
              <ul className="collection">
                <div className="todo__todo">
                  <li className="collection-item">ToDo here</li><button className="waves-effect waves-light btn" type="submit">Bye-Bye</button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return { todos: state.todos, user: state.auth.user };
};

export default ToDo;

