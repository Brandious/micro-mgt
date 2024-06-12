import { Box, CircularProgress } from '@mui/material'

export const Loading = (): JSX.Element => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}
