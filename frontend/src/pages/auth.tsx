import Layout from 'components/Layout'
import { useUser } from 'contexts/useUser'
import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchAPI } from 'utils'

export default function Auth() {
  const [error, setError] = useState<string | null>(null)
  const { setAccessToken, user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // if redirect is in params then redirect to that path else redirect to home
    if (user) {
      const redirect = new URLSearchParams(location.search).get('redirect')
      navigate(redirect || '/')
    }
  }, [user, navigate, location])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = (await fetchAPI('/auth/login', 'post', {
        email,
        password
      })) as { access_token: string }
      setAccessToken(response.access_token)
    } catch (error: any) {
      setError('Invalid email or password')
    }
  }

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center text-black">
        <div className=" rounded bg-gray-700 p-8">
          <form onSubmit={onSubmit} className="min-w-[400px]">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
            {error && (
              <div className="mt-3 w-full text-center">
                <p className="rounded bg-red-500 p-2 font-bold text-white">
                  {error}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  )
}
