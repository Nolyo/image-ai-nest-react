export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export async function fetchAPI<T>(
  endpoint: string,
  method = 'get',
  body?: Record<string, any>
): Promise<T> {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return response.json()
}

export async function fetchApiAuth<T>(
  endpoint: string,
  method = 'get',
  body?: Record<string, any>
): Promise<T> {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return response.json()
}
