import {
  checkPassword,
  generatePassword,
  generateTokenUser,
  getUsersToken,
  registrationUser,
  removeToken,
  regenerateToken,
  formatResponseError,
  formatResponseWarning,
  formatResponse,
  generateLongId,
  readFileSystem,
  writeFileSystem,
} from '../../libs'
import { Request, Response } from 'express'
import { User } from '../../types/global'

export function register(req: Request, res: Response) {
  try {
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
      return formatResponse({
        message: 'CREATED',
        res,
      })
    }
    return formatResponseWarning({
      message: 'Resource already exists',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body
    const users = getUsersToken()
    const user = users.find(
      (user) => user.username === username && user.role !== 'INACTIVE'
    )
    if (user) {
      const access = checkPassword(password, user.hash, user.salt)
      if (access) {
        removeToken(username, 'ACTIVE')
        removeToken(username, 'INACTIVE')
        const { token } = generateTokenUser(user.id)
        if (token) {
          return formatResponse({
            message: 'OK',
            res,
            owner: { id: user.id, name: user.username },
            token,
          })
        } else throw new Error('Token not generated')
      }
      return formatResponseError({
        message: 'Unauthorized',
        res,
      })
    }
    return formatResponseWarning({
      message: 'Resource not found',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function refreshToken(req: Request, res: Response) {
  try {
    const { userId } = req.body
    const bearerToken = req.headers?.authorization ?? ''
    if (bearerToken && userId) {
      const { token: newToken } = regenerateToken(bearerToken)
      if (newToken) {
        return formatResponse({
          message: 'OK',
          res,
          token: newToken,
        })
      }
      return formatResponseError({
        message: 'Unauthorized',
        res,
      })
    }
    return formatResponseError({
      message: 'Bad request',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function logout(req: Request, res: Response) {
  try {
    const { username } = req.body
    if (removeToken(username, 'ACTIVE') && removeToken(username, 'INACTIVE')) {
      return formatResponse({
        message: 'OK',
        res,
      })
    }
    return formatResponseError({
      message: 'Bad request',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function getProfiles(req: Request, res: Response) {
  try {
    const profiles = getUsersToken().map((u) => ({
      id: u.id,
      username: u.username,
      role: u.role,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    })) as User[]
    formatResponse({
      message: 'GET',
      res,
      profiles,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function getProfile(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (id) {
      const profiles = getUsersToken()
      const myProfiles = profiles
        .filter((u) => u.id === id)
        .map((u) => ({
          id: u.id,
          username: u.username,
          role: u.role,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        })) as User[]
      if (myProfiles) {
        return formatResponse({
          message: 'GET',
          res,
          profiles: myProfiles,
        })
      }
      return formatResponseWarning({
        message: 'Resource not found',
        res,
      })
    }
    return formatResponseError({
      message: 'Bad request',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function deleteProfile(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id) {
      return formatResponseError({
        message: 'Bad request',
        res,
      })
    }
    const users = readFileSystem('users') as User[]
    const usersSearch = users.filter((u: User) => u.id === id)
    if (usersSearch.length === 0) {
      return formatResponseWarning({
        message: 'Resource not found',
        res,
      })
    }
    if (usersSearch[0].role !== 'ADMIN') {
      return formatResponseError({
        message: 'Unauthorized',
        res,
      })
    }
    const newUsers = users.filter((u: User) => u.id !== id)
    if (!writeFileSystem(newUsers, 'users')) {
      throw new Error('Error deleting user')
    }
    return formatResponse({
      message: 'DELETED',
      res,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}

export function updateProfile(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id || Object.keys(req.body).length === 0) {
      return formatResponseError({
        message: 'Bad request',
        res,
      })
    }
    const { user } = req.body as { user: User }
    const users = readFileSystem('users') as User[]
    const usersSearch = users.filter((u: User) => u.id === id)
    if (usersSearch.length === 0) {
      return formatResponseWarning({
        message: 'Resource not found',
        res,
      })
    }
    const myUser: User = {
      ...user,
      role: usersSearch[0].role !== 'ADMIN' ? 'USER' : user.role,
      updatedAt: new Date().toISOString(),
    }
    const newUser = { ...usersSearch[0], ...myUser }
    const newUsers = [...users.filter((u: User) => u.id !== id), newUser]
    if (!writeFileSystem(newUsers, 'users')) {
      throw new Error('Error updating user')
    }
    return formatResponse({
      message: 'UPDATED',
      res,
      profiles: [newUser],
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponseError({
      message: 'Internal server error',
      res,
    })
  }
}
