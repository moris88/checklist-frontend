import express, { NextFunction } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { formatResponse } from './libs'
import cors from 'cors'
import { Request, Response } from 'express'
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
} from './functions'
import { register, login, logout, getProfiles, getProfile } from './functions/auth'
import { checkToken } from './libs/token'

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

app.use(apiKeyMiddleware)

function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('--------------')
  console.log(`-->New request! - Path: ${req.path}`)
  if (
    !['/api/v1/login', '/api/v1/register', '/api/v1/logout'].includes(req.path)
  ) {
    const bearerToken = req.headers?.authorization ?? null
    console.log('Authorization:', bearerToken)
    if (bearerToken) {
      if (checkToken(bearerToken as string)) {
        console.log('-->ACCESS GRANTED')
        next()
        return
      }
    }
    console.log('-->ACCESS DENIED - NOT AUTHORIZED')
    return res.status(401).json(
      formatResponse({
        statusText: 'ERROR',
        status: 401,
        error: 'not authorized',
      })
    )
  }
  next()
  return
}

// PATHS Projects:
// GET /projects - get all projects
app.get('/api/v1/projects', getProjects)
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

// (all other methods) /* - 404
app.all('*', generalPathMatch)

function generalPathMatch(req: Request, res: Response) {
  console.log('REQUEST REJECTED - PATH NOT FOUND')
  return res.status(404).json(
    formatResponse({
      statusText: 'ERROR',
      status: 404,
      error: 'path not found',
    })
  )
}

app.use(errorHandler as express.ErrorRequestHandler)
// Middleware for catching unhandled errors
function errorHandler(err: Error, req: Request, res: Response) {
  // Log the error
  console.log(err.message, { error: err })
  // Respond with an error message to the client
  return res.status(500).json(
    formatResponse({
      statusText: 'ERROR',
      status: 500,
      error: 'Internal Server Error',
    })
  )
}

// Start the server
app.listen(PORT, () => {
  console.log('-->SERVER STARTED!')
  console.log(`Webservice listening on port ${PORT}`)
})
