import { Typography } from '@material-ui/core'
import { Box, Button } from '@mui/material'
import { Select } from '@renderer/components/Inputs/Select'
import { useNavigate } from 'react-router-dom'

export const Projects = (): JSX.Element => {
  const navigate = useNavigate()

  const handleClick = (): void => {
    navigate('/projects/1')
  }
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Typography variant="h5">Projects </Typography>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-around',
          gap: 8
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <Box>
            <Typography variant="body1">Select a project to see details</Typography>
            <Select
              defaultValue={'1'}
              sx={{ flex: 1, minWidth: '200px' }}
              options={[
                { value: '1', label: 'Project 1' },
                { value: '2', label: 'Project 2' }
              ]}
            />
          </Box>
          <Button variant="contained" sx={{ maxWidth: '200px' }} onClick={handleClick}>
            Go to project detail
          </Button>
        </Box>

        <Box>
          <Typography variant="h6">All Projects</Typography>
        </Box>

        <Box>
          <Typography variant="h6">Finished Projects</Typography>
        </Box>
      </Box>
    </Box>
  )
}
