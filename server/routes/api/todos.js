const express = require('express');
const router = express.Router();
const Todos = require(__dirname + '/../../db/index').db.todos;
const pgp = require(__dirname + '/../../db/index').pgp;

// get todos for couple by coupleID
router.get('/todos/:id', (req, res) => {
  const coupleID = parseInt(req.params.id);
  Todos.findById(coupleID)
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data,
        });
    });
});  

// Add new todo and return newly added todo
router.post('/todos/addTodo', (req, res) => {
  const newTodo = req.body;
  // update syntax to work with DB schema design
  newTodo.couple_id = newTodo.coupleID;

  Todos.add(newTodo)
    .then(data => {
      return res.status(201)
        .json({
          success: true,
          data,
        });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message || err,
      });
    });
});

// Delete single todo
router.delete('/todos/deleteTodo/:id', (req, res) => {
  const todoID = parseInt(req.params.id);
  Events.remove(todoID)
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data,
        });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message || err,
      });
    });
});

module.exports = router;
