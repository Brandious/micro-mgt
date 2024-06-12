import { Typography } from '@material-ui/core'
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack } from '@mui/material'
import { getTeams } from '@renderer/api/teams-api'
import TeamDialog from '@renderer/components/Dialog/TeamDialog'
import { FabButton } from '@renderer/components/FabButton'
import List from '@renderer/components/List'
import { useTeams } from '@renderer/store/teams-store'
import { useUser } from '@renderer/store/user-store'
import { Roles, hasAccess } from '@renderer/utils'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Teams = (): JSX.Element => {
  const navigate = useNavigate()

  const [openCreateTeam, setOpenCreateTeam] = useState(false)
  const [key, setKey] = useState(crypto.randomUUID())
  const teams = useTeams()
  const user = useUser()

  useEffect(() => {
    const get = async () => {
      await getTeams()
    }
    get()
  }, [key])

  const handleClick = (id: string): void => {
    navigate(`/teams/${id}`)
  }

  const managerAccess = hasAccess({ roles: user?.roles! }, Roles.MANAGER)
  console.log('USER', teams)
  const userTeams = user?.teams
  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '36px'
      }}
    >
      <Stack>
        <Accordion>
          <AccordionSummary>
            <Typography variant="h6">Your Teams</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={4}>
              {userTeams
                ? userTeams.map((el, i) => (
                    <List
                      direction="row"
                      key={crypto.randomUUID()}
                      id={el.id}
                      title={el.name}
                      desc={el.project?.name || ' '}
                      finished={false}
                      img={'https://i.pravatar.cc/300?img=' + i}
                      onClick={handleClick}
                      buttonText="Team detail"
                    />
                  ))
                : null}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>

      <Stack>
        <Typography variant="h6">All Teams</Typography>
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '16px'
          }}
        >
          {teams
            ? teams.map((el, i) => (
                <List
                  key={crypto.randomUUID()}
                  direction="column"
                  id={el.id}
                  title={el.name}
                  desc={el.project?.name || ' '}
                  finished={false}
                  img={'https://i.pravatar.cc/300?img=' + i}
                  onClick={handleClick}
                  buttonText={'Teams Detail'}
                />
              ))
            : null}
        </Stack>
      </Stack>

      {managerAccess ? (
        <FabButton
          title="Create Team"
          onClick={() => setOpenCreateTeam(true)}
          additionalStyles={{
            position: 'fixed',
            bottom: '16px',
            right: '16px'
          }}
        />
      ) : null}

      {managerAccess ? (
        <TeamDialog
          open={openCreateTeam}
          handleClose={() => setOpenCreateTeam(false)}
          handleOpen={() => setOpenCreateTeam(true)}
          setKey={() => setKey(crypto.randomUUID())}
        />
      ) : null}
    </Box>
  )
}
