// import { Box, Typography } from '@material-ui/core'

import { Box, Typography } from '@mui/material'

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
        boxSizing: 'border-box'
      }}
    >
      <Typography variant="h5">User Info</Typography>
    </Box>
  )
}
