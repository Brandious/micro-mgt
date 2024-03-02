import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router'
// import { Dashboard } from './pages/Dashboard'
function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return <RouterProvider router={router} fallbackElement={<p>{'Hello'}</p>} />
}

export default App
