import { formatResponse } from '../../libs'
import { Request, Response } from 'express'

export function search(req: Request, res: Response) {
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
