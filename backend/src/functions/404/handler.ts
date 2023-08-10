import { Request, Response } from 'express'
import { formatResponse } from '../../libs'

export function generalPathMatch(req: Request, res: Response) {
  return formatResponse({
    codice: 'E01',
    res,
  })
}
