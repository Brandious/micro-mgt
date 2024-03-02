import { Typography } from '@material-ui/core'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Users = (): JSX.Element => {
  const navigate = useNavigate()
  const handleClick = (): void => {
    navigate('/users/1')
  }
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Typography variant="h5">Users</Typography>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'space-around',
          gap: 2,
          flexWrap: 'wrap'
        }}
      >
        <Button variant="contained" sx={{ maxWidth: '200px' }} onClick={handleClick}>
          Go to user detail
        </Button>
      </Box>
    </Box>
  )
}
