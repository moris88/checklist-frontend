import { formatResponse } from '../../libs/utils'
import { Request, Response } from 'express'


export function createProject(req: Request, res: Response) {
  try {
    console.log('createProject', req, res)
    console.log('SUCCESS: New project created')

    console.log(
      'RESPONSE',
      formatResponse({ statusText: 'SUCCESS', status: 201 })
    )
    return res.status(201).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 201,
      })
    )
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
    console.log('getProjects', req, res)
    console.log('SUCCESS: get projects')

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

export function deleteProject(
  req: Request,
  res: Response
) {
  try {
    console.log('deleteProject', req, res)
    console.log('SUCCESS: Delete project')

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

export function updateProject(
  req: Request,
  res: Response
) {
  try {
    console.log('updateProject', req, res)
    console.log('SUCCESS: Update Project')

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
