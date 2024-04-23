import { useUser } from 'contexts/useUser'
import { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function PrivateRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { user } = useUser()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate('/auth/login?redirect=' + location.pathname)
    }
  }, [user, navigate, location]) // Ajoutez user et navigate comme dépendances

  // Si l'utilisateur existe, affichez le composant enfant
  return user ? children : null
}

export default PrivateRoute
