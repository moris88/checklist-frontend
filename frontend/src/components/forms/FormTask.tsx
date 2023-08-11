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

interface FormTaskProps {
  defaultValues?: Omit<Task, 'createdAt' | 'updatedAt' | 'id'>
}

const FormTask = ({ defaultValues }: FormTaskProps) => {
  const navigate = useNavigate()
  const {
    response: responseMembers,
    loading: loadingMember,
    error: errorMember,
  } = useFetch<{
    members: Member[]
    statusText: 'SUCCESS' | 'ERROR' | 'WARNING'
  }>({
    endpoint: '/members',
  })
  const {
    response: responseProjects,
    loading: loadingProjects,
    error: errorProjects,
  } = useFetch<{
    projects: Project[]
    statusText: 'SUCCESS' | 'ERROR' | 'WARNING'
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
    statusText: 'SUCCESS' | 'ERROR' | 'WARNING'
  }>({
    skip: true,
  })
  const projects = responseProjects?.projects ?? []
  const members = responseMembers?.members ?? []
  const [values, setValues] = React.useState<
    Omit<Task, 'createdAt' | 'updatedAt' | 'id'>
  >(
    defaultValues ?? {
      title: '',
      description: null,
      assignee: null,
      projectID: null,
      deadline: new Date().toISOString().split('T')[0],
      priority: 'LOW',
      type: 'others',
      status: 'BACKLOG',
    }
  )
  const isEdit = defaultValues !== undefined
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Task, 'createdAt' | 'updatedAt' | 'id'>>({
    values: values,
  })

  React.useEffect(() => {
    if (defaultValues) {
      setValues(defaultValues)
    }
  }, [defaultValues])

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    setRequest({
      url: '/task',
      method: 'POST',
      body: {
        task: data,
      },
    })
  })

  React.useEffect(() => {
    if (responseTasks) {
      console.log('responseTasks', responseTasks)
      if (
        responseTasks &&
        responseTasks.statusText &&
        responseTasks.statusText === 'SUCCESS'
      ) {
        navigate('/tasks')
      }
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
      <div className="flex justify-center items-center h-screen">
        <p>ERROR</p>
      </div>
    )
  }

  const handleChangeProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
  }

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
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
        {projects.map((project) => (
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
      <div className="flex justify-center w-full gap-3">
        <Button color="gray" onClick={() => navigate(-1)}>
          Done
        </Button>
        <Button type="submit">{defaultValues ? 'Edit' : 'Save'}</Button>
      </div>
    </form>
  )
}

export default FormTask
