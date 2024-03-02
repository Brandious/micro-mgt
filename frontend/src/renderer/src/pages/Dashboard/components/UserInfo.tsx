// import { Box, Typography } from '@material-ui/core'

import { Avatar, Box, Typography } from '@mui/material'

export const UserInfo = (): JSX.Element => {
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
        gap: '32px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',

          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5">User Info </Typography>
        <Box>
          <Avatar sx={{ width: 86, height: 86 }} alt="John Doe" src="https://i.pravatar.cc/300" />
        </Box>
      </Box>

      <Box>
        <Typography variant="body2">Name: John Doe</Typography>
        <Typography variant="body2">Email: john@doe.com </Typography>
        <Typography variant="body2">Role: Manager</Typography>
        <Typography variant="body2">Department: Sales</Typography>
        <Typography variant="body2">Location: New York</Typography>
        <Typography variant="body2">Team name: CodeBusters</Typography>
      </Box>
    </Box>
  )
}
