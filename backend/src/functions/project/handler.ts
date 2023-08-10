import { formatResponse, generateLongId, readFile, writeFile } from '../../libs'
import { Request, Response } from 'express'
import { Project } from '../../types/global'
import { getUserByToken } from '../../libs/token'

export function createProject(req: Request, res: Response) {
  try {
    if (Object.keys(req.body).length === 0 || !req.body.name) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const { project } = req.body as { project: Project }
    const projects = readFile('projects') as Project[]
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      projects.push({
        ...project,
        owner: { id: myUser.id },
        id: generateLongId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      if (writeFile(projects, 'projects')) {
        return formatResponse({
          codice: 'S06',
          res,
          projects: [project],
          count: 1,
        })
      }
    }
    return formatResponse({
      codice: 'E04',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
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
      return formatResponse({
        codice: 'S07',
        res,
        projects: myProjects,
        count: myProjects.length,
      })
    }
    return res.status(200).json(
      formatResponse({
        codice: 'S07',
        res,
        projects: [],
        count: 0,
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
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
      return formatResponse({
        codice: 'S07',
        res,
        projects: myProjects,
        count: myProjects.length,
      })
    }
    return formatResponse({
      codice: 'S07',
      res,
      projects: [],
      count: 0,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}

export function deleteProject(req: Request, res: Response) {
  try {
    return formatResponse({
      codice: 'E01',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}

export function updateProject(req: Request, res: Response) {
  try {
    return formatResponse({
      codice: 'E01',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}
