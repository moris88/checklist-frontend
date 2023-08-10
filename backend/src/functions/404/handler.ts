import { Request, Response } from 'express'
import { formatResponse } from '../../libs'

export function generalPathMatch(req: Request, res: Response) {
  console.log('REQUEST REJECTED - PATH NOT FOUND')
  return res.status(404).json(
    formatResponse({
      statusText: 'ERROR',
      status: 404,
      error: 'path not found',
    })
  )
}
