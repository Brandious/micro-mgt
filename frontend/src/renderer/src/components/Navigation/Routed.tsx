import ProjectIcon from '@mui/icons-material/AccountTree'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TeamsIcon from '@mui/icons-material/Groups'
import InfoIcon from '@mui/icons-material/HelpCenter'
import AboutIcon from '@mui/icons-material/Info'
import LogoutIcon from '@mui/icons-material/Logout'
import TasksIcon from '@mui/icons-material/Task'
export type Routed = {
  path: string
  icon: JSX.Element
  name: string
  roles: string[]
}

export const ROUTES: Routed[] = [
  {
    path: '/',
    icon: <DashboardIcon />,
    name: 'Dashboard',
    roles: ['user', 'manager']
  },
  {
    path: '/tasks',
    icon: <TasksIcon />,
    name: 'Tasks',
    roles: ['user', 'manager']
  },
  {
    path: '/projects',
    icon: <ProjectIcon />,
    name: 'Projects',
    roles: ['manager']
  },
  {
    path: '/teams',
    icon: <TeamsIcon />,
    name: 'Teams',
    roles: ['user', 'manager']
  }
  // {
  //   path: '/users',
  //   icon: <UsersIcon />,
  //   name: 'Users',
  //   roles: ['manager']
  // }
  // {
  //   path: '/profile',
  //   icon: <ProfileIcon />,
  //   name: 'Profile'
  // }
]
//

export const ADDITIONAL_ROUTES: Routed[] = [
  {
    path: '/about',
    icon: <AboutIcon />,
    name: 'About',
    roles: ['user', 'manager']
  },
  {
    path: '/info',
    icon: <InfoIcon />,
    name: 'Info',
    roles: ['user', 'manager']
  },
  {
    path: '/login',
    icon: <LogoutIcon />,
    name: 'Logout',
    roles: ['user', 'manager']
  }
]
