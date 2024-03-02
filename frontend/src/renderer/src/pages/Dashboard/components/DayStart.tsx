// import { Box } from '@material-ui/core'
import { Box, Button, Typography } from '@mui/material'
import dayjs from 'dayjs'

export const DayStart = (): JSX.Element => {
  return (
    <Box
      sx={{
        boxShadow: 1,
        padding: 2,
        borderRadius: '12px',
        bgcolor: '#CCFFCC',
        flexBasis: '50%',
        flexGrow: 1,
        flexShrink: 1,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}
    >
      <Typography
        sx={{
          flex: 1
        }}
        variant="h5"
      >
        Day Start {dayjs().format('DD/MM/YYYY')}
      </Typography>
      <Typography sx={{ flex: 1 }} variant="body2">
        You have not started your day yet.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <Button
          variant="contained"
          sx={{
            maxWidth: '200px'
          }}
        >
          Start day
        </Button>
        <Button
          variant="contained"
          sx={{
            maxWidth: '200px'
          }}
          color="secondary"
        >
          Finish day
        </Button>
      </Box>
    </Box>
  )
}
