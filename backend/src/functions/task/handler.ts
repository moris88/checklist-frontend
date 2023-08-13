import {
  checkObjects,
  formatResponse,
  generateLongId,
  getUserByToken,
  readFile,
  writeFile,
} from '../../libs'
import { Request, Response } from 'express'
import { Task } from '../../types/global'

export async function createTask(req: Request, res: Response) {
  try {
    if (Object.keys(req.body).length === 0) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const { task } = req.body as { task: Task }
    if (
      !task ||
      Object.keys(task).length === 0 ||
      !task.title ||
      !task.project
    ) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    if (!task.project?.id && !task.project?.name) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    if (task.assignee && task.assignee.length > 0) {
      if (!checkObjects(task.assignee)) {
        return formatResponse({
          codice: 'E04',
          res,
        })
      }
    }
    const tasks = readFile('tasks') as Task[]
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      const newTasks: Task = {
        ...task,
        owner: { id: myUser.id },
        id: generateLongId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      tasks.push(newTasks)
      if (writeFile(tasks, 'tasks')) {
        return formatResponse({
          codice: 'S15',
          res,
          tasks: [newTasks],
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

export async function getTasks(req: Request, res: Response) {
  try {
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      const tasks = readFile('tasks') as Task[]
      const myTasks = tasks.filter((t) => t.owner.id === myUser.id)
      return formatResponse({
        codice: 'S16',
        res,
        tasks: myTasks,
      })
    }
    return res.status(200).json(
      formatResponse({
        codice: 'S16',
        res,
        tasks: [],
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

export async function getTask(req: Request, res: Response) {
  try {
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      const tasks = readFile('tasks') as Task[]
      const myTasks = tasks.filter((t) => t.owner.id === myUser.id)
      return formatResponse({
        codice: 'S16',
        res,
        tasks: myTasks,
      })
    }
    return formatResponse({
      codice: 'S16',
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

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const tasks = readFile('tasks') as Task[]
    const tasksSearch = tasks.filter((t: Task) => t.id === id)
    if (tasksSearch.length === 0) {
      return formatResponse({
        codice: 'W07',
        res,
      })
    }
    const newTasks = tasksSearch.filter((t: Task) => t.id !== id)
    if (!writeFile(newTasks, 'tasks')) {
      throw new Error('Error deleting task')
    }
    return formatResponse({
      codice: 'S12',
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

export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (Object.keys(req.body).length === 0) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const { task } = req.body as { task: Task }
    if (!id || !task || Object.keys(task).length === 0) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    if (!task.project || !task.project?.id || !task.project?.name) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    if (task.assignee && task.assignee.length > 0) {
      if (!checkObjects(task.assignee)) {
        return formatResponse({
          codice: 'E04',
          res,
        })
      }
    }
    const tasks = readFile('tasks') as Task[]
    const tasksSearch = tasks.filter((t: Task) => t.id === id)
    if (tasksSearch.length === 0) {
      return formatResponse({
        codice: 'W07',
        res,
      })
    }
    const newTask: Task = {
      ...tasksSearch[0],
      ...task,
      updatedAt: new Date().toISOString(),
    }
    const newProjects = [...tasks.filter((t: Task) => t.id !== id), newTask]
    if (!writeFile(newProjects, 'members')) {
      throw new Error('Error updating project')
    }
    return formatResponse({
      codice: 'S11',
      res,
      tasks: [newTask],
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}
