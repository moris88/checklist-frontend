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
  const [message, setMessage] = useState<string | null>(null)
  const { element, setElement, loading } = useAccess<AccessToken>({
    key: 'access_token',
    defaultValues: {
      token: null,
      owner: null,
      expiresAt: null,
      createdAt: null,
    },
  })
  const { register, handleSubmit } = useForm<LoginAccess>({
    values: { username: '', password: '' },
  })

  console.log('login', element)

  useEffect(() => {
    if (element?.token && !loading) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [element?.token, loading, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  const onSubmit = (data: LoginAccess) => {
    setLoadingLogin(true)
    login(data)
      .then((response) => {
        if (response.status === 200) {
          const expiresAt = new Date()
          expiresAt.setHours(expiresAt.getHours() + 1)
          setElement({
            token: response.token,
            owner: response.owner,
            expiresAt: expiresAt.getTime(),
            createdAt: new Date().getTime(),
          })
        }
        if (response.status === 404) {
          setMessage('Username non trovato!')
          setLoadingLogin(false)
        }
        if (response.status === 401) {
          setMessage('Username o password errati!')
          setLoadingLogin(false)
        }
      })
      .catch((error) => {
        console.log(error)
        setMessage(error.message)
        setLoadingLogin(false)
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
      {message && (
        <div className="block">
          <p className="font-bold bg-red-400 text-red-800 text-center rounded-lg shadow-lg">
            {message}
          </p>
        </div>
      )}
      <div>
        <div className="block">
          <Label htmlFor="username" value="Your username" />
        </div>
        <TextInput
          disabled={loadingLogin}
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
          disabled={loadingLogin}
          id="password"
          required
          type="password"
          {...register('password')}
        />
      </div>
      <div>
        {loadingLogin && (
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
          disabled={loadingLogin}
          onClick={() => navigate('/register')}
        >
          Registrati
        </Button>
        <Button disabled={loadingLogin} type="submit">
          Accedi
        </Button>
      </div>
    </form>
  )
}

export default Login
