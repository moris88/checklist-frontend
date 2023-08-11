/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import useStore from '../../hooks/useStore'
import { Member } from '../../types/global'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { members } from '../../utils/users'
import { useEffect, useState } from 'react'

export const systemDefault: any[] = [
  {
    id: 1,
    userID: 9,
    projectID: 1,
    taskID: 1,
  },
]

interface FormUserProps {
  defaultValues?: Member
}
const FormMember = ({ defaultValues }: FormUserProps) => {
  const [values, setValues] = useState<Member>(
    defaultValues ?? {
      id: 0,
      first_name: '',
      last_name: '',
      full_name: '',
      email: '',
      role: 'NONE',
    }
  )
  const { addElement } = useStore<any>({
    key: 'member',
    defaultValues: members,
  })
  const { elements: systems, addElement: addSystem } = useStore<any>({
    key: 'system',
    defaultValues: systemDefault,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Member>({ defaultValues: values })

  useEffect(() => {
    if (defaultValues) {
      setValues(defaultValues)
    }
  }, [defaultValues])

  const onSubmit = (data: Member) => {
    const [system] = systems
    data.id = system.userID
    addSystem({ ...system, userID: system.userID + 1 })
    data.full_name = `${data.first_name} ${data.last_name}`.trim()
    addElement(data)
    window.location.href = '/users'
  }

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
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
