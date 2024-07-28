import { createBrowserRouter, RouterProvider } from 'react-router-dom';  
import Root from './pages/Root'; 
import HomePage from './pages/HomePage'; 
import CollectionsPage from './pages/CollectionsPage'; 
import CarsPage from './pages/CarsPage'; 
import CarsDatabasePage from './pages/CarsDatabasePage';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import { ProtectedRoute } from './components/login/ProtectedRoute'; 

// some comment

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Root />, 
    children: [
      {
        index: true, 
        element: <LoginPage />
      }, 
      {
        path: '/register', 
        element: <RegisterPage />
      },
      {
        path: '/home', 
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        )
      },
      {
        path: '/collections/', 
        element: (
          <ProtectedRoute>
            <CollectionsPage />
          </ProtectedRoute>
        ), 
      }, 
      {
        path: '/cars/:collectionId?', 
        element: (
          <ProtectedRoute>
            <CarsPage />
          </ProtectedRoute>
        )
      }, 
      {
        path: '/cars-database',
        element: (
          <CarsDatabasePage />
        )
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
