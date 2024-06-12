import { Box, Stack, Typography } from '@mui/material'
import { getTeamById } from '@renderer/api/teams-api'
import AddUserToTeam from '@renderer/components/Dialog/AddUserToTeam'
import TeamDialog from '@renderer/components/Dialog/TeamDialog'
import { FabButton } from '@renderer/components/FabButton'
import List from '@renderer/components/List'
import { Loading } from '@renderer/components/Loading'
import { useTeamById } from '@renderer/store/teams-store'
import { UserStatus } from '@renderer/store/user-store'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
export const ManagerTeamsDetail = (): JSX.Element => {
  const location = useLocation()
  const { pathname } = location
  const [key, setKey] = useState(crypto.randomUUID())
  const [addUserToTeam, setAddUserToTeam] = useState(false)
  const [addNewTeam, setOpenAddNewTeam] = useState(false)

  const team = useTeamById()
  useEffect(() => {
    const get = async () => {
      await getTeamById(pathname.split('/')[2])
    }
    get()
  }, [key])

  if (!team) return <Loading />

  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Stack>
        <Typography variant="h5">{team!.name}</Typography>

        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '16px'
          }}
        >
          {team.users.map((el) => (
            <List
              key={crypto.randomUUID()}
              id={el.id}
              title={el.username}
              direction="column"
              desc={`${el.email} - ${el.roles[0]}`}
              finished={el.roles[0] === 'manager'}
              img={'https://i.pravatar.cc/300'}
              onClick={() => {}}
              buttonText="Remove user"
              buttonColor="error"
              status={el.status as UserStatus}
            />
          ))}
        </Stack>
      </Stack>

      <Stack gap={4} direction="row" alignItems={'flex-end'} justifyContent={'flex-end'}>
        <FabButton
          title="Add user to a team"
          variant="green"
          onClick={() => setAddUserToTeam(true)}
        />
        <FabButton title="Edit team" variant="blue" onClick={() => setOpenAddNewTeam(true)} />
      </Stack>

      <AddUserToTeam
        open={addUserToTeam}
        handleClose={() => setAddUserToTeam(false)}
        handleOpen={() => setAddUserToTeam(true)}
        setKey={() => setKey(crypto.randomUUID())}
        teamId={team.id}
      />

      <TeamDialog
        open={addNewTeam}
        handleClose={() => setOpenAddNewTeam(false)}
        handleOpen={() => setOpenAddNewTeam(true)}
        setKey={() => setKey(crypto.randomUUID())}
      />
    </Box>
  )
}
