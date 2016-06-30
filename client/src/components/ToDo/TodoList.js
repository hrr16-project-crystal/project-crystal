import React, { Component } from 'react';
import * as actions from './todoAction';
import './todo.css';
import Header from '../App/Header';
import SingleTodo from './SingleTodo';
import { connect } from 'react-redux';
//import singletodo?

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillMount() {
    this.props.getTodos();
  }

  handleChange(e){
    this.setState({text: e.target.value});
    console.log('this.state', this.state);
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

    return(
      <div>
        <Header />

        <form onSubmit={() => this.props.postTodo(this.state)}>
          <input onChange={this.handleChange} type="text" value={this.state.text} placeholder="new to-do" autoFocus={true} />
          <button className="waves-effect waves-light btn" type="submit">Add to-do</button>
        </form>

        <ul>
          {this.props.todos.map(todo => {
            return <SingleTodo id={todo.id} key={todo.id} todoText={todo.todo} deleteTodo={this.props.deleteTodo} />
          })}
        </ul>

      </div>
    )
  }

}

const mapStateToProps = state => {
  let todoComponentProps = { 
    todos: state.todo.fetchTodos,
  }
  return todoComponentProps;
}

// const mapDispatchToProps = reduxDispatch => {
//   let todoComponentProps = {
//     deleteTodoAction: actions.deleteTodo,
//     getTodosAction: actions.getTodos,
//     postTodoAction: actions.postTodo,
//   }
//   return todoComponentProps;
// }

export default connect(mapStateToProps, actions)(TodoList)

// class ToDo extends Component {
//   constructor(props) {
//     super(props);
//     this.newTodo = this.newTodo.bind(this);
//     this.trashTodo = this.trashTodo.bind(this);
//   }

//   componentWillMount() {
//     this.props.getTodos();
//   }

//   newTodo(newTodoProps) {
//     console.log("handle - newTodoProps", newTodoProps);
//     let todoId = new Date().getTime();
//     console.log("newTodo - todoId", todoId);
    
//     let todoObject = {
//       type: 'ADDED_TODO',
//       todoId: todoId,
//       todo: newTodoProps.text,
//     };
//     console.log("newTodo - todoObject", todoObject);

//     this.props.postTodo(todoObject);
//   }

//   trashTodo(trashProps) {
//     console.log("Trash todo trashProps", trashProps);
//     this.props.deleteTodo(trashProps);
//   }

//   renderTodos() {
//     const { 
//       fields,
//       handleSubmit 
//     } = this.props;
//     return this.props.todos.map(todo => {
//       return (
        
//       );
//     });
//   }


//   render() {
//     const {
//     fields: { text },
//     handleSubmit,
//     resetForm
//     } = this.props

//     if (!this.props.todos) {
//       return (
//         <div className="preloader-wrapper big active">
//           <div className="spinner-layer spinner-blue-only">
//             <div className="circle-clipper left">
//               <div className="circle"></div>
//             </div><div className="gap-patch">
//               <div className="circle"></div>
//             </div><div className="circle-clipper right">
//               <div className="circle"></div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="teal lighten-5">
//         <Header />
//         <div className="todo">
//           <div className="todo__overlay">
//             <h3 className="todo__mainTitle">Shared todos never felt so good</h3>


//             <form onSubmit={handleSubmit(this.newTodo)}>
//               <input type="text" placeholder="add to-do" autoFocus={true} {...text}/>
//               <button className="waves-effect waves-light btn" type="submit">Add to-do</button>
//             </form>
            

//             {this.renderTodos()}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return { todos: state.todo.fetchTodos, user: state.auth.user };
// }

// export default ToDo

// export default reduxForm({
//   form: 'simpleTodos',
//   fields: [ 'text', 'todoId' ],
// }, mapStateToProps, actions)(ToDo);

// <div className="divider divide"></div>

            // <form onSubmit={handleSubmit(this.newTodo)}>
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
