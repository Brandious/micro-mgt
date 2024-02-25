// import { Box, Typography } from '@material-ui/core'

import { Box, Typography } from '@mui/material'

export const ProjectInfo = (): JSX.Element => {
  return (
    <Box
      sx={{
        boxShadow: 1,
        padding: 2,
        borderRadius: '12px',
        bgcolor: '#FFFF99',
        flexBasis: '100%',
        boxSizing: 'border-box'
      }}
    >
      <Typography variant="h5">Project Info</Typography>
    </Box>
  )
}
