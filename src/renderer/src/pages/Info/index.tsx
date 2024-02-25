import { Typography } from '@material-ui/core'
import { Box, Chip, Divider } from '@mui/material'

const features = [
  {
    text: 'Real-Time Status Tracking: MicroManagment allows users to track the status of team members in real-time, providing visibility into who is working on what tasks at any given moment.',
    finished: false
  },
  {
    text: 'Task Management: Users can assign tasks, set deadlines, and monitor progress within the application, fostering better organization and accountability within the team.',
    finished: false
  },
  {
    text: 'Time Tracking: MicroManagment offers time tracking capabilities, allowing users to log hours worked on specific projects or tasks. This feature helps in analyzing productivity trends and managing workloads effectively.',
    finished: false
  },
  {
    text: 'Customizable Reporting: The application provides customizable reports and analytics, enabling managers to gain insights into team performance, identify bottlenecks, and make data-driven decisions to improve efficiency.',
    finished: false
  },

  {
    text: 'Security and Data Privacy: The application prioritizes security and data privacy, ensuring that sensitive information remains protected and compliant with relevant regulations.',
    finished: false
  },
  {
    text: 'User-Friendly Interface: MicroManagment boasts an intuitive and user-friendly interface, making it easy for team members to navigate and utilize its features without extensive training.',
    finished: false
  },
  {
    text: 'Cross-Platform Compatibility: Users can access MicroManagment across various devices and platforms, including desktop computers, smartphones, and tablets, ensuring flexibility and accessibility for remote and distributed teams.',
    finished: false
  },
  {
    text: 'Integration Capabilities: The application integrates with other commonly used tools and platforms such as project management software, calendars, and email clients, streamlining workflows and eliminating silos between different systems.',
    finished: false
  },
  {
    text: 'Customer Support and Training: MicroManagment provides comprehensive customer support and training resources to assist users in getting the most out of the application, addressing any issues or questions they may have.',
    finished: false
  }
]
export const Info = (): JSX.Element => {
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Typography variant="h5">Info</Typography>

      <Box
        sx={{
          mt: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Typography variant="body1" key={index}>
              {feature.text}
            </Typography>
            <Chip
              label={feature.finished ? 'Finished' : 'In Progress'}
              sx={{
                bgcolor: feature.finished ? '#4CAF50' : '#FFC107'
              }}
            />
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
