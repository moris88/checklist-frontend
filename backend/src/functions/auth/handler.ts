import {
  checkPassword,
  generatePassword,
  generateTokenUser,
  getUsersToken,
  registrationUser,
  removeToken,
} from '../../libs/token'
import { formatResponse, generateLongId } from '../../libs/utils'
import { Request, Response } from 'express'

export function register(req: Request, res: Response) {
  try {
    console.log('-->register')
    const { username, password } = req.body
    const { hash, salt } = generatePassword(password)
    if (
      registrationUser({
        id: generateLongId(),
        username,
        hash,
        salt,
        role: 'USER',
        createdAt: new Date().toISOString(),
      })
    ) {
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
      formatResponse({
        statusText: 'ERROR',
        status: 400,
        error: 'User already exists',
      })
    )
    return res.status(400).json(
      formatResponse({
        statusText: 'ERROR',
        error: 'User already exists',
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
    console.log('-->login')
    const { username, password } = req.body
    console.log('username:', username)
    console.log('password:', password)
    const users = getUsersToken()
    const user = users.find((user) => user.username === username)
    if (user) {
      const access = checkPassword(password, user.hash, user.salt)
      if (access) {
        const { token } = generateTokenUser(user.id)
        console.log(
          'RESPONSE',
          formatResponse({ statusText: 'SUCCESS', status: 200 })
        )
        if (token) {
          return res.status(200).json(
            formatResponse({
              statusText: 'SUCCESS',
              status: 200,
              owner: { id: user.id, name: user.username},
              token,
            })
          )
        } else throw new Error('Token not generated')
      }
      console.log(
        'RESPONSE',
        formatResponse({
          statusText: 'ERROR',
          status: 401,
          error: 'Unauthorized',
        })
      )
      return res.status(401).json(
        formatResponse({
          statusText: 'ERROR',
          error: 'Unauthorized',
          status: 401,
        })
      )
    }
    console.log(
      'RESPONSE',
      formatResponse({
        statusText: 'ERROR',
        status: 404,
        error: 'User not found',
      })
    )
    return res.status(400).json(
      formatResponse({
        statusText: 'ERROR',
        status: 404,
        error: 'User not found',
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
    console.log('-->logout')
    const { username } = req.body
    if (removeToken(username)) {
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
