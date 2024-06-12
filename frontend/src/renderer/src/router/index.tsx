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
import { Roles } from '@renderer/utils'
import { ProtectedRoute } from '@renderer/components/ProtectedRoute'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute requiredRole={Roles.ALL}>
            <Dashboard />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: 'tasks',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute requiredRole={Roles.ALL}>
            <Tasks />
          </ProtectedRoute>
        )
      },
      {
        path: ':id',
        element: (
          <ProtectedRoute requiredRole={Roles.ALL}>
            <TasksDetail />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: 'projects',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute requiredRole={Roles.MANAGER}>
            <Projects />
          </ProtectedRoute>
        )
      },
      {
        path: ':id',
        element: (
          <ProtectedRoute requiredRole={Roles.MANAGER}>
            <ProjectsDetail />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: 'teams',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute requiredRole={Roles.ALL}>
            <Teams />
          </ProtectedRoute>
        )
      },
      {
        path: ':id',
        element: (
          <ProtectedRoute requiredRole={Roles.ALL}>
            <TeamsDetail />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute requiredRole={Roles.MANAGER}>
            <Users />
          </ProtectedRoute>
        )
      },
      {
        path: ':id',
        element: (
          <ProtectedRoute requiredRole={Roles.MANAGER}>
            <UsersDetail />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: 'profile',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute requiredRole={Roles.ALL}>
            <Profile />
          </ProtectedRoute>
        )
      }
    ]
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
