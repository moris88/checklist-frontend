import { Controller, useForm } from 'react-hook-form'
import { Project } from '../../types/global'
import {
  Button,
  Label,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react'
import Multiselect from '../Multiselect'
import React from 'react'
import { useUsers } from '../../hooks'
import { createProject } from '../../utils/requester'
import { useNavigate } from 'react-router-dom'

interface FormProjectProps {
  defaultValues?: Omit<Project, 'createdAt' | 'updatedAt' | 'id'>
}

const FormProject = ({ defaultValues }: FormProjectProps) => {
  const navigate = useNavigate()
  const { users, loading: lu } = useUsers({})
  const [values, setValues] = React.useState<
    Omit<Project, 'createdAt' | 'updatedAt' | 'id'>
  >(
    defaultValues ?? {
      name: '',
      description: null,
      members: null,
      service: null,
      subService: null,
      state: 'OPENED',
    }
  )

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Project, 'createdAt' | 'updatedAt' | 'id'>>({
    values: values,
  })

  const token = React.useMemo(() => {
    const data = localStorage.getItem('access_token')
    if (data) {
      const parsed = JSON.parse(data)
      return parsed.token
    }
    return null
  }, [])

  React.useEffect(() => {
    if (defaultValues) {
      setValues(defaultValues)
    }
  }, [defaultValues])

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    createProject(token, data)
    navigate('/projects')
  })

  if (lu) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
      {errors.name?.message && (
        <Label className="font-bold text-red-500">{errors.name?.message}</Label>
      )}
      <Label className="font-bold">Name Project</Label>
      <TextInput
        className="font-medium"
        {...register('name', { required: 'Mandatory Name Project' })}
      />
      <Label className="font-bold">Description Project</Label>
      <Textarea className="font-medium" rows={4} {...register('description')} />
      <Label className="font-bold">Select Members Project</Label>
      <Controller
        control={control}
        name={'members'}
        defaultValue={defaultValues?.members ?? []}
        render={({ field: { value, onChange } }) => {
          return (
            <Multiselect
              options={users.map((user) => user.full_name)}
              defaultValues={
                value
                  ?.filter((el) => el !== undefined)
                  .map((user) => user.full_name) ?? []
              }
              placeholder="Selected a member"
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
      <div className="flex justify-center w-full">
        <Button type="submit">SAVE</Button>
      </div>
    </form>
  )
}

export default FormProject
