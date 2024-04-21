import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles'
import * as React from 'react'

import { CircularProgress, ListItemButton } from '@mui/material'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ADDITIONAL_ROUTES, ROUTES } from './Routed'
import BackIcon from '@mui/icons-material/ArrowBackIos'
import { useState } from 'react'
import { useUser } from '@renderer/store/user-store'
const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  paddingTop: '10px',
  backgroundColor: 'rgba(0, 128, 0, 1)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)

const mappedRoutes = new Map([
  ['/', 'Dashboard'],
  ['/tasks', 'Tasks'],
  ['/projects', 'Projects'],
  ['/teams', 'Teams'],
  ['/users', 'Users'],
  ['/profile', 'Profile']
  // add more routes as needed
])

export default function MiniDrawer({ children }: { children: JSX.Element }): JSX.Element {
  const [open, setOpen] = useState(false)

  const theme = useTheme()
  const user = useUser()
  // Inside your component
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const handleBack = (): void => {
    window.history.back()
  }

  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  React.useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return <CircularProgress />

  const filteredRoutes = ROUTES.filter((route) =>
    route.roles.some((role) => user!.roles.includes(role))
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'sticky'
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            {mappedRoutes.get(`/${pathname.split('/')[1]}`) ?? 'MicroManagment'}
          </Typography>

          <IconButton color="inherit" aria-label="go back" edge="start" onClick={handleBack}>
            <BackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          {filteredRoutes.map((route, index) => (
            <ListItem
              key={route.name + route.path + index}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
                component={NavLink}
                to={route.path}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'rgba(0, 128, 0, 0.8)'
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            flex: 1
          }}
        >
          {ADDITIONAL_ROUTES.map((route, index) => (
            <ListItem
              key={route.name + route.path + index}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
                component={NavLink}
                to={route.path}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'rgba(0, 128, 0, 0.8)'
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
