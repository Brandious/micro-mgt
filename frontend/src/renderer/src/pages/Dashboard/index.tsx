import { Box, Typography } from '@mui/material'
import { DayStart } from './components/DayStart'
import { UserInfo } from './components/UserInfo'
import { ProjectInfo } from './components/ProjectInfo'

export const Dashboard = (): JSX.Element => {
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Typography variant="h5">Dashboard</Typography>

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
        <UserInfo />
        <DayStart />

        <ProjectInfo />
      </Box>
    </Box>
  )
}
