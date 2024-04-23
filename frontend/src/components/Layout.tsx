import { ReactNode } from 'react'
import Navbar from './Navbar' // Importez votre composant Navbar

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
