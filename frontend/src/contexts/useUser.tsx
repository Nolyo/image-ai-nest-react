import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchApiAuth } from 'utils'

type User = {
  email: string
  id: number
}

type Profile = {
  sub: number
  email: string
}

type UserContextType = {
  user?: User
  setAccessToken: (accessToken: string) => void
  logout: () => void
}
const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>()
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)

  const getProfile = async () => {
    const response = await fetchApiAuth<Profile>('/auth/profile')
    setUser({ email: response.email, id: response.sub })
  }

  const logout = () => {
    window.localStorage.removeItem('accessToken')
    setAccessToken(undefined)
    setUser(undefined)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setAccessToken(accessToken)
    }
  }, [])

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      getProfile()
    } else {
      localStorage.removeItem('accessToken')
    }
  }, [accessToken])

  return (
    <UserContext.Provider value={{ user, setAccessToken, logout }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }
