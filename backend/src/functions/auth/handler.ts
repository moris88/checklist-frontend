import { checkPassword, generatePassword, getUsersToken, registrationUser } from '@/libs/token'
import { formatResponse, generateLongId } from '../../libs/utils';
import { Request, Response } from 'express'
import { users } from '../../../../frontend/src/utils/users';

export function register(req: Request, res: Response) {
  try {
    console.log('register', req, res)
    const { username, password } = req.body
    console.log('username:', username)
    console.log('password:', password)
    const { hash, salt } = generatePassword(password)
    console.log('hash:', hash)
    console.log('salt:', salt)
    if (registrationUser({
      id: generateLongId(), 
      username, 
      hash, 
      salt,
      role: 'USER',
      createdAt: new Date().toISOString(),
    })) {
      console.log(
        'RESPONSE',
        formatResponse({ statusText: 'SUCCESS', status: 201 })
      )
      return res.status(200).json(
        formatResponse({
          statusText: 'SUCCESS',
          status: 200,
          message: 'User created',
        })
      )
    }
    console.log(
      'RESPONSE',
      formatResponse({ statusText: 'ERROR', status: 400, error: 'Bad request' })
    )
    return res.status(400).json(
      formatResponse({
        statusText: 'ERROR',
        status: 400,
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

export function login(req: Request, res: Response) {
  try {
    console.log('login', req, res)
    const { username, password } = req.body
    console.log('username:', username)
    console.log('password:', password)
    const users = getUsersToken()
    console.log('users:', users)
    const user = users.find((user) => user.username === username)
    console.log('user:', user)
    if (user) {
      const { token } = checkPassword(password, user.hash, user.salt)
      console.log('token:', token)
      if (token) {
        console.log(
          'RESPONSE',
          formatResponse({ statusText: 'SUCCESS', status: 201 })
        )
        return res.status(200).json(
          formatResponse({
            statusText: 'SUCCESS',
            status: 200,
          })
        )
      } 
      console.log(
        'RESPONSE',
        formatResponse({
          statusText: 'ERROR',
          status: 400,
          error: 'Bad request',
        })
      )
      return res.status(400).json(
        formatResponse({
          statusText: 'ERROR',
          status: 400,
        })
      )
      
    }
    console.log(
      'RESPONSE',
      formatResponse({
        statusText: 'ERROR',
        status: 400,
        error: 'Bad request',
      })
    )
    return res.status(400).json(
      formatResponse({
        statusText: 'ERROR',
        status: 400,
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

export function logout(req: Request, res: Response) {
  try {
    console.log('logout', req, res)

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
