import express from 'express'
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

const app = express() // create a new express application instance
dotenv.config() // load .env file

const { PORT, ORIGIN, XAPIKEY, PATHDB } = process.env // get environment variables

console.log('PORT:', PORT)
console.log('ORIGIN:', ORIGIN)
console.log('XAPIKEY:', XAPIKEY)
console.log('PATHDB:', PATHDB)

// Configuration of the options CORS
const corsOptions = {
  origin: ORIGIN, // Set allowed source
  methods: ['POST'], // Set allowed methods
  allowedHeaders: ['Content-Type', 'xapikey'], // Set allowed headers
}

// LIST OF MIDDLEWARES
app.use(cors(corsOptions)) // middleware with options CORS
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(apiKeyMiddleware)

function apiKeyMiddleware(req: Request, res: Response, next: any) {
  console.log('--------------')
  console.log(`New request! - Path: ${req.path}`)
  const xapikey = req.headers?.['xapikey'] ?? null
  console.log('xapikey:', xapikey)
  if (XAPIKEY === xapikey) {
    console.log('ACCESS GRANTED')
    next()
  } else {
    console.log('ACCESS DENIED - NOT AUTHORIZED')
    res.status(401).json(
      formatResponse({
        statusText: 'ERROR',
        status: 401,
        error: 'not authorized',
      })
    )
  }
}

// PATHS Projects:
// GET /projects - get all projects
app.get('/projects', getProjects)
// POST /project - create a new project
app.post('/project', createProject)
// PUT /project - update a project
app.put('/project/:id', updateProject)
// DELETE /project - delete a project
app.delete('/project/:id', deleteProject)

// PATHS Tasks:
// GET /tasks - get all tasks
app.get('/tasks', getTasks)
// POST /task - create a new task
app.post('/task/create', createTask)
// PUT /task - update a task
app.put('/task/:id', updateTask)
// DELETE /task - delete a task
app.delete('/task/:id', deleteTask)

// PATHS Users:
// GET /users - get all users
app.get('/users', getUsers)
// POST /user - create a new user
app.post('/user', createUser)
// PUT /user - update a user
app.put('/user/:id', updateUser)
// DELETE /user - delete a user
app.delete('/user/:id', deleteUser)

// (all other methods) /* - 404
app.all('*', generalPathMatch)

function generalPathMatch(req: Request, res: Response) {
  console.log('REQUEST REJECTED - PATH NOT FOUND')
  res.status(404).json(
    formatResponse({
      statusText: 'ERROR',
      status: 404,
      error: 'path not found',
    })
  )
  // console.timeEnd('Request')
}

app.use(errorHandler as express.ErrorRequestHandler)
// Middleware for catching unhandled errors
function errorHandler(err: Error, req: Request, res: Response) {
  // Log the error
  console.log(err.message, { error: err })
  // Respond with an error message to the client
  res.status(500).json(
    formatResponse({
      statusText: 'ERROR',
      status: 500,
      error: 'Internal Server Error',
    })
  )
}

// Start the server
app.listen(PORT, () => {
  console.log(`Webservices listening on port ${PORT}`)
})
