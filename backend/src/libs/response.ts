import {
  Codice,
  CodiceErrore,
  CodiceWarning,
  Member,
  Project,
  ResponseServer,
  Task,
  User,
} from '../types/global'
import { Response } from 'express'

/*
  HTTPS Status Code:
  200: OK
  201: CREATED
  202: ACCEPTED
  204: NO CONTENT
  400: BAD REQUEST
  401: UNAUTHORIZED
  403: FORBIDDEN
  404: NOT FOUND
  409: CONFLICT
  500: INTERNAL SERVER ERROR
  501: NOT IMPLEMENTED
*/
export const formatResponse = ({
  codice,
  res,
  owner,
  token,
  profiles,
  projects,
  //   tasks,
  members,
}: {
  codice: Codice | CodiceWarning | CodiceErrore
  res: Response
  owner?: { id: string; name: string }
  token?: string
  profiles?: User[]
  projects?: Project[]
  tasks?: Task[]
  members?: Member[]
}): void => {
  const responseServer: ResponseServer = {
    statusText: 'SUCCESS',
    status: 200,
  }
  switch (codice) {
    // ERROR
    case 'E01': {
      console.log('E01', 'Not implemented')
      responseServer.statusText = 'ERROR'
      responseServer.status = 501
      responseServer.error = 'Not implemented'
      break
    }
    case 'E02': {
      console.log('E02', 'Internal server error')
      responseServer.statusText = 'ERROR'
      responseServer.status = 500
      responseServer.error = 'Internal server error'
      break
    }
    case 'E03': {
      console.log('E03', 'Unauthorized')
      responseServer.statusText = 'ERROR'
      responseServer.status = 401
      responseServer.error = 'Unauthorized'
      break
    }
    case 'E04': {
      console.log('E04', 'Bad request')
      responseServer.statusText = 'ERROR'
      responseServer.status = 400
      responseServer.error = 'Bad request'
      break
    }
    case 'E05': {
      console.log('E05', 'Forbidden')
      responseServer.statusText = 'ERROR'
      responseServer.status = 403
      responseServer.error = 'Forbidden'
      break
    }
    // WARNING
    case 'W01': {
      console.log('W01', 'User already exists')
      responseServer.statusText = 'WARNING'
      responseServer.status = 409
      responseServer.message = 'User already exists'
      break
    }
    case 'W02': {
      console.log('W02', 'User not found')
      responseServer.statusText = 'WARNING'
      responseServer.status = 404
      responseServer.message = 'User not found'
      break
    }
    case 'W03': {
      console.log('W03', 'Profile not found')
      responseServer.statusText = 'WARNING'
      responseServer.status = 404
      responseServer.message = 'Profile not found'
      break
    }
    case 'W04': {
      console.log('W04', 'Email already exists')
      responseServer.statusText = 'WARNING'
      responseServer.status = 409
      responseServer.message = 'Email already exists'
      break
    }
    case 'W05': {
      console.log('W05', 'Member not found')
      responseServer.statusText = 'WARNING'
      responseServer.status = 404
      responseServer.message = 'Member not found'
      break
    }
    case 'W06': {
      console.log('W06', 'Project not found')
      responseServer.statusText = 'WARNING'
      responseServer.status = 404
      responseServer.message = 'Project not found'
      break
    }
    // SUCCESS
    case 'S01': {
      console.log('S01', 'User created')
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 201
      responseServer.message = 'User created'
      break
    }
    case 'S02': {
      console.log('S02', 'User login', owner, token)
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 202
      responseServer.owner = owner
      responseServer.token = token
      break
    }
    case 'S03': {
      console.log('S03', 'User refresh', token)
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 202
      responseServer.token = token
      break
    }
    case 'S04': {
      console.log('S04', 'User logout')
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 202
      responseServer.message = 'User logout'
      break
    }
    case 'S05': {
      console.log('S05', 'Get users', profiles)
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 200
      responseServer.profiles = profiles
      responseServer.count = profiles?.length || 0
      break
    }
    case 'S06': {
      console.log('S06', 'Project created', projects)
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 201
      responseServer.message = 'Project created'
      responseServer.projects = projects
      responseServer.count = projects?.length || 0
      break
    }
    case 'S07': {
      console.log('S07', 'Get projects', projects)
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 200
      responseServer.projects = projects
      responseServer.count = projects?.length || 0
      break
    }
    case 'S08': {
      console.log('S08', 'Member created', members)
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 201
      responseServer.message = 'Member created'
      responseServer.members = members
      responseServer.count = members?.length || 0
      break
    }
    case 'S09': {
      console.log('S09', 'Get members', members)
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 200
      responseServer.members = members
      responseServer.count = members?.length || 0
      break
    }
    case 'S10': {
      console.log('S10', 'Member deleted')
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 204
      responseServer.message = 'Member deleted'
      break
    }
    case 'S11': {
      console.log('S11', 'Member updated')
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 200
      responseServer.message = 'Member updated'
      responseServer.members = members
      responseServer.count = members?.length || 0
      break
    }
    case 'S12': {
      console.log('S12', 'Project deleted')
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 204
      responseServer.message = 'Project deleted'
      break
    }
    case 'S13': {
      console.log('S13', 'Project updated')
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 200
      responseServer.message = 'Project updated'
      responseServer.projects = projects
      responseServer.count = projects?.length || 0
      break
    }
    case 'S14': {
      console.log('S14', 'User updated')
      responseServer.statusText = 'SUCCESS'
      responseServer.status = 200
      responseServer.message = 'User updated'
      break
    }
  }
  res.status(responseServer.status).json(responseServer)
}
