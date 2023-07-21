import {
  formatResponse,
  generateLongId,
  readFile,
  writeFile,
} from '../../libs/utils'
import { Request, Response } from 'express'
import { User } from '../../types/global'

export function createUser(req: Request, res: Response) {
  try {
    console.log('createUser', req.body)
    if (Object.keys(req.body).length === 0) {
      console.log('Create User: No Body')
      return res.status(400).json(
        formatResponse({
          status: 400,
          statusText: 'ERROR',
          error: 'No Body',
        })
      )
    } else if (!req.body.email || !req.body.last_name) {
      console.log('Create User: No Param email or last_name')
      return res.status(400).json(
        formatResponse({
          status: 400,
          statusText: 'ERROR',
          error: 'No Param email or last_name',
        })
      )
    }
    const user = req.body as User
    const { email } = user
    const users = readFile('users')
    console.log('users:', users)
    if (users.filter((user: User) => user.email === email).length > 0) {
      console.log('Create User: Email already exists')
      return res.status(400).json(
        formatResponse({
          status: 400,
          statusText: 'ERROR',
          error: 'Email already exists',
        })
      )
    }
    user.id = generateLongId()
    users.push(user)
    if (writeFile(users, 'users')) {
      console.log('SUCCESS: Create User')
      return res.status(201).json(
        formatResponse({
          statusText: 'SUCCESS',
          status: 201,
          message: 'User created successfully',
          id: user.id,
        })
      )
    }
    throw new Error('Error creating user')
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

export function getUsers(req: Request, res: Response) {
  try {
    console.log('getUsers')
    const users = readFile('users') as User[]
    console.log('SUCCESS: get Users')
    return res.status(200).json(
      formatResponse({
        users,
        statusText: 'SUCCESS',
        status: 200,
        count: users.length,
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return res.status(200).json(
      formatResponse({
        statusText: 'ERROR',
        status: 500,
        error: 'Internal server error',
      })
    )
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    console.log('deleteUser', req.params.id)
    if (!req.params.id) {
      console.log('Delete User: No Param id')
      return res.status(400).json(
        formatResponse({
          status: 400,
          statusText: 'ERROR',
          error: 'No Param id',
        })
      )
    }
    const users = readFile('users')
    const usersSearch = users.filter((user: User) => user.id === req.params.id)
    if (usersSearch.length === 0) {
      console.log('Delete User: User not found')
      return res.status(404).json(
        formatResponse({
          status: 404,
          statusText: 'ERROR',
          error: 'User not found',
        })
      )
    }
    const newUsers = users.filter((user: User) => user.id !== req.params.id)
    if (!writeFile(newUsers, 'users')) {
      throw new Error('Error deleting user')
    }
    console.log('SUCCESS: Delete User')
    return res.status(200).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 200,
        message: 'User deleted successfully',
      })
    )
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      statusText: 'ERROR',
      status: 500,
      error: 'Internal server error',
    })
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    console.log('updateUser', req.body)
    const { id } = req.params
    if (!id) {
      console.log('Update User: No Param id')
      return res.status(400).json(
        formatResponse({
          status: 400,
          statusText: 'ERROR',
          error: 'No Param id',
        })
      )
    }
    if (Object.keys(req.body).length === 0) {
      console.log('Update User: No Body')
      return res.status(400).json(
        formatResponse({
          status: 400,
          statusText: 'ERROR',
          error: 'No Body',
        })
      )
    } 
    const user = req.body as User
    const users = readFile('users') as User[]
    console.log('users:', users)
    if (users.filter((user: User) => user.id === id).length === 0) {
      console.log('Update User: User not found')
      return res.status(400).json(
        formatResponse({
          status: 400,
          statusText: 'ERROR',
          error: 'User not found',
        })
      )
    }
    const [userSearch] = users.filter((user: User) => user.id === id)
    const newUser = { ...userSearch, ...user }
    console.log('newUser:', newUser)
    const newUsers = [...users.filter((user: User) => user.id !== id), newUser]
    if (!writeFile(newUsers, 'users')) {
      throw new Error('Error updating user')
    }
    console.log('SUCCESS: Update User')
    return res.status(200).json(
      formatResponse({
        statusText: 'SUCCESS',
        status: 200,
        message: 'User updated successfully',
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
