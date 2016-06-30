const express = require('express');
const router = express.Router();
const Todos = require(__dirname + '/../../db/index').db.todos;
const pgp = require(__dirname + '/../../db/index').pgp;

const listOfTodos = [
  {
    type: 'ADDED_TODO',
    id: 111,
    todo: "Todo numba 1",
  },

  {
  type: 'ADDED_TODO',
  id: 222,
  todo: "Todo number 2",
  },

  {
  type: 'ADDED_TODO',
  id: 333,
  todo: "Todo number 3",
  },
];

router.get('/todos/getAll', (req, res) => {
  res.send(listOfTodos).status(200);
});  

router.post('/todos/addTodo', (req, res) => {
  console.log("post - req.body", req.body);
  var todoId = new Date().getTime();
  var todoObject = {
    type: 'ADDED_TODO',
    id: todoId,
    todo: req.body.text,
  };
  listOfTodos.push(todoObject);
  res.send(listOfTodos).status(201);
});

router.delete('/todos/deleteTodo/:id', (req, res) => {
  console.log("delteTodo req.params.id", req.params.id);
  var id = req.params.id;
  for(var i = 0; i < listOfTodos.length; i++){
    if(listOfTodos[i].id === id) {
      listOfTodos.splice(i, 1);
      break;
    }
  }
  res.send(listOfTodos).status(200);
});
// // get all questions
// router.get('/questions', (req, res, next) => {
//   Questions.all()
//     .then(data => {
//       return res.status(200)
//         .json({
//           success: true,
//           data
//         });
//     })
// });

// get group of questions
// router.get('/questions/:frequency', (req, res, next) => {
//   Questions.findByFrequency(req.params.frequency)
//     .then(data => {
//       return res.status(200)
//         .json({
//           success: true,
//           data
//         });
//     })
// });

// // add new question and return newly added question
// router.post('/todos/add', (req, res, next) => {
//   const newQuestion = req.body;
//   /* format: 
//   {
//     question: str of question text, 
//     frequency: str of which set the question belongs to(initial, daily, quiz, ...), 
//     '{ answers: [ "choiceFoo", "choiceBar", ... ]}'
//   }
//   */
  




//   Questions.add(newQuestion)
//     .then(data => {
//       return res.status(200)
//         .json({
//           success: true,
//           data
//         });
//     })
//     .catch(err => {
//       res.json({
//         success: false,
//         error: err.message || err
//       });
//     });


// });

// // delete single question
// router.delete('/questions/:id', (req, res, next) => {
//   Questions.remove(req.params.id)
//     .then(data => {
//       return res.status(200)
//         .json({
//           success: true,
//           data
//         })
//     })
//     .catch(err => {
//       res.json({
//         success: false,
//         error: err.message || err
//       });
//     });
// });

module.exports = router;
