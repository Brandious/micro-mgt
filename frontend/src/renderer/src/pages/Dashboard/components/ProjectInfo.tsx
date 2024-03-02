// import { Box, Typography } from '@material-ui/core'

import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const ProjectInfo = (): JSX.Element => {
  const navigate = useNavigate()

  const handleProjectNavigation = (): void => {
    navigate('/projects/1')
  }

  const handleTeamNavigation = (): void => {
    navigate('/teams/1')
  }

  return (
    <Box
      sx={{
        boxShadow: 1,
        padding: 2,
        borderRadius: '12px',
        bgcolor: '#FFFF99',
        flexBasis: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}
    >
      <Typography variant="h5">Project Info</Typography>
      <Box
        sx={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: '1fr 1fr'
        }}
      >
        <Box>
          <Typography variant="body1">Project Name: Buggyo.io</Typography>
          <Typography variant="body1">Project Shortname: bugg</Typography>
          <Typography variant="body1">Project Manager: John Doe</Typography>
        </Box>
        <Box>
          <Typography variant="body1">Project start date: 01/01/2021</Typography>
          <Typography variant="body1">Project end date: 01/01/2022</Typography>
        </Box>

        <Box>
          <Typography variant="body1">Last finished task: bugg-23</Typography>
          <Typography variant="body1">Last started task: bugg-24</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '32px'
        }}
      >
        <Button variant="contained" sx={{ maxWidth: '200px' }} onClick={handleProjectNavigation}>
          Go to project
        </Button>
        <Button
          variant="contained"
          sx={{ maxWidth: '200px' }}
          color="secondary"
          onClick={handleTeamNavigation}
        >
          Go to Team
        </Button>
      </Box>
    </Box>
  )
}
