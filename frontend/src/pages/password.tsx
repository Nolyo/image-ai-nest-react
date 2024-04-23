import React, { useEffect, useState } from 'react'
import { fetchAPI } from 'utils'

export default function Password() {
  const [antiBrutForce, setAntiBrutForce] = useState(false)

  useEffect(() => {
    void (async () => {
      const a = await fetchAPI('/auth/login', 'post', {
        username: 'nolyo',
        password: '123456'
      })
      // const a = await fetchAPI('/cats', 'get')
      console.log(a)
    })()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAntiBrutForce(true)
    const password = (
      e.currentTarget.elements.namedItem('password') as HTMLInputElement
    ).value
    setTimeout(() => {
      if (password.length) {
        window.localStorage.setItem('password', password)
        window.location.reload()
      }
      console.log('Password is required')
      setAntiBrutForce(false)
    }, 5000)
  }

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="mt-5 flex w-1/2 flex-col items-center gap-4 rounded border p-5"
      >
        <input
          aria-label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="input w-2/3"
        />
        {antiBrutForce && (
          <div className="text-sm text-red-500">
            Anti brut force protection enabled, please wait 5 seconds
          </div>
        )}

        <div>
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
