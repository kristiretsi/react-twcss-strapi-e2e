import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import './App.css'

// Lazy-loaded pages/components
const Layout = lazy(() => import('./components/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Explore = lazy(() => import('./pages/Explore'))
const TopArtists = lazy(() => import('./pages/TopArtists'))
const ArtistDetails = lazy(() => import('./pages/ArtistDetails'))
const AlbumDetails = lazy(() => import('./pages/AlbumDetails'))
const Favorites = lazy(() => import('./pages/Favorites'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'explore/top-artists',
        element: <TopArtists />,
      },
      {
        path: 'explore/artist/:id',
        element: <ArtistDetails />,
      },
      {
        path: 'explore/album/:artist/:album',
        element: <AlbumDetails />,
      },
    ],
  },
])

function App() {
  return (
    <Suspense >
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App