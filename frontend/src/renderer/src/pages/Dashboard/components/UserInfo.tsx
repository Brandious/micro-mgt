// import { Box, Typography } from '@material-ui/core'

import { Avatar, Box, Typography } from '@mui/material'
import { useUser } from '@renderer/store/user-store'

export const UserInfo = (): JSX.Element => {
  const user = useUser()
  console.log(user)
  if (!user) return <Box>Loading</Box>

  return (
    <Box
      sx={{
        boxShadow: 1,
        padding: 2,
        borderRadius: '12px',
        bgcolor: '#FFC1C1',
        flexBasis: '30%',
        flexGrow: 1,
        flexShrink: 1,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4">User Info</Typography>
        <Avatar sx={{ width: 86, height: 86 }} alt="John Doe" src="https://i.pravatar.cc/300" />
      </Box>

      <Box>
        <Typography variant="h6">Name: {user.username}</Typography>
        <Typography variant="body2">Email: {user.email} </Typography>
        <Typography variant="body2">Role: {user.roles}</Typography>
      </Box>
    </Box>
  )
}
