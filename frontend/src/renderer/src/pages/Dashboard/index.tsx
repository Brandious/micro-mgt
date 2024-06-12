import { Box } from '@mui/material'
import { DayStart } from './components/DayStart'
import { ProjectInfo } from './components/ProjectInfo'
import { UserInfo } from './components/UserInfo'

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
