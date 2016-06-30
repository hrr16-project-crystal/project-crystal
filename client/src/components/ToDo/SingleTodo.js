import React, { PropTypes, Component } from 'react';
import * as actions from './todoAction';
import { connect } from 'react-redux';


class SingleToDo extends Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    console.log('this.props', this.props)
    return (
      <li onClick={() => this.props.deleteTodo(this.props.id)}>
        <p>{this.props.todoText}</p>
        <button>delete</button>
      </li>
    );
  }
};

SingleToDo.PropTypes = {};

// const mapStateToProps = state => {
//   let todoComponentProps = { 
//     todos: state.todo.fetchTodos,
//   }
//   return todoComponentProps;
// }

export default connect(null, actions)(SingleToDo)



// const SingleToDo = props => {
//   return (
//     <li>
//       <p>{props.todoText}</p>
//       <button onClick={props.deleteTodo}>delete</button>
//     </li>
//   );
// };

    // <div>
    //   <p>{this.props.question}</p>
    // </div>

    //     <li className="collection-item">
    //       <div>
    //         <a href="#!" className="secondary-content">

    //           <form onSubmit={handleSubmit(this.trashTodo)}>
    //             <button className="waves-effect waves-light btn" type="submit">
    //               <i className="material-icons red">delete</i>
    //             </button>
    //           </form>

    //         </a>
    //       </div>
    //     </li>
