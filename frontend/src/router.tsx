import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/error-page'
import ImagePage from 'pages/image-page/Image-page'
import PrivateRoute from 'components/PrivateRoute'
import Auth from 'pages/auth'
import Home from 'pages/home'

const router = createBrowserRouter([
  {
    path: '/generate',
    element: (
      <PrivateRoute>
        <ImagePage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/auth/login',
    element: <Auth />,
    errorElement: <ErrorPage />
  },
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  }
])

export default router
