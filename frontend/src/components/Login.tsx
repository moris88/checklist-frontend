import useAccess from '../hooks/useAccess'
import { AccessToken, LoginAccess } from '../types/global'
import { useForm } from 'react-hook-form'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import { login } from '../utils/requester'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false)
  const { element, setElement, loading } = useAccess<AccessToken>({
    key: 'access_token',
    defaultValues: { token: null, username: null },
  })
  const { register, handleSubmit } = useForm<LoginAccess>({
    values: { username: '', password: '' },
  })

  console.log('login', element)

  useEffect(() => {
    if (element?.token && !loading) {
      setLoadingLogin(true)
      setTimeout(() => {
        navigate('/')
      }, 5000)
    }
  }, [element?.token, loading, navigate])

  if (loading || loadingLogin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  const onSubmit = (data: LoginAccess) => {
    login(data).then((response) => {
      if (response.status === 200) {
        setElement({
          token: response.token,
          username: data.username,
        })
      }
    })
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
          onClick={() => navigate('/register')}
        >
          Registrati
        </Button>
        <Button type="submit">Accedi</Button>
      </div>
    </form>
  )
}

export default Login
