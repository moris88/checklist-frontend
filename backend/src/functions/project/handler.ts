import {
  formatResponse,
  generateLongId,
  readFile,
  writeFile,
} from '../../libs/utils'
import { Request, Response } from 'express'
import { Project } from '../../types/global'
import { getUserByToken } from '../../libs/token'

export function createProject(req: Request, res: Response) {
  try {
    console.log('-->createProject', req.body)
    if (Object.keys(req.body).length === 0) {
      console.log('Create Project: No Body')
      return res.status(400).json(
        formatResponse({
          status: 400,
          statusText: 'ERROR',
          error: 'No Body',
        })
      )
    } else if (!req.body.name) {
      console.log('Create Project: No Param name')
      return res.status(400).json(
        formatResponse({
          status: 400,
          statusText: 'ERROR',
          error: 'No Param name',
        })
      )
    }
    const project = req.body as Project
    const projects = readFile('projects')
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      project.owner = { id: myUser.id }
      project.id = generateLongId()
      project.createdAt = new Date().toISOString()
      project.updatedAt = new Date().toISOString()
      projects.push(project)
      if (writeFile(projects, 'projects')) {
        console.log('SUCCESS: Create Project')
        return res.status(201).json(
          formatResponse({
            statusText: 'SUCCESS',
            status: 201,
            message: 'Project created successfully',
            id: project.id,
          })
        )
      }
    }
    return res.status(400).json(
      formatResponse({
        status: 400,
        statusText: 'ERROR',
        error: 'Bad request',
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(500).json(
      formatResponse({
        status: 500,
        statusText: 'ERROR',
        error: 'Internal server error',
      })
    )
  }
}

export function getProjects(req: Request, res: Response) {
  try {
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      const projects = readFile('projects') as Project[]
      const myProjects = projects.filter(
        (project) => project.owner.id === myUser.id
      )
      return res.status(200).json(
        formatResponse({
          statusText: 'SUCCESS',
          status: 200,
          projects: myProjects,
          count: myProjects.length,
        })
      )
    }
    return res.status(200).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 200,
        projects: [],
        count: 0,
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(500).json(
      formatResponse({
        statusText: 'ERROR',
        status: 500,
        error: 'Internal server error',
      })
    )
  }
}

export function getProject(req: Request, res: Response) {
  try {
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      const projects = readFile('projects') as Project[]
      const myProjects = projects.filter(
        (project) => project.owner.id === myUser.id
      )
      return res.status(200).json(
        formatResponse({
          statusText: 'SUCCESS',
          status: 200,
          projects: myProjects,
          count: myProjects.length,
        })
      )
    }
    return res.status(200).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 200,
        projects: [],
        count: 0,
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(500).json(
      formatResponse({
        statusText: 'ERROR',
        status: 500,
        error: 'Internal server error',
      })
    )
  }
}

export function deleteProject(req: Request, res: Response) {
  try {
    console.log('deleteProject')
    console.log('SUCCESS: Delete project')

    return res.status(204).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 204,
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(500).json(
      formatResponse({
        statusText: 'ERROR',
        status: 500,
        error: 'Internal server error',
      })
    )
  }
}

export function updateProject(req: Request, res: Response) {
  try {
    console.log('updateProject')
    console.log('SUCCESS: Update Project')

    return res.status(200).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 200,
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(200).json(
      formatResponse({
        statusText: 'ERROR',
        status: 500,
        error: 'Internal server error',
      })
    )
  }
}
