import { createBrowserRouter } from 'react-router-dom'
import { BooklyHomePage } from '@/features/bookly'
import { RootLayout } from '@/shared/layouts'
import { AboutPage, NotFoundPage } from '@/shared/pages'

export const router = createBrowserRouter([
  { path: '/', element: <BooklyHomePage /> },
  {
    element: <RootLayout />,
    children: [
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
