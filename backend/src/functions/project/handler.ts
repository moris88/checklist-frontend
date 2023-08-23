import {
  checkObjects,
  formatResponseError,
  formatResponseWarning,
  formatResponse,
  generateLongId,
  readFile,
  writeFile,
  includes,
} from '../../libs'
import { Request, Response } from 'express'
import { Project } from '../../types/global'
import { getUserByToken } from '../../libs/token'

export function createProject(req: Request, res: Response) {
  try {
    const { project } = req.body as { project: Project }
    if (!project || Object.keys(project).length === 0 || !project.name) {
      return formatResponseError({
        message: 'Bad request',
        res,
      })
    }
    if (project.members && project.members.length > 0) {
      if (!checkObjects(project.members)) {
        return formatResponseError({
          message: 'Bad request',
          res,
        })
      }
    }
    const projects = readFile('projects') as Project[]
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      if (!includes('projects', 'StateProject', project.state)) {
        return formatResponseError({
          message: 'Forbidden',
          res,
        })
      }
      const newProject = {
        ...project,
        state: project.state ?? 'OPENED',
        owner: { id: myUser.id },
        id: generateLongId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      projects.push(newProject)
      console.log('projects', projects)
      if (writeFile(projects, 'projects')) {
        return formatResponse({
          message: 'CREATED',
          res,
          projects: [newProject],
        })
      }
    }
    return formatResponseError({
      message: 'Bad request',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function getProjects(req: Request, res: Response) {
  try {
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      const projects = readFile('projects') as Project[]
      const myProjects = projects.filter((p) => p.owner.id === myUser.id)
      return formatResponse({
        message: 'GET',
        res,
        projects: myProjects,
      })
    }
    return res.status(200).json(
      formatResponse({
        message: 'GET',
        res,
        projects: [],
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function getProject(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id) {
      return formatResponseError({
        message: 'Bad request',
        res,
      })
    }
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      const projects = readFile('projects') as Project[]
      const myProjects = projects.filter(
        (p) => p.owner.id === myUser.id && p.id === id
      )
      return formatResponse({
        message: 'GET',
        res,
        projects: myProjects,
      })
    }
    return formatResponse({
      message: 'GET',
      res,
      projects: [],
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id) {
      return formatResponseError({
        message: 'Bad request',
        res,
      })
    }
    const projects = readFile('projects') as Project[]
    const projectsSearch = projects.filter((p: Project) => p.id === id)
    if (projectsSearch.length === 0) {
      return formatResponseWarning({
        message: 'Resource not found',
        res,
      })
    }
    const newProjects = projects.filter((p: Project) => p.id !== id)
    if (!writeFile(newProjects, 'projects')) {
      throw new Error('Error deleting project')
    }
    return formatResponse({
      message: 'DELETED',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (Object.keys(req.body).length === 0) {
      return formatResponseError({
        message: 'Bad request',
        res,
      })
    }
    const { project } = req.body as { project: Project }
    if (!id || !project || Object.keys(project).length === 0) {
      return formatResponseError({
        message: 'Bad request',
        res,
      })
    }
    if (project.members && project.members.length > 0) {
      if (!checkObjects(project.members)) {
        return formatResponseError({
          message: 'Bad request',
          res,
        })
      }
    }
    const projects = readFile('projects') as Project[]
    const projectsSearch = projects.filter((p) => p.id === id)
    if (projectsSearch.length === 0) {
      return formatResponseWarning({
        message: 'Resource not found',
        res,
      })
    }
    if (!includes('projects', 'StateProject', project.state)) {
      return formatResponseError({
        message: 'Forbidden',
        res,
      })
    }
    const newProject: Project = {
      ...projectsSearch[0],
      ...project,
      updatedAt: new Date().toISOString(),
    }
    const newProjects = [...projects.filter((p) => p.id !== id), newProject]
    if (!writeFile(newProjects, 'projects')) {
      throw new Error('Error updating project')
    }
    return formatResponse({
      message: 'UPDATED',
      res,
      projects: [newProject],
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}
