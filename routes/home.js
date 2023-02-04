const express = require('express');
const router = express.Router()
const {home, todos, register, myTodos} = require('../controllers/home');
const { createTodo } = require('../controllers/home');

router.route('/').get(home)
router.route('/todos').get(myTodos)
router.route('/register').get(register)
router.route('/todos/create').get(createTodo)


module.exports = router