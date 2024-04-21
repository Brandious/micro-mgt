import { Typography } from '@material-ui/core'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Tasks = (): JSX.Element => {
  const navigate = useNavigate()
  const handleClick = (): void => {
    navigate('/tasks/1')
  }
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Button variant="contained" sx={{ maxWidth: '200px' }} onClick={handleClick}>
          Go to task detail
        </Button>
      </Box>
    </Box>
  )
}
