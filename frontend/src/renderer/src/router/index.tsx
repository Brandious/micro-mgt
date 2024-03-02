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
import { ProjectsDetail } from '@renderer/pages/Projects/ProjectsDetail'
import { Layout } from '@renderer/pages/layout'
import { TasksDetail } from '@renderer/pages/Tasks/TasksDetail'
import { TeamsDetail } from '@renderer/pages/Teams/TeamsDetail'
import { UsersDetail } from '@renderer/pages/Users/UsersDetail'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  },
  {
    path: 'tasks',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Tasks />
      },
      {
        path: ':id',
        element: <TasksDetail />
      }
    ]
  },
  {
    path: 'projects',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Projects />
      },
      {
        path: ':id',
        element: <ProjectsDetail />
      }
    ]
  },
  {
    path: 'teams',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Teams />
      },
      {
        path: ':id',
        element: <TeamsDetail />
      }
    ]
  },
  {
    path: 'users',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Users />
      },
      {
        path: ':id',
        element: <UsersDetail />
      }
    ]
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
