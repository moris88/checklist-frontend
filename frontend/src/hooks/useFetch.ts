/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { SERVER_URL } from '../utils/metadata'

interface useFetchProps {
  endpoint?: string
  skip?: boolean
}

const useFetch = <T>({ endpoint, skip }: useFetchProps) => {
  const [response, setResponse] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<any>(null)

  const token = React.useMemo(() => {
    const data = localStorage.getItem('access_token')
    if (data) {
      const parsed = JSON.parse(data)
      return parsed.token
    }
    return null
  }, [])

  console.log('useFetch.skip', skip)
  console.log('useFetch.endpoint', endpoint)
  console.log('useFetch.token', token)
  console.log('useFetch.response', response)
  console.log('useFetch.loading', loading)
  console.log('useFetch.error', error)

  const myFetch = React.useCallback(
    ({
      method,
      url,
      body,
    }: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE'
      url: string
      body: any | null
    }) => {
      setLoading(true)
      setError(null)
      setResponse(null)
      const fetchGeneric = async () => {
        await fetch(`${SERVER_URL}${url}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: body ? JSON.stringify(body) : undefined,
        })
          .then((result) => result.json())
          .then((result) => {
            console.log('fetchGeneric', result)
            if (
              result &&
              result.statusText &&
              result.statusText === 'SUCCESS'
            ) {
              setResponse(result)
            } else {
              setError(result)
            }
          })
          .catch((e) => {
            console.log('Error', e)
            setError(e)
          })
          .finally(() => {
            setLoading(false)
          })
      }
      if (!token) {
        setLoading(false)
        return
      }
      fetchGeneric()
    },
    [token]
  )

  React.useEffect(() => {
    const fetchGet = async () => {
      await fetch(`${SERVER_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((result) => result.json())
        .then((result) => {
          console.log('fetchGet', result)
          if (result && result.statusText && result.statusText === 'SUCCESS') {
            setResponse(result)
          } else {
            setError(result)
          }
        })
        .catch((e) => {
          console.log('Error', e)
          setError(e)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    if (!token) {
      setLoading(false)
      return
    }
    if (skip) {
      setLoading(false)
      return
    }
    if (!endpoint) {
      setLoading(false)
      return
    }
    fetchGet()
  }, [endpoint, skip, token])

  return {
    setRequest: myFetch,
    response,
    loading,
    error,
  }
}

export default useFetch
