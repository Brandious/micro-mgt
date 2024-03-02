import { Typography } from '@material-ui/core'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Teams = (): JSX.Element => {
  const navigate = useNavigate()

  const handleClick = (): void => {
    navigate('/teams/1')
  }
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Typography variant="h5">Teams</Typography>
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
          Go to team detail
        </Button>
      </Box>
    </Box>
  )
}
