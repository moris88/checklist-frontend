import { RegisterAccess } from '../types/global'
import { useForm } from 'react-hook-form'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { register } from '../utils/requester'

const Register = () => {
  const navigate = useNavigate()
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false)
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { register: registerForm, handleSubmit } = useForm<RegisterAccess>({
    values: { username: '', password: '', confirmPassword: '' },
  })

  if (loadingRegister) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (output) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-2">
        <p className="font-bold text-center">{output}</p>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    )
  }

  const onSubmit = (data: RegisterAccess) => {
    setLoadingRegister(true)
    setError(null)
    console.log(data)
    if (data.password !== data.confirmPassword) {
      console.log('Password non coincidono')
      setError('Password non coincidono')
      return
    }
    register(data).then((response) => {
      if (response.status === 200) {
        setTimeout(() => {
          setOutput('Registrazione effettuata con successo')
          setLoadingRegister(false)
        }, 5000)
      }
    })
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
        <div className="block p-2 rounded-lg shadow-lg bg-red-400 text-red-800">
          <p className="font-bold text-center">{error}</p>
        </div>
      )}
      <div>
        <div className="block">
          <Label htmlFor="username" value="Your username" />
        </div>
        <TextInput
          id="username"
          required
          type="text"
          {...registerForm('username')}
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
          {...registerForm('password')}
        />
      </div>
      <div>
        <div className="block">
          <Label htmlFor="confirmPassword" value="Confirm your password" />
        </div>
        <TextInput
          id="confirmPassword"
          required
          type="password"
          {...registerForm('confirmPassword')}
        />
      </div>
      <div className="flex justify-center gap-2 border-t-2 border-gray-300 w-52 mt-2 pt-4">
        <Button type="submit">Crea Account</Button>
      </div>
    </form>
  )
}

export default Register
