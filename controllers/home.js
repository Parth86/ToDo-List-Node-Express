const home = (req, res) => {
    res.send('Home Controller')
}

const todos = (req, res) => {
    res.status(200).render('Todos/todos.ejs')
}

const register = (req, res) => {
    res.status(200).render('User/register.ejs')
}

const createTodo = (req, res) => {
    res.status(200).render('Todos/createTodo.ejs')
}

const myTodos = (req, res) => {
    res.status(200).render('Todos/myTodos.ejs')
}

module.exports = {home, todos, register, createTodo, myTodos}