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
    const profiles = getUsersToken().map((u) => ({
      id: u.id,
      username: u.username,
      role: u.role,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    })) as User[]
    formatResponse({
      codice: 'S05',
      res,
      profiles,
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
          codice: 'S05',
          res,
          profiles: myProfiles,
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

export function deleteProfile(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const users = readFileSystem('users') as User[]
    const usersSearch = users.filter((u: User) => u.id === id)
    if (usersSearch.length === 0) {
      return formatResponse({
        codice: 'W05',
        res,
      })
    }
    if (usersSearch[0].role !== 'ADMIN') {
      return formatResponse({
        codice: 'E03',
        res,
      })
    }
    const newUsers = users.filter((u: User) => u.id !== id)
    if (!writeFileSystem(newUsers, 'users')) {
      throw new Error('Error deleting user')
    }
    return formatResponse({
      codice: 'S10',
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
    const { id } = req.params
    if (!id || Object.keys(req.body).length === 0) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const { user } = req.body as { user: User }
    const users = readFileSystem('users') as User[]
    const usersSearch = users.filter((u: User) => u.id === id)
    if (usersSearch.length === 0) {
      return formatResponse({
        codice: 'W02',
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
      codice: 'S14',
      res,
      profiles: [newUser],
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}
