import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './todoAction';
import Header from '../App/Header';
import Footer from '../App/Footer';
import TodoAdd from './TodoAdd';
import './todo.css';
import moment from 'moment';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.getTodos(this.props.user.data.couple_id);
  }

  handleChange(e){
    this.setState({text: e.target.value});
  }
  
  render(){
    console.log('this.props.todos', this.props.todos);
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
        <div className="todo">
          <div className="todo__overlay">
          <h3 className='todo__mainTitle'>Shared to-do's never felt so good</h3>
          
          <div>
            <TodoAdd handleChange={this.handleChange} state={this.state} />
            <ul className='todo__item'>
              {this.props.todos.map(todo => {
                const date = moment(todo.created_at).format('MMMM Do @ h:mmA');
                return (
                  <div key={todo.todo_id}>
                    <li className='todo__content'>
                      <div className='todo__item__text'>{todo.content}</div>
                      <div className='todo__createdAt'>created: {date}</div>
                      <div onClick={() => this.props.deleteTodo(todo.todo_id)}>
                        <button className="todo__delete waves-effect waves-light">delete</button>
                      </div>
                    </li>
                  </div> 
                )
              })}
            </ul>
          </div>
          
          </div>
        </div>
        <Footer />
      </div>
    )
  }
};

const mapStateToProps = state => {
  return { todos: state.todo.fetchTodos, user: state.auth.user };
};

export default connect(mapStateToProps, actions)(TodoList);
