const express = require('express');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

const homeRouter = require('./routes/home')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')

const authentication  = require('./middlewares/authentication')

const connectDB = require('./db/connect')

app.use(express.static(__dirname + '/assets'));
app.use(express.json())
// app.engine('.html', require('ejs').renderFile);

//routes
app.use('/', homeRouter)
app.use('/api/v1/todos', authentication, todoRouter)
app.use('/api/v1/users', userRouter)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        // console.log('connected to DB', )
        app.listen(port, () => {
            console.log('app running')
        })
    } catch (error) {
        console.error(error);
    }
}

start()

