import { SERVER_URL } from './metadata'

export async function request<T>({
  method,
  url,
  body,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  body: T | null
}) {
  const accessToken = JSON.parse(localStorage.getItem('AccessToken') ?? '{}')
  return await fetch(`${SERVER_URL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken ? accessToken.token : ''}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then((result) => {
    try {
      result.json()
    } catch (e) {
      return null
    }
  })
}
