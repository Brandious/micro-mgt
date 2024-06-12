import { Box, Stack, Typography } from '@mui/material'
import { getBoardIssuesById } from '@renderer/api/board-api'
import { useBoardById } from '@renderer/store/board-store'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { JiraTicket } from './JiraTickets'

export const TasksDetail = (): JSX.Element => {
  const location = useLocation()
  const { pathname } = location
  const id = pathname.split('/')[2]
  const boardById = useBoardById()

  useEffect(() => {
    const get = async () => {
      await getBoardIssuesById(id)
    }
    get()
  }, [id])

  console.log('boardById', { boardById, id })
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Typography variant="h5">TasksDetail</Typography>

      <Stack spacing={2}>
        {boardById?.issues?.map((el) => (
          <JiraTicket
            key={crypto.randomUUID()}
            ticket={{
              id: el.id,
              key: el.key,
              summary: el.fields.summary,
              status: el.fields.status.name,
              assignee: el.fields.assignee?.displayName,
              reporter: el.fields.reporter?.displayName,
              created: el.fields.created,
              updated: el.fields.updated
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}
