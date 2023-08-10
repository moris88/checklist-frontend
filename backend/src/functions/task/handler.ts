import { formatResponse } from '../../libs'
import { Request, Response } from 'express'

export async function createTask(req: Request, res: Response) {
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

export async function getTasks(req: Request, res: Response) {
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

export async function deleteTask(req: Request, res: Response) {
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

export async function updateTask(req: Request, res: Response) {
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
