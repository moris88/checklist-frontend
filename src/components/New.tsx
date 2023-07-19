import { Controller, useForm } from 'react-hook-form'
import useStore from '../hooks/useStore'
import { Module, Project, System, Task, User } from '../types/global'
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react'
import { users } from '../utils/users'
import { systemDefault } from '../utils/system'
import Multiselect from './Multiselect'

interface NewProps {
  module: Module
}

const NewProject = () => {
  const { elements: members } = useStore<User>({
    key: 'user',
    defaultValues: users,
  })
  const { elements: systems, addElement: addSystem } = useStore<System>({
    key: 'system',
    defaultValues: systemDefault,
  })
  const { addElement } = useStore<Project>({
    key: 'project',
    defaultValues: [],
  })
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>({
    defaultValues: {
      id: 0,
      name: '',
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      members: null,
      service: null,
      subService: null,
      state: 'OPENED',
    },
  })

  const onSubmit = handleSubmit((data) => {
    const system = systems[0]
    const dataMembers = data.members as unknown as string[]
    if (dataMembers !== null) {
      const newMember: User[] = []
      dataMembers.forEach((el) => {
        const member = members.filter((member) => member.full_name === el)
        newMember.push(member[0])
      })
      data.members = newMember
    }
    data.id = system.projectID
    console.log(data)
    addSystem({ ...system, projectID: system.projectID + 1 })
    addElement(data)
    window.location.href = '/projects'
  })

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
      {errors.name?.message && (
        <Label className="font-bold text-red-500">{errors.name?.message}</Label>
      )}
      <TextInput
        className="font-medium"
        placeholder="Name Project"
        {...register('name', { required: 'Mandatory Name Project' })}
      />
      <Textarea
        className="font-medium"
        rows={4}
        placeholder="Description"
        {...register('description')}
      />
      <Controller
        control={control}
        name={'members'}
        defaultValue={[]}
        render={({ field: { value, onChange } }) => (
          <Multiselect
            options={users.map((user) => user.full_name)}
            defaultValues={value?.map((user) => user.full_name) ?? []}
            placeholder="Selected a member"
            onChange={onChange}
          />
        )}
      />
      <Select {...register('service')}>
        <option value="">Selected a service</option>
        <option value={'Zoho'}>{'Zoho'}</option>
        <option value={'Freshworks'}>{'Freshworks'}</option>
        <option value={'Hubspot'}>{'Hubspot'}</option>
        <option value={'Zendesk'}>{'Zendesk'}</option>
        <option value={'others'}>{'others'}</option>
      </Select>
      <Select {...register('subService')}>
        <option value="">Selected a sub-service</option>
        <option value={'Zoho CRM'}>{'Zoho CRM'}</option>
        <option value={'Zoho Creator'}>{'Zoho Creator'}</option>
        <option value={'Zoho Desk'}>{'Zoho Desk'}</option>
        <option value={'Zoho Analitycs'}>{'Zoho Analitycs'}</option>
        <option value={'Freshdesk'}>{'Freshdesk'}</option>
        <option value={'Freshservice'}>{'Freshservice'}</option>
        <option value={'FreshCaller'}>{'FreshCaller'}</option>
        <option value={'Zendesk Support'}>{'Zendesk Support'}</option>
        <option value={'Zendesk Sell'}>{'Zendesk Sell'}</option>
        <option value={'Zendesk Guide'}>{'Zendesk Guide'}</option>
        <option value={'others'}>{'others'}</option>
      </Select>
      <Select {...register('state')}>
        <option value="">Selected a state</option>
        <option value={'OPENED'}>{'OPENED'}</option>
        <option value={'ACTIVE'}>{'ACTIVE'}</option>
        <option value={'CLOSED'}>{'CLOSED'}</option>
      </Select>
      <div className="flex justify-center w-full">
        <Button type="submit">Add</Button>
      </div>
    </form>
  )
}

const NewUser = () => {
  const { addElement } = useStore<User>({
    key: 'user',
    defaultValues: users,
  })
  const { elements: systems, addElement: addSystem } = useStore<System>({
    key: 'system',
    defaultValues: systemDefault,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: 0,
      first_name: '',
      last_name: '',
      full_name: '',
      email: '',
      role: 'NONE',
    },
  })

  const onSubmit = handleSubmit((data) => {
    const system = systems[0]
    data.id = system.userID
    addSystem({ ...system, userID: system.userID + 1 })
    data.full_name = `${data.first_name} ${data.last_name}`.trim()
    addElement(data)
    window.location.href = '/users'
  })

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
      {errors.first_name?.message && (
        <Label className="font-bold text-red-500">
          {errors.first_name?.message}
        </Label>
      )}
      {errors.last_name?.message && (
        <Label className="font-bold text-red-500">
          {errors.last_name?.message}
        </Label>
      )}
      <TextInput
        className="font-medium"
        placeholder="First Name"
        {...register('first_name', {
          required: 'Mandatory First Name',
        })}
      />
      <TextInput
        className="font-medium"
        placeholder="Last Name"
        {...register('last_name', { required: 'Mandatory Last Name' })}
      />
      <TextInput
        className="font-medium"
        placeholder="Email"
        {...register('email', { required: 'Mandatory Email' })}
      />
      <Select {...register('role')}>
        <option value="NONE">Selected a role</option>
        <option value={'TECHNICAL LEADER'}>{'TECHNICAL LEADER'}</option>
        <option value={'SENIOR PROJECT MANAGER'}>
          {'SENIOR PROJECT MANAGER'}
        </option>
        <option value={'JUNIOR PROJECT MANAGER'}>
          {'JUNIOR PROJECT MANAGER'}
        </option>
        <option value={'JUNIOR SOLUTION'}>{'JUNIOR SOLUTION'}</option>
        <option value={'SENIOR SOLUTION'}>{'SENIOR SOLUTION'}</option>
        <option value={'JUNIOR DEVELOPER'}>{'JUNIOR DEVELOPER'}</option>
        <option value={'SENIOR DEVELOPER'}>{'SENIOR DEVELOPER'}</option>
        <option value={'JUNIOR STAGE DEVELOPER'}>
          {'JUNIOR STAGE DEVELOPER'}
        </option>
      </Select>
      <div className="flex justify-center w-full">
        <Button type="submit">Add</Button>
      </div>
    </form>
  )
}

