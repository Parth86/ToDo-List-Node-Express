const Todo = require('../models/Todo')
const jwt = require('jsonwebtoken');

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({}, 'action createdBy status').populate('createdBy', 'name')
        res.status(200).json({todos})
    } catch (error) {
        console.error(error);
    }
}

const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            action: req.body.action,
            createdBy: req.body.user,
        })
        res.status(200).json({todo})
    } catch (error) {
        console.error(error);
        res.status(404).json(error)
    }
}

const getTodo = async (req, res) => {
    const id = req.params.id
    try {
        const todo = await Todo.findById(id)

        if(todo.createdBy != req.body.user){
            res.status(500).json({err: 'Not Authorised'})
        }

        res.status(200).json({todo})
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
        
    }
}

const updateTodo = async (req, res) => {
    const id = req.params.id
    const action = req.body.action

    try {
        const todo = await Todo.findById(id)

        if(todo.createdBy != req.body.user){
            res.status(500).json({err: 'Not Authorised'})
        }

        await todo.updateOne({
            action: action
        })
        res.status(200).json({todo})
    } catch (error) {
        console.error(error);
        res.status(404).json(error)   
    }
}

const deleteTodo = async (req, res) => {
    const id = req.params.id

    try {
        const todo = await Todo.findById(id)

        if(todo.createdBy != req.body.user){
            res.status(500).json({err: 'Not Authorised'})
        }

        await todo.deleteOne()
        res.status(200).json({todo})
    } catch (error) {
        console.error(error);
        res.status(404).json(error)   
    }
}

const changeStatus = async (req, res) => {
    const id = req.params.id
    try{
        const todo = await Todo.findById(id)
        if(todo.createdBy != req.body.user){
            res.status(500).json({err: 'Not Authorised'})
        }
        await todo.updateOne({
            status: (todo.status == 'Complete') ?  'Pending' : 'Complete'
        })
        const updatedTodo = await Todo.findById(id)
        res.status(200).json({todo: updatedTodo})
    } catch(error) {
        console.error(error);
        res.status(404).json(error)
    }
}

const getMyTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ createdBy: req.body.user}, 'action createdBy status').populate('createdBy', 'name')
        res.status(200).json({todos})
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
}
module.exports = {getAllTodos, createTodo, changeStatus, getTodo, updateTodo, deleteTodo, getMyTodos}