import React, { Component } from 'react';
import * as actions from './todoAction';
import './todo.css';
import Header from '../App/Header';
import { reduxForm } from 'redux-form';


class ToDo extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.trashTodo = this.trashTodo.bind(this);
  }

  // handleChange: function (event) {
  //   this.setState({newTodo: event.target.value});
  // },

  // handleNewTodoKeyDown: function (event) {
  //   if (event.keyCode !== ENTER_KEY) {
  //     return;
  //   }

  //   event.preventDefault();

  //   var val = this.props.todos.trim();

  //   if (val) {
  //     this.props.model.addTodo(val);
  //     this.setState({newTodo: ''});
  //   }
  // },

  handleFormSubmit(formPropsTheform) {
    console.log("handle - formProps", formPropsTheform);
    let postForm = this.props.addTodo(formPropsTheform.text);
    this.props.postTodo(postForm);
  }

  trashTodo(trashProps) {
    console.log("Trash todo trashProps", trashProps);
    this.props.deleteTodo(trashProps);
  }

  componentWillMount() {
    this.props.getTodos();
  }


  renderTodos() {
    const { 
      fields,
      handleSubmit 
    } = this.props;
    return this.props.todos.map(todo => {
      return (
        <div key={todo.id}>
          <ul className="collection">
            <li className="collection-item" {...fields[todo.id]}>
              <div>{todo.todo}
                <a href="#!" className="secondary-content">

                  <form onSubmit={handleSubmit(this.trashTodo)} {...fields[todo.id]}>
                    <button className="waves-effect waves-light btn" type="submit">
                      <i className="material-icons red">delete</i>
                    </button>
                  </form>

                </a>
              </div>
            </li>
          </ul>
        </div>
      );
    });
  }


  render() {
    const {
    fields: { text },
    handleSubmit,
    resetForm
    } = this.props

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
      <div className="teal lighten-5">
        <Header />
        <div className="todo">
          <div className="todo__overlay">
            <h3 className="todo__mainTitle">Shared todos never felt so good</h3>


            <form id:onSubmit={handleSubmit(this.handleFormSubmit)}>
              <input type="text" placeholder="add to-do" autoFocus={true} {...text}/>
              <button className="waves-effect waves-light btn" type="submit">Add to-do</button>
            </form>
            

            {this.renderTodos()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { todos: state.todo.fetchTodos, user: state.auth.user };
}

export default reduxForm({
  form: 'simpleTodos',
  fields: [ 'text' ],
}, mapStateToProps, actions)(ToDo);

export default ToDo

// <div className="divider divide"></div>

            // <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            //   <div className="row todo__list">
            //     <div className="row">
            //       <div className="input-field col s6">
            //         <i className="material-icons prefix">mode_edit</i>
            //         <input
            //           type="text"
            //           {...text}
            //           className="materialize-textarea"
            //           id="icon_prefix2"
            //           placeholder="add to-do"
            //           autoFocus={true}
            //           onKeyDown={this.handleNewTodoKeyDown}
            //           onChange={this.handleChange}
                      
            //         />
            //         <button type="submit" onClick={resetForm}><a className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a></button>
            //       </div>
            //     </div>
            //   </div>
            // </form>
