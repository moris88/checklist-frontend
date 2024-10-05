import { Controller, useForm } from 'react-hook-form'
import { Member, Project } from '@/types'
import {
  Button,
  Label,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react'
import { Multiselect } from '@/components'
import React from 'react'
import { useFetch } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface FormProjectProps {
  defaultValues?: Omit<Project, 'createdAt' | 'updatedAt' | 'id'>
  id?: string
}

const FormProject = ({ defaultValues, id }: FormProjectProps) => {
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
    setRequest,
  } = useFetch<{
    members: Member[]
  }>({
    skip: true,
  })
  const members = responseMembers?.members ?? []

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Project, 'createdAt' | 'updatedAt' | 'id'>>({
    defaultValues: {
      name: '',
      description: null,
      members: null,
      service: null,
      subService: null,
      state: 'OPENED',
    },
  })

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  React.useEffect(() => {
    if (responseProjects) {
      navigate('/projects')
    }
  }, [navigate, responseProjects])

  const onSubmit = handleSubmit((data) => {
    if (id) {
      setRequest({
        url: `/project/${id}`,
        method: 'PUT',
        body: {
          project: data,
        },
      })
    } else {
      setRequest({
        url: '/project',
        method: 'POST',
        body: {
          project: data,
        },
      })
    }
  })

  if (loadingMember || loadingProjects) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (errorMember || errorProjects) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>ERROR</p>
        {errorMember && <pre>{JSON.stringify(errorMember, null, 5)}</pre>}
        {errorProjects && <pre>{JSON.stringify(errorProjects, null, 5)}</pre>}
      </div>
    )
  }
  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
      {errors.name?.message && (
        <Label className="font-bold rounded-lg bg-red-400 p-2 text-red-800">
          {errors.name?.message as string}
        </Label>
      )}
      <Label className="font-bold">Name Project</Label>
      <TextInput
        className="font-medium"
        {...register('name', {
          required: { value: true, message: 'Mandatory Project' },
        })}
      />
      <Label className="font-bold">Description Project</Label>
      <Textarea className="font-medium" rows={4} {...register('description')} />
      <Label className="font-bold">Select Members Project</Label>
      <Controller
        control={control}
        name={'members'}
        defaultValue={defaultValues?.members ?? []}
        render={({ field: { value, onChange } }) => {
          console.log('Controller.render.value', value)
          return (
            <Multiselect
              options={members.map((m) => ({ id: m.id, name: m.full_name }))}
              defaultValues={value ?? []}
              placeholder="Selected a member"
              maxItems={10}
              onChange={onChange}
            />
          )
        }}
      />
      <Label className="font-bold">Selected a service</Label>
      <Select {...register('service')}>
        <option value={''}>{'--NONE--'}</option>
        <option value={'Zoho'}>{'Zoho'}</option>
        <option value={'Freshworks'}>{'Freshworks'}</option>
        <option value={'Hubspot'}>{'Hubspot'}</option>
        <option value={'Zendesk'}>{'Zendesk'}</option>
        <option value={'others'}>{'others'}</option>
      </Select>
      <Label className="font-bold">Selected a sub-service</Label>
      <Select {...register('subService')}>
        <option value={''}>{'--NONE--'}</option>
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
      <Label className="font-bold">Selected a state</Label>
      <Select {...register('state')}>
        <option value={''}>{'--NONE--'}</option>
        <option value={'OPENED'}>{'OPENED'}</option>
        <option value={'ACTIVE'}>{'ACTIVE'}</option>
        <option value={'CLOSED'}>{'CLOSED'}</option>
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

export default FormProject
