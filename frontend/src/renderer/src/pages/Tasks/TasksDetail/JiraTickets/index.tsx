import { Box, Button, Stack, Typography } from '@mui/material'
import { Loading } from '@renderer/components/Loading'

export const JiraTicket = ({ ticket }: any) => {
  console.log(ticket)
  if (!ticket) return <Loading />
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Stack>
        <Typography variant="h6">{ticket.key}</Typography>

        <Box>
          <Typography>{ticket.summary}</Typography>
          <Typography>{ticket.self}</Typography>
        </Box>
      </Stack>
      <Stack direction={'row'} spacing={5}>
        <Button variant="contained">Assign ticket to self</Button>
        <Button variant="outlined">Get more info</Button>
      </Stack>
    </Stack>
  )
}
