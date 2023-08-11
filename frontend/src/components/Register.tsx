import { RegisterAccess } from '../types/global'
import { useForm } from 'react-hook-form'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useFetch } from '../hooks'

const Register = () => {
  const navigate = useNavigate()
  const [loadingRegister, setLoadingRegister] = React.useState(false)
  const [output, setOutput] = React.useState<string | null>(null)
  const [errorPwd, setErrorPwd] = React.useState<string | null>(null)
  const { response, loading, error, setRequest } = useFetch<{
    token: string
    owner: { id: string; name: string }
  }>({
    skip: true,
    skipToken: true,
  })
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterAccess>({
    values: { username: '', password: '', confirmPassword: '' },
  })

  React.useEffect(() => {
    if (response) {
      setTimeout(() => {
        setOutput('Registrazione effettuata con successo')
        setLoadingRegister(false)
      }, 5000)
    }
  }, [navigate, response])

  if (output) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-2">
        <p className="font-bold text-center">{output}</p>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    )
  }

  const onSubmit = (data: RegisterAccess) => {
    setErrorPwd(null)
    if (data.password !== data.confirmPassword) {
      setErrorPwd('Passwords do not match')
      return
    }
    setRequest({
      url: '/register',
      method: 'POST',
      body: data,
    })
    setLoadingRegister(true)
  }

  return (
    <form
      className="flex flex-col justify-center items-center h-screen gap-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="block border-b-2 border-gray-300">
        <p className="font-bold text-xl text-center">REGISTRAZIONE ACCOUNT</p>
      </div>
      {error && (
        <div className="block">
          <p className="font-bold bg-red-400 text-red-800 text-center rounded-lg p-2">
            {error?.message ?? error?.error}
          </p>
        </div>
      )}
      <div>
        <div className="block">
          <Label htmlFor="username" value="Your username" />
        </div>
        {errors.username && (
          <div className="block">
            <p className="font-bold bg-red-400 text-red-800 text-center rounded-lg p-2">
              {errors.username.message}
            </p>
          </div>
        )}
        <TextInput
          id="username"
          required
          disabled={loadingRegister}
          type="text"
          {...registerForm('username', {
            required: true,
            maxLength: { value: 20, message: 'Username too long' },
            minLength: { value: 3, message: 'Username too short' },
          })}
        />
      </div>
      <div>
        <div className="block">
          <Label htmlFor="password" value="Your password" />
        </div>
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
          id="password"
          required
          disabled={loadingRegister}
          type="password"
          {...registerForm('password', {
            required: true,
            minLength: { value: 8, message: 'Insecure password' },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
              message: 'Insecure password',
            },
          })}
        />
      </div>
      <div>
        <div className="block">
          <Label htmlFor="confirmPassword" value="Confirm your password" />
        </div>
        {errorPwd && (
          <div className="block">
            <p className="font-bold bg-red-400 text-red-800 text-center rounded-lg p-2">
              {errorPwd}
            </p>
          </div>
        )}
        <TextInput
          id="confirmPassword"
          required
          disabled={loadingRegister}
          type="password"
          {...registerForm('confirmPassword')}
        />
      </div>
      <div>
        {(loading || loadingRegister) && (
          <div className="block">
            <div className="flex justify-center items-center mt-2">
              <Spinner />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-3 border-t-2 border-gray-300 w-52 mt-2 pt-4">
        <Button color="gray" onClick={() => navigate(-1)}>
          Done
        </Button>
        <Button type="submit">Crea Account</Button>
      </div>
    </form>
  )
}

export default Register
