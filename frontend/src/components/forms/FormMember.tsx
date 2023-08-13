import { useForm } from 'react-hook-form'
import { Member } from '../../types/global'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useFetch } from '../../hooks'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface FormMemberProps {
  defaultValues?: Omit<Member, 'full_name' | 'id'>
  id?: string
}
const FormMember = ({ defaultValues, id }: FormMemberProps) => {
  const navigate = useNavigate()
  const {
    response: responseMembers,
    loading: loadingMember,
    error: errorMember,
    setRequest,
  } = useFetch<{
    members: Member[]
  }>({
    endpoint: '/members',
    skip: true,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Member, 'full_name' | 'id'>>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: 'NONE',
    },
  })

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  const onSubmit = handleSubmit((data) => {
    if (id) {
      setRequest({
        url: `/member/${id}`,
        method: 'PUT',
        body: {
          member: {
            ...data,
            full_name: `${data.first_name} ${data.last_name}`,
          },
        },
      })
      return
    }
    setRequest({
      url: '/member',
      method: 'POST',
      body: {
        member: {
          ...data,
          full_name: `${data.first_name} ${data.last_name}`,
        },
      },
    })
  })

  React.useEffect(() => {
    if (responseMembers) {
      navigate('/members')
    }
  }, [navigate, responseMembers])

  if (loadingMember) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (errorMember) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>ERROR</p>
        {errorMember && <pre>{JSON.stringify(errorMember, null, 5)}</pre>}
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
      {errors.email?.message && (
        <Label className="font-bold rounded-lg bg-red-400 p-2 text-red-800">
          {errors.email?.message as string}
        </Label>
      )}
      {errors.last_name?.message && (
        <Label className="font-bold rounded-lg bg-red-400 p-2 text-red-800">
          {errors.last_name?.message as string}
        </Label>
      )}
      <TextInput
        className="font-medium"
        placeholder="First Name"
        {...register('first_name')}
      />
      <TextInput
        className="font-medium"
        placeholder="Last Name"
        {...register('last_name', {
          required: { value: true, message: 'Mandatory Last Name' },
        })}
      />
      <TextInput
        className="font-medium"
        placeholder="Email"
        type="email"
        {...register('email', {
          required: { value: true, message: 'Mandatory Email' },
        })}
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

export default FormMember
