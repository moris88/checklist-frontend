import { Request, Response } from 'express'
import { formatResponse } from '../../libs'

export function errorHandler(err: Error, req: Request, res: Response) {
  // Log the error
  console.log(err.message, { error: err })
  // Respond with an error message to the client
  return res.status(500).json(
    formatResponse({
      statusText: 'ERROR',
      status: 500,
      error: 'Internal Server Error',
    })
  )
}
