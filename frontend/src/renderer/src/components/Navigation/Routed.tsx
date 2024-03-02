import DashboardIcon from '@mui/icons-material/Dashboard'
import TasksIcon from '@mui/icons-material/Task'
import ProjectIcon from '@mui/icons-material/AccountTree'
import TeamsIcon from '@mui/icons-material/Groups'
import UsersIcon from '@mui/icons-material/Group'
import ProfileIcon from '@mui/icons-material/ManageAccounts'
import AboutIcon from '@mui/icons-material/Info'
import InfoIcon from '@mui/icons-material/HelpCenter'
import LogoutIcon from '@mui/icons-material/Logout'
export type Routed = {
  path: string
  icon: JSX.Element
  name: string
}

export const ROUTES: Routed[] = [
  {
    path: '/',
    icon: <DashboardIcon />,
    name: 'Dashboard'
  },
  {
    path: '/tasks',
    icon: <TasksIcon />,
    name: 'Tasks'
  },
  {
    path: '/projects',
    icon: <ProjectIcon />,
    name: 'Projects'
  },
  {
    path: '/teams',
    icon: <TeamsIcon />,
    name: 'Teams'
  },
  {
    path: '/users',
    icon: <UsersIcon />,
    name: 'Users'
  },
  {
    path: '/profile',
    icon: <ProfileIcon />,
    name: 'Profile'
  }
]
//

export const ADDITIONAL_ROUTES: Routed[] = [
  {
    path: '/about',
    icon: <AboutIcon />,
    name: 'About'
  },
  {
    path: '/info',
    icon: <InfoIcon />,
    name: 'Info'
  },
  {
    path: '/login',
    icon: <LogoutIcon />,
    name: 'Logout'
  }
]
