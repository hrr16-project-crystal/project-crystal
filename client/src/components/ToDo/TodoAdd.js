import React, { PropTypes, Component } from 'react';
import * as actions from './todoAction';
import { connect } from 'react-redux';


class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.newTodo = this.newTodo.bind(this);
  }

  newTodo(newTodoProps){
    console.log("TodoAdd - newTodoProps", newTodoProps);

    this.props.postTodo(newTodoProps);
  }

  
  render(){
    console.log('this.props - TodoAdd3', this.props)
    return (

      <form onSubmit={() => this.newTodo(this.props.state)}>
        <input onChange={this.props.handleChange} type="text" value={this.props.state.text} placeholder="new to-do" autoFocus={true} />
        <button className="waves-effect waves-light btn" type="submit">Add to-do</button>
      </form>

    );
  }
};

TodoAdd.PropTypes = {};

const mapStateToProps = state => {
  let todoComponentProps = { 
    todos: state.todo.fetchTodos,
  }
  return todoComponentProps;
}

export default connect(mapStateToProps, actions)(TodoAdd)