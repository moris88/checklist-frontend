import useAccess from '../hooks/useAccess'
import { AccessToken } from '../types/global'
import { useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react'
import { SERVER_URL, XAPIKEY } from '../utils/metadata'
import { Spinner } from './Spinner'

interface LoginAccess {
  username: string
  password: string
}

const Login = () => {
  const { element, setElement, loading } = useAccess<AccessToken>({
    key: 'access_token',
    defaultValues: { token: null, username: null },
  })
  const { register, handleSubmit } = useForm<LoginAccess>({
    values: { username: '', password: '' },
  })

  if (loading) {
    return <Spinner className="flex justify-center items-center h-screen" />
  }

  console.log(element)

  const onSubmit = async (data: LoginAccess) => {
    console.log(data)
    const response = await fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        xapikey: XAPIKEY,
      },
      body: JSON.stringify(data),
    }).then((d) => d.json())
    console.log(response, response.status === 200)
    if (response.status === 200) {
      console.log({
        token: response.token,
        username: data.username,
      })
      setElement({
        token: response.token,
        username: data.username,
      })
      window.location.href = '/'
    }
  }

  return (
    <form
      className="flex flex-col justify-center items-center h-screen gap-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="block border-b-2 border-gray-300 w-52">
        <p className="font-bold text-xl text-center">LOGIN</p>
      </div>
      <div>
        <div className="block">
          <Label htmlFor="username" value="Your username" />
        </div>
        <TextInput
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
          id="password"
          required
          type="password"
          {...register('password')}
        />
      </div>
      <div className="flex justify-center gap-2 border-t-2 border-gray-300 w-52 mt-2 pt-4">
        <Button
          color="gray"
          type="button"
          onClick={() => (window.location.href = '/register')}
        >
          Registrati
        </Button>
        <Button type="submit">Accedi</Button>
      </div>
    </form>
  )
}

export default Login
