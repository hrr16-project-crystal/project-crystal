import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './todoAction';
import Header from '../App/Header';
import TodoAdd from './TodoAdd';
import './todo.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillMount() {
    this.props.getTodos(this.props.user.data.couple_id);
  }

  handleChange(e){
    this.setState({text: e.target.value});
  }
  
  render(){
    console.log('this.props.todos', this.props.todos)
    if (!this.props.todos) {
      return (
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
      );
    }

    return (
      <div>
        <Header />
        <TodoAdd handleChange={this.handleChange} state={this.state}/>
        <ul>

          {this.props.todos.map(todo => {
            return (
              <div>
                <li>
                  <p>{todo.content}</p>
                </li>
                <div onClick={() => this.props.deleteTodo(todo.todo_id)}>
                  <button>delete</button>
                </div>
              </div>
            )
          })}

        </ul>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return { todos: state.todo.fetchTodos, user: state.auth.user };
};

export default connect(mapStateToProps, actions)(TodoList);
