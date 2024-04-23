import { UserProvider } from 'contexts/useUser'
import { RouterProvider } from 'react-router-dom'
import router from 'router'

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
