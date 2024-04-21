import { Typography } from '@material-ui/core'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack } from '@mui/material'
import { getTeams } from '@renderer/api/teams-api'
import { FabButton } from '@renderer/components/FabButton'
import List from '@renderer/components/List'
import { useTeams } from '@renderer/store/teams-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Teams = (): JSX.Element => {
  const navigate = useNavigate()

  const teams = useTeams()

  useEffect(() => {
    const get = async () => {
      await getTeams()
    }
    get()
  }, [])

  const handleClick = (id: string): void => {
    navigate(`/teams/${id}`)
  }

  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Stack>
        <Typography variant="h6">All Teams</Typography>

        <Stack
          divider={<Divider />}
          direction={'row'}
          gap="9px"
          maxWidth={'1200px'}
          flexWrap={'wrap'}
        >
          {teams
            ? teams.map((el) => (
                <List
                  key={crypto.randomUUID()}
                  direction="column"
                  id={el.id}
                  title={el.name}
                  desc={''}
                  finished={false}
                  img={'https://i.pravatar.cc/300'}
                  onClick={handleClick}
                  buttonText={'Teams Detail'}
                />
              ))
            : null}
        </Stack>
      </Stack>

      <FabButton title="Create Team" />
    </Box>
  )
}
