import React, { PropTypes, Component } from 'react';
import * as actions from './todoAction';
import { connect } from 'react-redux';
import './todo.css';

class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.newTodo = this.newTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  newTodo(newTodoProps){
    console.log('this.props.user', this.props.user)
    this.props.postTodo({ content: newTodoProps.text, couple_id: this.props.user.data.couple_id});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.newTodo(this.props.state);
  }
  
  render(){
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input className='todo__input' onChange={this.props.handleChange} type="text" value={this.props.state.text} placeholder="new to-do" autoFocus={true} />
          <button className="waves-effect waves-light btn" type="submit">Add to-do</button>
        </form>
      </div>
    );
  }
};

TodoAdd.PropTypes = {};

const mapStateToProps = state => {
  return { todos: state.todo.fetchTodos, user: state.auth.user };
}

export default connect(mapStateToProps, actions)(TodoAdd)