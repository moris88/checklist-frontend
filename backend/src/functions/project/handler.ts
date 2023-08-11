import { formatResponse, generateLongId, readFile, writeFile } from '../../libs'
import { Request, Response } from 'express'
import { Project } from '../../types/global'
import { getUserByToken } from '../../libs/token'

export function createProject(req: Request, res: Response) {
  try {
    const { project } = req.body as { project: Project }
    if (!project || Object.keys(project).length === 0 || !project.name) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const projects = readFile('projects') as Project[]
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      console.log('project', project)
      const newProject = {
        ...project,
        owner: { id: myUser.id },
        id: generateLongId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      projects.push(newProject)
      console.log('projects', projects)
      if (writeFile(projects, 'projects')) {
        return formatResponse({
          codice: 'S06',
          res,
          projects: [newProject],
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
      const myProjects = projects.filter((p) => p.owner.id === myUser.id)
      return formatResponse({
        codice: 'S07',
        res,
        projects: myProjects,
      })
    }
    return res.status(200).json(
      formatResponse({
        codice: 'S07',
        res,
        projects: [],
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
      const myProjects = projects.filter((p) => p.owner.id === myUser.id)
      return formatResponse({
        codice: 'S07',
        res,
        projects: myProjects,
      })
    }
    return formatResponse({
      codice: 'S07',
      res,
      projects: [],
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
    const { id } = req.params
    if (!id) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const projects = readFile('projects') as Project[]
    const projectsSearch = projects.filter((p: Project) => p.id === id)
    if (projectsSearch.length === 0) {
      return formatResponse({
        codice: 'W06',
        res,
      })
    }
    const newProjects = projectsSearch.filter((p: Project) => p.id !== id)
    if (!writeFile(newProjects, 'projects')) {
      throw new Error('Error deleting project')
    }
    return formatResponse({
      codice: 'S17',
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
    const { id } = req.params
    if (!id || Object.keys(req.body).length === 0) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const { project } = req.body as { project: Project }
    const projects = readFile('projects') as Project[]
    const projectsSearch = projects.filter((p: Project) => p.id === id)
    if (projectsSearch.length === 0) {
      return formatResponse({
        codice: 'W06',
        res,
      })
    }
    const newProject: Project = {
      ...projectsSearch[0],
      ...project,
      updatedAt: new Date().toISOString(),
    }
    const newProjects = [
      ...projects.filter((p: Project) => p.id !== id),
      newProject,
    ]
    if (!writeFile(newProjects, 'members')) {
      throw new Error('Error updating project')
    }
    return formatResponse({
      codice: 'S18',
      res,
      projects: [newProject],
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}
