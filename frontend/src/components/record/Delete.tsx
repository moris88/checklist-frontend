import { Module } from '../../types/global'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../Modal'
import { Spinner } from 'flowbite-react'
import React from 'react'
import { request } from '../../utils/request'

interface DeleteProps {
  module: Module
}

const Delete = ({ module }: DeleteProps) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [response, setResponse] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = React.useState<any>(null)

  const handleDelete = () => {
    setLoading(true)
    request({
      url: `/${module}/${id}`,
      method: 'DELETE',
      body: null,
    })
      .then((response) => {
        console.log(response)
        setResponse(true)
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (response) {
    return (
      <>
        <Modal
          show={true}
          message={`The ${module} has been successfully deleted!`}
          title={'Danger'}
          onAccept={() => navigate(`/${module}s`)}
          onClose={() => navigate(`/${module}s`)}
        />
      </>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>ERROR</p>
        <pre>{JSON.stringify(error, null, 5)}</pre>
      </div>
    )
  }

  return (
    <>
      <Modal
        show={true}
        message={`Are you sure to delete the ${module} ${id}?`}
        title={'Danger'}
        onAccept={handleDelete}
        onClose={() => navigate(-1)}
        onDecline={() => navigate(-1)}
        colorAccept="failure"
      />
    </>
  )
}

export default Delete
