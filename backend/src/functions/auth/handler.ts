import {
  checkPassword,
  generatePassword,
  generateTokenUser,
  getUsersToken,
  registrationUser,
  removeToken,
  regenerateToken,
  formatResponse,
  generateLongId,
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
        codice: 'S01',
        res,
      })
    }
    return formatResponse({
      codice: 'W01',
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

export function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body
    const users = getUsersToken()
    const user = users.find((user) => user.username === username)
    if (user) {
      const access = checkPassword(password, user.hash, user.salt)
      if (access) {
        removeToken(username, 'ACTIVE')
        removeToken(username, 'INACTIVE')
        const { token } = generateTokenUser(user.id)
        if (token) {
          return formatResponse({
            codice: 'S02',
            res,
            owner: { id: user.id, name: user.username },
            token,
          })
        } else throw new Error('Token not generated')
      }
      return formatResponse({
        codice: 'E03',
        res,
      })
    }
    return formatResponse({
      codice: 'W02',
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

export function refreshToken(req: Request, res: Response) {
  try {
    console.log('REFRESH TOKEN')
    const { userId } = req.body
    const bearerToken = req.headers?.authorization ?? ''
    if (bearerToken && userId) {
      const { token: newToken } = regenerateToken(bearerToken)
      if (newToken) {
        return formatResponse({
          codice: 'S03',
          res,
          token: newToken,
        })
      }
      return formatResponse({
        codice: 'E03',
        res,
      })
    }
    return formatResponse({
      codice: 'E04',
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

export function logout(req: Request, res: Response) {
  try {
    const { username } = req.body
    if (removeToken(username, 'ACTIVE') && removeToken(username, 'INACTIVE')) {
      return formatResponse({
        codice: 'S04',
        res,
      })
    }
    return formatResponse({
      codice: 'E04',
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

export function getProfiles(req: Request, res: Response) {
  try {
    const profiles = getUsersToken().map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })) as User[]
    formatResponse({
      codice: 'S05',
      res,
      profiles,
      count: profiles.length,
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
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
        .filter((user) => user.id === id)
        .map((user) => ({
          id: user.id,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })) as User[]
      if (myProfiles) {
        return formatResponse({
          codice: 'S05',
          res,
          profiles: myProfiles,
          count: myProfiles.length,
        })
      }
      return formatResponse({
        codice: 'W03',
        res,
      })
    }
    return formatResponse({
      codice: 'E04',
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

export function updateProfile(req: Request, res: Response) {
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

export function deleteProfile(req: Request, res: Response) {
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
