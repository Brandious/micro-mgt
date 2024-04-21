import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router'

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
