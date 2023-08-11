import { AccessToken, LoginAccess } from '../types/global'
import { useForm } from 'react-hook-form'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useAtom } from 'jotai'
import { accessState, setAccessState } from '../atoms'
import { useFetch } from '../hooks'

const Login = () => {
  const navigate = useNavigate()
  const [access, setAccess] = useAtom(accessState)
  const { response, loading, error, setRequest } = useFetch<{
    token: string
    owner: { id: string; name: string }
  }>({
    skip: true,
    skipToken: true,
  })
  const { register, handleSubmit } = useForm<LoginAccess>({
    values: { username: '', password: '' },
  })

  React.useEffect(() => {
    if (response) {
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 1)
      const access: AccessToken = {
        token: response.token,
        owner: response.owner,
        expiresAt: expiresAt.getTime(),
        createdAt: new Date().getTime(),
      }
      setAccess(access)
      setAccessState(access)
      setTimeout(() => {
        navigate('/')
      }, 5000)
    }
  }, [navigate, response, setAccess])

  const onSubmit = handleSubmit((data: LoginAccess) => {
    setRequest({
      url: '/login',
      method: 'POST',
      body: data,
    })
  })

  return (
    <form
      className="flex flex-col justify-center items-center h-screen gap-2 "
      onSubmit={onSubmit}
    >
      <div className="block border-b-2 border-gray-300 w-52">
        <p className="font-bold text-xl text-center">LOGIN</p>
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
        <TextInput
          disabled={loading || access?.token !== null}
          id="username"
          required
          type="text"
          {...register('username')}
        />
      </div>
      <div>
        <div className="block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          disabled={loading || access?.token !== null}
          id="password"
          required
          type="password"
          {...register('password')}
        />
      </div>
      <div>
        {(loading || access?.token) && (
          <div className="block">
            <div className="flex justify-center items-center mt-2">
              <Spinner />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-2 border-t-2 border-gray-300 w-52 mt-2 pt-4">
        <Button
          color="gray"
          type="button"
          disabled={loading || access?.token}
          onClick={() => navigate('/register')}
        >
          Registrati
        </Button>
        <Button disabled={loading || access?.token} type="submit">
          Accedi
        </Button>
      </div>
    </form>
  )
}

export default Login
