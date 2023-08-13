/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { SERVER_URL } from '../utils/metadata'
import { useAtom } from 'jotai'
import { accessState } from '../atoms'

interface useFetchProps {
  endpoint?: string
  skip?: boolean
  skipToken?: boolean
}

const useFetch = <T>({ endpoint, skip, skipToken }: useFetchProps) => {
  const [response, setResponse] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<any>(null)
  const [access] = useAtom(accessState)

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
            Authorization: `Bearer ${access?.token}`,
          },
          body: body ? JSON.stringify(body) : undefined,
        })
          .then((result) => result.json())
          .then((result) => {
            console.log('result', result)
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
            setError(e)
          })
          .finally(() => {
            setLoading(false)
          })
      }
      if (skipToken) {
        fetchGeneric()
        return
      }
      if (!access?.token) {
        setLoading(false)
        return
      }
      fetchGeneric()
    },
    [access?.token, skipToken]
  )

  React.useEffect(() => {
    const fetchGet = async () => {
      await fetch(`${SERVER_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access?.token}`,
        },
      })
        .then((result) => result.json())
        .then((result) => {
          if (result && result.statusText && result.statusText === 'SUCCESS') {
            setResponse(result)
          } else {
            setError(result)
          }
        })
        .catch((e) => {
          setError(e)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    if (skip) {
      setLoading(false)
      return
    }
    if (!endpoint) {
      setLoading(false)
      return
    }
    if (!access?.token) {
      setLoading(false)
      return
    }
    fetchGet()
  }, [endpoint, skip, access?.token])

  return {
    setRequest: myFetch,
    response,
    loading,
    error,
  }
}

export default useFetch
