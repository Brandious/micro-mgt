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
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
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
