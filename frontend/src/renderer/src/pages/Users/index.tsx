import { Typography } from '@material-ui/core'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack } from '@mui/material'
import { getUsers } from '@renderer/api/users-api'
import { FabButton } from '@renderer/components/FabButton'
import List from '@renderer/components/List'
import { useUsers } from '@renderer/store/users-store'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Users = (): JSX.Element => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(true)

  const handleClick = (): void => {
    navigate('/users/1')
  }

  const users = useUsers()

  useEffect(() => {
    const get = async () => {
      await getUsers()
    }
    get()
  }, [])

  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Stack>
        <Accordion expanded={expanded} onClick={() => setExpanded((prev) => !prev)}>
          <AccordionSummary>
            <Typography variant="h6">All Users</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {users
              ? users.map((el) => (
                  <List
                    key={crypto.randomUUID()}
                    id={el.id}
                    title={el.username}
                    desc={el.email}
                    finished={el.roles.includes('manager')}
                    img={'https://i.pravatar.cc/300'}
                    onClick={handleClick}
                    buttonText={'Users Detail'}
                  />
                ))
              : null}
          </AccordionDetails>
        </Accordion>
      </Stack>

      <FabButton title="Create User" />
    </Box>
  )
}
