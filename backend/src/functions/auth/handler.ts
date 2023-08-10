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
        updatedAt: new Date().toISOString(),
      })
    ) {
      console.log('User created')
      return res.status(200).json(
        formatResponse({
          statusText: 'SUCCESS',
          status: 200,
          message: 'User created',
        })
      )
    }
    console.log('User already exists')
    return res.status(400).json(
      formatResponse({
        statusText: 'ERROR',
        error: 'User already exists',
        status: 400,
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
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
    const users = getUsersToken()
    const user = users.find((user) => user.username === username)
    if (user) {
      const access = checkPassword(password, user.hash, user.salt)
      if (access) {
        const { token } = generateTokenUser(user.id)
        if (token) {
          console.log('Authorized')
          return res.status(200).json(
            formatResponse({
              statusText: 'SUCCESS',
              status: 200,
              owner: { id: user.id, name: user.username },
              token,
            })
          )
        } else throw new Error('Token not generated')
      }
      console.log('Unauthorized')
      return res.status(401).json(
        formatResponse({
          statusText: 'ERROR',
          error: 'Unauthorized',
          status: 401,
        })
      )
    }
    console.log('User not found')
    return res.status(404).json(
      formatResponse({
        statusText: 'ERROR',
        status: 404,
        error: 'User not found',
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
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
      console.log('Logout')
      return res.status(201).json(
        formatResponse({
          statusText: 'SUCCESS',
          status: 201,
        })
      )
    }
    console.log('Bad request')
    return res.status(400).json(
      formatResponse({
        statusText: 'ERROR',
        status: 400,
        error: 'Bad request',
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(500).json(
      formatResponse({
        status: 500,
        statusText: 'ERROR',
        error: 'Internal server error',
      })
    )
  }
}

export function getProfiles(req: Request, res: Response) {
  try {
    console.log('-->getProfiles')
    const profiles = getUsersToken().map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
    console.log('All profiles')
    return res.status(200).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 200,
        profiles,
        count: profiles.length,
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(500).json(
      formatResponse({
        status: 500,
        statusText: 'ERROR',
        error: 'Internal server error',
      })
    )
  }
}

export function getProfile(req: Request, res: Response) {
  try {
    console.log('-->getProfile')
    const { id } = req.params
    if (id) {
      const profiles = getUsersToken()
      const profile = profiles
        .filter((user) => user.id === id)
        .map((user) => ({
          id: user.id,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }))
      if (profile) {
        console.log(`Profile found: ${profile}`)
        return res.status(200).json(
          formatResponse({
            statusText: 'SUCCESS',
            status: 200,
            profiles: profile,
          })
        )
      }
      console.log('Profile not found')
      return res.status(200).json(
        formatResponse({
          statusText: 'ERROR',
          status: 404,
          error: 'Profile not found',
        })
      )
    }
    console.log('Bad request')
    return res.status(400).json(
      formatResponse({
        statusText: 'ERROR',
        status: 400,
        error: 'Bad request',
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(500).json(
      formatResponse({
        status: 500,
        statusText: 'ERROR',
        error: 'Internal server error',
      })
    )
  }
}

export function updateProfile(req: Request, res: Response) {
  try {
    return res.status(200).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 200,
        error: 'Not implemented',
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(500).json(
      formatResponse({
        status: 500,
        statusText: 'ERROR',
        error: 'Internal server error',
      })
    )
  }
}

export function deleteProfile(req: Request, res: Response) {
  try {
    return res.status(200).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 200,
        error: 'Not implemented',
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(500).json(
      formatResponse({
        status: 500,
        statusText: 'ERROR',
        error: 'Internal server error',
      })
    )
  }
}
