// import { Box } from '@material-ui/core'
import { Box, Button, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useWork } from '@renderer/store/work-store'
import { endDay, startDay } from '@renderer/api/work-api'

export const DayStart = (): JSX.Element => {
  const working = useWork()

  const handleWorkStart = async () => {
    await startDay()
  }

  const handleWorkEnd = async () => {
    await endDay()
  }

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
        gap: '8px'
      }}
    >
      <Typography
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}
        variant="h5"
      >
        Day Start {dayjs().format('DD/MM/YYYY')}
      </Typography>

      {working ? (
        <Typography sx={{ flex: 1 }} variant="body2">
          Working currently...
        </Typography>
      ) : (
        <Typography sx={{ flex: 1 }} variant="body2">
          You have not started your day yet.
        </Typography>
      )}
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
          onClick={handleWorkStart}
          disabled={working}
        >
          Start day
        </Button>
        <Button
          variant="contained"
          sx={{
            maxWidth: '200px'
          }}
          color="secondary"
          disabled={!working}
          onClick={handleWorkEnd}
        >
          Finish day
        </Button>
      </Box>
    </Box>
  )
}
