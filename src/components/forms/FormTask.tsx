import { Controller, useForm } from 'react-hook-form'
import { Project, Task, Member } from '../../types/global'
import {
  Button,
  Label,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react'
import Multiselect from '../Multiselect'
import { useFetch } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import moment from 'moment'

interface FormTaskProps {
  defaultValues?: Omit<Task, 'createdAt' | 'updatedAt' | 'id'>
  id?: string
}

const FormTask = ({ defaultValues, id }: FormTaskProps) => {
  const navigate = useNavigate()
  const {
    response: responseMembers,
    loading: loadingMember,
    error: errorMember,
  } = useFetch<{
    members: Member[]
  }>({
    endpoint: '/members',
  })
  const {
    response: responseProjects,
    loading: loadingProjects,
    error: errorProjects,
  } = useFetch<{
    projects: Project[]
  }>({
    endpoint: '/projects',
  })
  const {
    response: responseTasks,
    loading: loadingTasks,
    error: errorTasks,
    setRequest,
  } = useFetch<{
    tasks: Task[]
  }>({
    skip: true,
  })
  const projects = responseProjects?.projects ?? []
  const members = responseMembers?.members ?? []

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Task, 'createdAt' | 'updatedAt' | 'id'>>({
    defaultValues: {
      title: '',
      description: null,
      assignee: null,
      project: null,
      deadline: moment().format('YYYY-MM-DD'),
      priority: 'LOW',
      type: 'others',
      status: 'BACKLOG',
    },
  })

  React.useEffect(() => {
    if (defaultValues) {
      console.log('defaultValues', defaultValues)
      reset({
        ...defaultValues,
        project: `{"id": "${defaultValues.project.id}", "name": "${defaultValues.project.name}"}`,
      })
    }
  }, [defaultValues, reset])

  const onSubmit = handleSubmit((data) => {
    if (id) {
      setRequest({
        url: `/task/${id}`,
        method: 'PUT',
        body: {
          task: {
            ...data,
            project: JSON.parse(data.project),
          },
        },
      })
      return
    } else {
      setRequest({
        url: '/task',
        method: 'POST',
        body: {
          task: {
            ...data,
            project: JSON.parse(data.project),
          },
        },
      })
    }
  })

  React.useEffect(() => {
    if (responseTasks) {
      navigate('/tasks')
    }
  }, [navigate, responseTasks])

  if (loadingMember || loadingProjects || loadingTasks) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (errorMember || errorProjects || errorTasks) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>ERROR</p>
        {errorMember && <pre>{JSON.stringify(errorMember, null, 5)}</pre>}
        {errorProjects && <pre>{JSON.stringify(errorProjects, null, 5)}</pre>}
        {errorTasks && <pre>{JSON.stringify(errorTasks, null, 5)}</pre>}
      </div>
    )
  }

  // const handleChangeProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log(e.target.value)
  // }

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
      {errors.title?.message && (
        <Label className="font-bold rounded-lg bg-red-400 p-2 text-red-800">
          {errors.title?.message as string}
        </Label>
      )}
      {errors.project?.message && (
        <Label className="font-bold rounded-lg bg-red-400 p-2 text-red-800">
          {errors.project?.message as string}
        </Label>
      )}
      <Label className="font-bold">Name Task</Label>
      <TextInput
        className="font-medium"
        {...register('title', {
          required: { value: true, message: 'Mandatory Title Task' },
        })}
      />
      <Label className="font-bold">Description Task</Label>
      <Textarea className="font-medium" rows={4} {...register('description')} />
      <Label className="font-bold">Selected a Project</Label>
      <Select
        {...register('project', {
          required: { value: true, message: 'Mandatory Project' },
        })}
        disabled={id ? true : false}
      >
        <option value={''}>{'--NONE--'}</option>
        {projects.map((project) => (
          <option
            key={`option-project-${project.id}`}
            value={`{"id": "${project.id}", "name": "${project.name}"}`}
          >
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
          return (
            <Multiselect
              options={members.map((user) => ({
                id: user.id,
                name: user.full_name,
              }))}
              disabled={members.length === 0}
              defaultValues={
                value ? (value as { id: string; name: string }[]) : []
              }
              placeholder="Selected assigned"
              onChange={(e) => {
                console.log(e)
                onChange(e)
              }}
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
      <div className="flex justify-center w-full gap-3">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Done
        </Button>
        <Button color="success" type="submit">
          <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
          Save
        </Button>
      </div>
    </form>
  )
}

export default FormTask
