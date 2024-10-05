import { useForm } from 'react-hook-form'
import { User } from '@/types'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useFetch } from '@/hooks'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface FormMemberProps {
  defaultValues?: Omit<User, 'updatedAt' | 'createdAt' | 'id'>
}
const FormProfile = ({ defaultValues }: FormMemberProps) => {
  const navigate = useNavigate()
  const [output, setOutput] = React.useState<string | null>(null)
  const {
    response: responseProfiles,
    loading: loadingProfiles,
    error: errorProfiles,
    setRequest,
  } = useFetch<{
    profiles: User[]
  }>({
    endpoint: '/members',
    skip: true,
  })
  const [values, setValues] = React.useState<
    Omit<User, 'updatedAt' | 'createdAt' | 'id'>
  >(
    defaultValues ?? {
      username: '',
      password: null,
      role: 'USER',
    }
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<User, 'updatedAt' | 'createdAt' | 'id'>>({
    defaultValues: values,
  })

  React.useEffect(() => {
    if (defaultValues) {
      setValues(defaultValues)
    }
  }, [defaultValues])

  const onSubmit = handleSubmit((data) => {
    setRequest({
      url: '/profile',
      method: 'POST',
      body: {
        member: {
          ...data,
        },
      },
    })
  })

  React.useEffect(() => {
    if (responseProfiles) {
      setOutput('Changes made successfully')
    }
  }, [navigate, responseProfiles])

  if (loadingProfiles) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (errorProfiles) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>ERROR</p>
        {errorProfiles && <pre>{JSON.stringify(errorProfiles, null, 5)}</pre>}
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
      {output && (
        <div className="flex justify-center items-center p-4">
          <p>{output}</p>
        </div>
      )}
      {errors.username?.message && (
        <Label className="font-bold text-red-500">
          {errors.username?.message}
        </Label>
      )}
      {errors.role?.message && (
        <Label className="font-bold text-red-500">{errors.role?.message}</Label>
      )}
      {errors.password && (
        <div className="block">
          <ul className="font-bold bg-red-400 text-red-800 text-center rounded-lg p-2">
            <li>The password must contain:</li>
            <li>at least 8 characters</li>
            <li>at least one lowercase letter (a-z)</li>
            <li>at least one uppercase letter (A-Z)</li>
            <li>at least one digit (0-9)</li>
            <li>at least one special character of the set: @$!%*?&#</li>
          </ul>
        </div>
      )}
      <TextInput
        className="font-medium"
        placeholder="Username"
        {...register('username', {
          required: true,
          maxLength: { value: 20, message: 'Username too long' },
          minLength: { value: 3, message: 'Username too short' },
        })}
      />
      <TextInput
        className="font-medium"
        placeholder="Password"
        type="password"
        {...register('password', {
          required: true,
          minLength: { value: 8, message: 'Insecure password' },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            message: 'Insecure password',
          },
        })}
      />
      <Select {...register('role')} disabled>
        <option value="NONE">Selected a role</option>
        <option value={'USER'}>{'USER'}</option>
        <option value={'ADMIN'}>{'ADMIN'}</option>
      </Select>
      <div className="flex justify-center w-full gap-3">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Done
        </Button>
        <Button color="success" type="submit" disabled>
          <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
          Save
        </Button>
      </div>
    </form>
  )
}

export default FormProfile
