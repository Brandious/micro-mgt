import { Box } from '@mui/material'
import Navbar from '@renderer/components/Navigation/Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <Navbar>
        <Outlet />
      </Navbar>
    </Box>
  )
}
