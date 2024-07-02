import { createBrowserRouter, RouterProvider } from 'react-router-dom';  
import Root from './pages/Root'; 
import HomePage from './pages/HomePage'; 
import CollectionsPage from './pages/CollectionsPage'; 
import CarsPage from './pages/CarsPage'; 

import { carsLoader } from './store/api/loaders/carsLoader'; 

const user = {
  id: 1, 
  firstName: "Karolina", 
  lastName: "Kowal"
}

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Root />, 
    children: [
      {
        index: true, 
        element: <HomePage user={user} />
      }, 
      {
        path: '/collections', 
        element: <CollectionsPage user={user} />, 
      }, 
      {
        path: '/cars', 
        element: <CarsPage />, 
        loader: carsLoader
      }

    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
