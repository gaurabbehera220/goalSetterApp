const express = require('express');
const dotenv = require('dotenv').config({ path: '/home/gaurab/Desktop/MERN_PROJECT_FOLDER_001/mern_goals_project/Goal_setter_app_01/.env'});
const colors = require('colors');
const port = process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDb = require('./config/db')

connectDb()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/goals', require('./Routes/goalRoutes'))
app.use('/api/users', require('./Routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`));