const NewTask = () => {
  const { elements: systems, addElement: addSystem } = useStore<System>({
    key: 'system',
    defaultValues: systemDefault,
  })
  const { addElement } = useStore<Task>({
    key: 'task',
    defaultValues: [],
  })
  const { elements: members } = useStore<User>({
    key: 'user',
    defaultValues: [],
  })
  const { elements: listProjects } = useStore<Project>({
    key: 'project',
    defaultValues: [],
  })
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      id: 0,
      title: '',
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      assignee: null,
      projectID: null,
      subService: null,
      deadline: null,
      priority: 'LOW',
      type: 'others',
      status: 'BACKLOG',
    },
  })

  const onSubmit = handleSubmit((data) => {
    const system = systems[0]
    const dataMembers = data.assignee as unknown as string[]
    if (dataMembers !== null) {
      const newMember: User[] = []
      dataMembers.forEach((el) => {
        const member = members.filter((member) => member.full_name === el)
        newMember.push(member[0])
      })
      data.members = newMember
    }
    data.id = system.taskID
    console.log(data)
    addSystem({ ...system, taskID: system.taskID + 1 })
    addElement(data)
    window.location.href = '/tasks'
  })

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
      {errors.title?.message && (
        <Label className="font-bold text-red-500">
          {errors.title?.message}
        </Label>
      )}
      <TextInput
        className="font-medium"
        placeholder="Name Task"
        {...register('title', { required: 'Mandatory Title Task' })}
      />
      <Textarea
        className="font-medium"
        rows={4}
        placeholder="Description"
        {...register('description')}
      />
      <Controller
        control={control}
        name={'assignee'}
        defaultValue={[]}
        render={({ field: { value, onChange } }) => (
          <Multiselect
            options={users.map((user) => user.full_name)}
            defaultValues={value?.map((user) => user.full_name) ?? []}
            placeholder="Selected assigned"
            onChange={onChange}
          />
        )}
      />
      <Select {...register('projectID')}>
        <option value="">Selected a Project</option>
        {listProjects.map((project) => (
          <option key={`option-project-${project.id}`} value={project.id}>
            {project.name}
          </option>
        ))}
      </Select>
      <TextInput
        {...register('deadline')}
        placeholder="Selected Email"
        type="date"
      />
      <Select {...register('status')}>
        <option value="BACKLOG">Selected a status</option>
        <option value={'BACKLOG'}>{'BACKLOG'}</option>
        <option value={'OPEN'}>{'OPEN'}</option>
        <option value={'IN PROGRESS'}>{'IN PROGRESS'}</option>
        <option value={'DONE'}>{'DONE'}</option>
        <option value={'DELETED'}>{'DELETED'}</option>
        <option value={'ARCHIVED'}>{'ARCHIVED'}</option>
        <option value={'CLOSED'}>{'CLOSED'}</option>
        <option value={'REOPENED'}>{'REOPENED'}</option>
        <option value={'PENDING'}>{'PENDING'}</option>
      </Select>
      <Select {...register('priority')}>
        <option value="">Selected a priority</option>
        <option value={'LOW'}>{'LOW'}</option>
        <option value={'MEDIUM'}>{'MEDIUM'}</option>
        <option value={'HIGH'}>{'HIGH'}</option>
        <option value={'URGENT'}>{'URGENT'}</option>
      </Select>
      <Select {...register('type')}>
        <option value="">Selected a type</option>
        <option value={'system integration'}>{'system integration'}</option>
        <option value={'widget'}>{'widget'}</option>
        <option value={'webservice'}>{'webservice'}</option>
        <option value={'serverless'}>{'serverless'}</option>
        <option value={'cf-deluge'}>{'cf-deluge'}</option>
        <option value={'configuration'}>{'configuration'}</option>
        <option value={'bug-fix'}>{'bug-fix'}</option>
        <option value={'call external'}>{'call external'}</option>
        <option value={'call internal'}>{'call internal'}</option>
        <option value={'others'}>{'others'}</option>
      </Select>
      <div className="flex justify-center w-full">
        <Button type="submit">Add</Button>
      </div>
    </form>
  )
}

const New = ({ module }: NewProps) => {
  if (module === 'project') {
    return <NewProject />
  }
  if (module === 'user') {
    return <NewUser />
  }
  if (module === 'task') {
    return <NewTask />
  }
  return <></>
}

export default New
