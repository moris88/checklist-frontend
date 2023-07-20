import { Controller, useForm } from 'react-hook-form'
import useStore from '../../hooks/useStore'
import { Project, System, Task, User } from '../../types/global'
import { systemDefault } from '../../utils/system'
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react'
import Multiselect from '../Multiselect'
import { useEffect, useState } from 'react'

interface FormTaskProps {
  defaultValues?: Task
}

const FormTask = ({ defaultValues }: FormTaskProps) => {
  const [values, setValues] = useState<Task>(
    defaultValues ?? {
      id: 0,
      title: '',
      description: null,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      assignee: null,
      projectID: null,
      subService: null,
      deadline: new Date().toISOString().split('T')[0],
      priority: 'LOW',
      type: 'others',
      status: 'BACKLOG',
    }
  )
  const isEdit = defaultValues !== undefined
  const { elements: systems, addElement: addSystem } = useStore<System>({
    key: 'system',
    defaultValues: systemDefault,
  })
  const { addElement } = useStore<Task>({
    key: 'task',
    defaultValues: [],
  })
  const [members, setMembers] = useState<User[]>([])
  const { elements: listProjects } = useStore<Project>({
    key: 'project',
    defaultValues: [],
  })
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Task>({
    values: values,
  })

  console.count('GET VALUES')
  console.log('GET VALUES', getValues())

  useEffect(() => {
    if (defaultValues) {
      console.log('defaultValues', defaultValues)
      setValues(defaultValues)
      const project = listProjects.filter(
        (project) => project.id === defaultValues.projectID
      )
      console.log('project', project)
      if (project.length > 0 && project[0].members !== null) {
        setMembers(project[0].members)
      } else {
        setMembers([])
      }
    }
  }, [defaultValues, listProjects])

  console.log('members', members)

  const onSubmit = (data: Task) => {
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
  }

  const handleChangeProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const project = listProjects.filter(
      (project) => project.id === +e.target.value
    )
    if (project.length > 0 && project[0].members !== null) {
      setMembers(project[0].members)
    } else {
      setMembers([])
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      {errors.title?.message && (
        <Label className="font-bold text-red-500">
          {errors.title?.message}
        </Label>
      )}
      {errors.description?.message && (
        <Label className="font-bold text-red-500">
          {errors.description?.message}
        </Label>
      )}
      <Label className="font-bold">Name Task</Label>
      <TextInput
        className="font-medium"
        {...register('title', { required: 'Mandatory Title Task' })}
      />
      <Label className="font-bold">Description Task</Label>
      <Textarea className="font-medium" rows={4} {...register('description')} />
      <Label className="font-bold">Selected a Project</Label>
      <Select
        {...register('projectID', { required: 'Mandatory Project' })}
        onChange={handleChangeProject}
        disabled={isEdit}
      >
        <option value={''}>{'--NONE--'}</option>
        {listProjects.map((project) => (
          <option key={`option-project-${project.id}`} value={project.id}>
            {project.name}
          </option>
        ))}
      </Select>
      <Label className="font-bold">Selected Members Task</Label>
      <Controller
        control={control}
        name={'assignee'}
        defaultValue={[]}
        render={({ field: { value, onChange } }) => {
          console.log('value', value?.filter((el) => el !== undefined))
          return (
            <Multiselect
              options={members.map((user) => user.full_name)}
              disabled={members.length === 0}
              defaultValues={
                value
                  ?.filter((el) => el !== undefined)
                  .map((user) => user.full_name) ?? []
              }
              placeholder="Selected assigned"
              onChange={onChange}
            />
          )
        }}
      />
      <Label className="font-bold">Insert a Deadline Task</Label>
      <TextInput {...register('deadline')} type="date" />
      <Label className="font-bold">Selected a Status</Label>
      <Select {...register('status')}>
        <option value={''}>{'--NONE--'}</option>
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
      <Label className="font-bold">Selected a Priority</Label>
      <Select {...register('priority')}>
        <option value={''}>{'--NONE--'}</option>
        <option value={'LOW'}>{'LOW'}</option>
        <option value={'MEDIUM'}>{'MEDIUM'}</option>
        <option value={'HIGH'}>{'HIGH'}</option>
        <option value={'URGENT'}>{'URGENT'}</option>
      </Select>
      <Label className="font-bold">Selected a Type</Label>
      <Select {...register('type')}>
        <option value={''}>{'--NONE--'}</option>
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
        <Button type="submit">SAVE</Button>
      </div>
    </form>
  )
}

export default FormTask
