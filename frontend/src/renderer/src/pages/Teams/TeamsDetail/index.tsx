import { Box, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { getTeamById } from '@renderer/api/teams-api'
import AddUserToTeam from '@renderer/components/Dialog/AddUserToTeam'
import TeamDialog from '@renderer/components/Dialog/TeamDialog'
import { FabButton } from '@renderer/components/FabButton'
import List from '@renderer/components/List'
import { useTeamById } from '@renderer/store/teams-store'
import { UserStatus } from '@renderer/store/user-store'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
export const TeamsDetail = (): JSX.Element => {
  const location = useLocation()
  const { pathname } = location

  const [addUserToTeam, setAddUserToTeam] = useState(false)
  const [addNewTeam, setOpenAddNewTeam] = useState(false)

  const team = useTeamById()
  useEffect(() => {
    const get = async () => {
      await getTeamById(pathname.split('/')[2])
    }
    get()
  }, [])

  if (!team) return <CircularProgress />

  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Stack>
        <Typography variant="h5">{team!.name}</Typography>

        <Stack
          divider={<Divider />}
          direction={'row'}
          gap="9px"
          maxWidth={'1200px'}
          flexWrap={'wrap'}
        >
          {team.users.map((el) => (
            <List
              key={crypto.randomUUID()}
              id={el.id}
              title={el.username}
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
      />

      <TeamDialog
        open={addNewTeam}
        handleClose={() => setOpenAddNewTeam(false)}
        handleOpen={() => setOpenAddNewTeam(true)}
      />
    </Box>
  )
}
