// import { Box } from '@material-ui/core'
import { Box, Typography } from '@mui/material'

export const DayStart = (): JSX.Element => {
  return (
    <Box
      sx={{
        boxShadow: 1,
        padding: 2,
        borderRadius: '12px',
        bgcolor: '#CCFFCC',
        flexBasis: '50%',
        flexGrow: 1,
        flexShrink: 1,
        boxSizing: 'border-box'
      }}
    >
      <Typography variant="h5">Day Start</Typography>
    </Box>
  )
}
