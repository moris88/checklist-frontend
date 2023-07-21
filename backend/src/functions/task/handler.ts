import { formatResponse } from '../../libs/utils'
import { Request, Response } from 'express'

export async function createTask(req: Request, res: Response) {
  try {
    console.log('createTask', req, res)
    console.log('SUCCESS: New Task created')

    console.log(
      'RESPONSE',
      formatResponse({ statusText: 'SUCCESS', status: 201 })
    )
    return formatResponse({
      statusText: 'SUCCESS',
      status: 201,
    })
  } catch (error) {
    console.log('ERROR!', error)
    console.log(
      'RESPONSE',
      formatResponse({
        status: 500,
        statusText: 'ERROR',
        error: 'Internal server error',
      })
    )
    return formatResponse({
      status: 500,
      statusText: 'ERROR',
      error: 'Internal server error',
    })
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    console.log('getTasks', req, res)
    console.log('SUCCESS: get Tasks')

    console.log(
      'RESPONSE',
      formatResponse({ statusText: 'SUCCESS', status: 200 })
    )
    return formatResponse({
      statusText: 'SUCCESS',
      status: 200,
    })
  } catch (error) {
    console.log('ERROR!', error)
    console.log(
      'RESPONSE',
      formatResponse({
        statusText: 'ERROR',
        status: 500,
        error: 'Internal server error',
      })
    )
    return formatResponse({
      statusText: 'ERROR',
      status: 500,
      error: 'Internal server error',
    })
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    console.log('deleteTask', req, res)
    console.log('SUCCESS: Delete Task')

    console.log(
      'RESPONSE',
      formatResponse({ statusText: 'SUCCESS', status: 204 })
    )
    return formatResponse({
      statusText: 'SUCCESS',
      status: 204,
    })
  } catch (error) {
    console.log('ERROR!', error)
    console.log(
      'RESPONSE',
      formatResponse({
        statusText: 'ERROR',
        status: 500,
        error: 'Internal server error',
      })
    )
    return formatResponse({
      statusText: 'ERROR',
      status: 500,
      error: 'Internal server error',
    })
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    console.log('updateTask', req, res)
    console.log('SUCCESS: Update Task')

    console.log(
      'RESPONSE',
      formatResponse({ statusText: 'SUCCESS', status: 200 })
    )
    return formatResponse({
      statusText: 'SUCCESS',
      status: 200,
    })
  } catch (error) {
    console.log('ERROR!', error)
    console.log(
      'RESPONSE',
      formatResponse({
        statusText: 'ERROR',
        status: 500,
        error: 'Internal server error',
      })
    )
    return formatResponse({
      statusText: 'ERROR',
      status: 500,
      error: 'Internal server error',
    })
  }
}
