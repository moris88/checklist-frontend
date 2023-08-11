/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { Member } from '../../types/global'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useFetch } from '../../hooks'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface FormMemberProps {
  defaultValues?: Omit<Member, 'full_name' | 'id'>
}
const FormMember = ({ defaultValues }: FormMemberProps) => {
  const navigate = useNavigate()
  const {
    response: responseMembers,
    loading: loadingMember,
    error: errorMember,
    setRequest,
  } = useFetch<{
    members: Member[]
    statusText: 'SUCCESS' | 'ERROR' | 'WARNING'
  }>({
    endpoint: '/members',
    skip: true,
  })
  const [values, setValues] = React.useState<Omit<Member, 'full_name' | 'id'>>(
    defaultValues ?? {
      first_name: '',
      last_name: '',
      email: '',
      role: 'NONE',
    }
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Member, 'full_name' | 'id'>>({ defaultValues: values })

  React.useEffect(() => {
    if (defaultValues) {
      setValues(defaultValues)
    }
  }, [defaultValues])

  const onSubmit = handleSubmit((data) => {
    console.log(data)
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
      console.log('responseMembers', responseMembers)
      if (
        responseMembers &&
        responseMembers.statusText &&
        responseMembers.statusText === 'SUCCESS'
      ) {
        navigate('/members')
      }
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
      <div className="flex justify-center items-center h-screen">
        <p>ERROR</p>
      </div>
    )
  }

  return (
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

export default FormMember
