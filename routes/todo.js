const {getAllTodos, createTodo, changeStatus,getTodo, updateTodo, deleteTodo, getMyTodos} = require('../controllers/todo')
const express = require('express');
const router = express.Router()

router.route('/').get(getMyTodos).post(createTodo)
router.route('/all').get(getAllTodos)
router.route('/:id').patch(changeStatus).get(getTodo).put(updateTodo).delete(deleteTodo)


module.exports = router