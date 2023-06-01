import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/home'
import { Route, RouterProvider } from 'react-router'
import './App.scss'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Home />} />
    </Route>,
  ),
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
