import { Box } from '@mui/material'
import { Loading } from '@renderer/components/Loading'
import Navbar from '@renderer/components/Navigation/Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Navbar>
        {false ? (
          <Loading />
        ) : (
          <Box
            component={Outlet}
            sx={{
              overflowY: 'auto',
              flexGrow: 1
            }}
          />
        )}
      </Navbar>
    </Box>
  )
}
