import { createHashRouter } from 'react-router-dom'

import { Dashboard } from '@renderer/pages/Dashboard'
import { Teams } from '@renderer/pages/Teams'
import { Projects } from '@renderer/pages/Projects'
import { Tasks } from '@renderer/pages/Tasks'
import { Users } from '@renderer/pages/Users'
import { Login } from '@renderer/pages/Login'
import { About } from '@renderer/pages/About'
import { Profile } from '@renderer/pages/Profile'
import { Info } from '@renderer/pages/Info'
import Navbar from '@renderer/components/Navigation/Navbar'

const router = createHashRouter([
  {
    path: '/',
    element: (
      <Navbar>
        <Dashboard />
      </Navbar>
    )
  },
  {
    path: 'tasks',
    element: (
      <Navbar>
        <Tasks />
      </Navbar>
    )
  },
  {
    path: 'projects',
    element: (
      <Navbar>
        <Projects />
      </Navbar>
    )
  },
  {
    path: 'teams',
    element: (
      <Navbar>
        <Teams />
      </Navbar>
    )
  },
  {
    path: 'users',
    element: (
      <Navbar>
        <Users />
      </Navbar>
    )
  },
  {
    path: 'profile',
    element: (
      <Navbar>
        <Profile />
      </Navbar>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/about',
    element: (
      <Navbar>
        <About />
      </Navbar>
    )
  },
  {
    path: '/info',
    element: (
      <Navbar>
        <Info />
      </Navbar>
    )
  }
])

export default router
