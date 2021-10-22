interface RequestOptions {
  path: string
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH'
  body?: any
}

export async function request<T>(options: RequestOptions): Promise<T> {
  const { path, method, body } = options

  const response = await fetch(`http://localhost:3100/api/v1/${path}`, {
    method: method,
    credentials: 'include',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw response
  }

  return response.json()
}
