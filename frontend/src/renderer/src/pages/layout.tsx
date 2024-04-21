import { Box } from '@mui/material'
import Navbar from '@renderer/components/Navigation/Navbar'
import { useSocket } from '@renderer/hooks/useSockets'
import { useUser } from '@renderer/store/user-store'
import { Outlet } from 'react-router-dom'

export const Layout = (): JSX.Element => {
  const user = useUser()
  useSocket(import.meta.env.VITE_API_URL!, user?.id!)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Navbar>
        <Box
          component={Outlet}
          sx={{
            overflowY: 'auto',
            flexGrow: 1
          }}
        />
      </Navbar>
    </Box>
  )
}
