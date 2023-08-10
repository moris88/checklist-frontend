import { Request, Response, NextFunction } from 'express'
import { checkToken } from '../../libs/token'
import { formatResponse } from '../../libs'

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`-->New request! - Path: ${req.path}`)
  if (
    !['/api/v1/login', '/api/v1/register', '/api/v1/logout'].includes(req.path)
  ) {
    const bearerToken = req.headers?.authorization ?? null
    console.log('Authorization:', bearerToken)
    if (bearerToken) {
      if (checkToken(bearerToken as string)) {
        console.log('-->ACCESS GRANTED')
        next()
        return
      }
    }
    console.log('-->ACCESS DENIED - NOT AUTHORIZED')
    return res.status(401).json(
      formatResponse({
        statusText: 'ERROR',
        status: 401,
        error: 'not authorized',
      })
    )
  }
  next()
  return
}
