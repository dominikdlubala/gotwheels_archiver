import { createBrowserRouter, RouterProvider } from 'react-router-dom';  
import Root from './pages/Root'; 
import HomePage from './pages/HomePage'; 
import CollectionsPage from './pages/CollectionsPage'; 
import CarsPage from './pages/CarsPage'; 

import { carsLoader } from './store/api/loaders/carsLoader'; 
import { collectionsLoader } from './store/api/loaders/collectionsLoader'; 

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Root />, 
    children: [
      {
        index: true, 
        element: <HomePage />
      }, 
      {
        path: '/collections/:userId', 
        element: <CollectionsPage />, 
        loader: collectionsLoader
      }, 
      {
        path: '/cars/:collectionId', 
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
