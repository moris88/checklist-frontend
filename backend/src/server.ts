import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getProject,
  register,
  login,
  logout,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
  authorizationMiddleware,
  generalPathMatch,
  errorHandler,
} from './functions'

const app = express() // create a new express application instance
dotenv.config() // load .env file
const { PORT, ORIGIN } = process.env // get environment variables

// Configuration of the options CORS
const corsOptions = {
  origin: ORIGIN, // Set allowed source
  methods: ['GET,PUT,DELETE,POST'], // Set allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Set allowed headers
}

// LIST OF MIDDLEWARES
app.use(cors(corsOptions)) // middleware with options CORS
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(authorizationMiddleware)
app.use(errorHandler as express.ErrorRequestHandler) // error handler middleware for catching unhandled errors

// LIST OF ROUTES v1
// PATHS Projects:
// GET /projects - get all projects
app.get('/api/v1/projects', getProjects)
// GET /project - get project
app.get('/api/v1/project/:id', getProject)
// POST /project - create a new project
app.post('/api/v1/project', createProject)
// PUT /project - update a project
app.put('/api/v1/project/:id', updateProject)
// DELETE /project - delete a project
app.delete('/api/v1/project/:id', deleteProject)
// PATHS Tasks:
// GET /tasks - get all tasks
app.get('/api/v1/tasks', getTasks)
// POST /task - create a new task
app.post('/api/v1/task/create', createTask)
// PUT /task - update a task
app.put('/api/v1/task/:id', updateTask)
// DELETE /task - delete a task
app.delete('/api/v1/task/:id', deleteTask)
// PATHS Users:
// GET /users - get all users
app.get('/api/v1/users', getUsers)
// POST /user - create a new user
app.post('/api/v1/user', createUser)
// PUT /user - update a user
app.put('/api/v1/user/:id', updateUser)
// DELETE /user - delete a user
app.delete('/api/v1/user/:id', deleteUser)
// PATHS Auth:
// POST /register
app.post('/api/v1/register', register)
// POST /login
app.post('/api/v1/login', login)
// POST /logout
app.post('/api/v1/logout', logout)
// GET /profiles
app.get('/api/v1/profiles', getProfiles)
// GET /profile
app.get('/api/v1/profiles/:id', getProfile)
// PUT /profile
app.put('/api/v1/profiles/:id', updateProfile)
// DELETE /profile
app.delete('/api/v1/profiles/:id', deleteProfile)

// (all other methods) /* - 404
app.all('*', generalPathMatch)

// Start the server
app.listen(PORT, () => {
  console.log('-->SERVER STARTED!')
  console.log(`Webservice listening on port ${PORT}`)
})
