// import { Box, Typography } from '@material-ui/core'

import { Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { useUser } from '@renderer/store/user-store'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

export const ProjectInfo = (): JSX.Element => {
  const navigate = useNavigate()
  const user = useUser()

  const handleProjectNavigation = (id: string): void => {
    navigate(`/projects/${id}`)
  }

  const handleTeamNavigation = (id: string): void => {
    navigate(`/teams/${id}`)
  }

  if (!user || !user.teams || !user.teams[0] || !user.teams[0].project)
    return (
      <Stack
        sx={{
          boxShadow: 1,
          padding: 2,
          borderRadius: '12px',
          bgcolor: '#FFFF99',
          flexBasis: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          height: '320px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        divider={<Divider />}
      >
        <CircularProgress />
      </Stack>
    )

  const project = user.teams[0].project
  const teams = user.teams[0]

  return (
    <Stack
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
      divider={<Divider />}
    >
      <Stack
        sx={{
          flexBasis: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}
        divider={<Divider />}
      >
        <Typography variant="h4">Current Project</Typography>
        <Box
          sx={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: '1fr 1fr'
          }}
        >
          <Box>
            <Typography variant="body1">Project Name: {project.name}</Typography>
            <Typography variant="body1">
              Project Shortname: {project.name.substring(0, 3)}
            </Typography>
            {/* <Typography variant="body1">Project Manager: John Doe</Typography> */}
          </Box>

          <Box>
            <Typography variant="body1">
              Project start date: {dayjs(project.startDate).format('DD/MM/YYYY')}
            </Typography>
            <Typography variant="body1">
              Project end date:{' '}
              {project.expectedFinishingDate
                ? dayjs(project.expectedFinishingDate).format('DD/MM/YYYY')
                : 'N/a'}
            </Typography>
          </Box>

          {/* <Box>
            <Typography variant="body1">Last finished task: bugg-23</Typography>
            <Typography variant="body1">Last started task: bugg-24</Typography>
          </Box> */}
        </Box>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          gap: '32px'
        }}
      >
        <Button
          variant="contained"
          sx={{ maxWidth: '200px' }}
          onClick={() => handleProjectNavigation(project.id)}
        >
          Go to project
        </Button>
        <Button
          variant="contained"
          sx={{ maxWidth: '200px' }}
          color="secondary"
          onClick={() => handleTeamNavigation(teams.id)}
        >
          Go to Team
        </Button>
      </Box>
    </Stack>
  )
}
