import {
  formatResponse,
  generateLongId,
  readFile,
  writeFile,
  getUserByToken,
} from '../../libs'
import { Request, Response } from 'express'
import { Member } from '../../types/global'

export function createMember(req: Request, res: Response) {
  try {
    if (Object.keys(req.body).length === 0) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const { member } = req.body as { member: Member }
    if (
      !member ||
      Object.keys(member).length === 0 ||
      !member.email ||
      !member.last_name
    ) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const { email } = member
    const members = readFile('members') as Member[]
    if (members.filter((m: Member) => m.email === email).length > 0) {
      return formatResponse({
        codice: 'W04',
        res,
      })
    }
    const myMember = getUserByToken(req.headers?.authorization ?? '')
    if (myMember) {
      const newMember = {
        ...member,
        id: generateLongId(),
        owner: { id: myMember.id },
      }
      members.push(newMember)
      if (writeFile(members, 'members')) {
        return formatResponse({
          codice: 'S08',
          res,
          members: [newMember],
        })
      }
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

export function getMembers(req: Request, res: Response) {
  try {
    const members = readFile('members') as Member[]
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      const myUsers = members.filter((u: Member) => u.owner.id === myUser.id)
      return formatResponse({
        codice: 'S09',
        res,
        members: myUsers,
      })
    }
    return formatResponse({
      codice: 'S09',
      res,
      members: [],
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}

export function getMember(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const members = readFile('members') as Member[]
    const myUser = getUserByToken(req.headers?.authorization ?? '')
    if (myUser) {
      const myUsers = members.filter(
        (u: Member) => u.owner.id === myUser.id && u.id === id
      )
      return formatResponse({
        codice: 'S09',
        res,
        members: myUsers,
      })
    }
    return formatResponse({
      codice: 'S09',
      res,
      members: [],
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}

export async function deleteMember(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const members = readFile('members') as Member[]
    const membersSearch = members.filter((m: Member) => m.id === id)
    if (membersSearch.length === 0) {
      return formatResponse({
        codice: 'W05',
        res,
      })
    }
    const newMembers = members.filter((m: Member) => m.id !== id)
    if (!writeFile(newMembers, 'members')) {
      throw new Error('Error deleting member')
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

export async function updateMember(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id || Object.keys(req.body).length === 0) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const { member } = req.body as { member: Member }
    if (!member || Object.keys(member).length === 0) {
      return formatResponse({
        codice: 'E04',
        res,
      })
    }
    const members = readFile('members') as Member[]
    const membersSearch = members.filter((m: Member) => m.id === id)
    if (membersSearch.length === 0) {
      return formatResponse({
        codice: 'W05',
        res,
      })
    }
    const newMember = { ...membersSearch[0], ...member }
    const newMembers = [
      ...members.filter((m: Member) => m.id !== id),
      newMember,
    ]
    if (!writeFile(newMembers, 'members')) {
      throw new Error('Error updating user')
    }
    return formatResponse({
      codice: 'S11',
      res,
      members: [newMember],
    })
  } catch (error) {
    console.log('ERROR!', error)
    return formatResponse({
      codice: 'E02',
      res,
    })
  }
}
