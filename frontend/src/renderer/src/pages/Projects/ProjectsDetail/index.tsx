import { Check, Delete, Refresh } from '@material-ui/icons'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import { blue, green, grey } from '@mui/material/colors'
import { finalizeProject, getProjectById } from '@renderer/api/project-api'
import AddNewTeam from '@renderer/components/Dialog/AddNewTeam'
import CreateProjectDialog from '@renderer/components/Dialog/CreateProject'
import { FabButton } from '@renderer/components/FabButton'
import List from '@renderer/components/List'
import { Loading } from '@renderer/components/Loading'
import { useProjectById } from '@renderer/store/projects-store'
import { UserStatus } from '@renderer/store/user-store'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const ProjectsDetail = (): JSX.Element => {
  const [openCreateProject, setOpenCreateProject] = useState(false)
  const [addNewTeam, setOpenAddNewTeam] = useState(false)

  const [key, setKey] = useState(crypto.randomUUID())

  const location = useLocation()
  const { pathname } = location

  const project = useProjectById()

  const handleRefresh = () => {
    setKey(crypto.randomUUID())
  }

  useEffect(() => {
    const get = async () => {
      await getProjectById(pathname.split('/')[2])
    }
    get()
  }, [key])

  const handleFinishProject = async () => {
    const res = await finalizeProject({ projectId: pathname.split('/')[2] })

    console.log(res)
  }

  if (!project) return <Loading />

  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Stack gap={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h5">{project!.name}</Typography>

          <Stack direction={'row'} gap={4}>
            <IconButton
              sx={{
                borderRadius: 'unset',
                bgcolor: blue[600],
                color: grey[100],

                '&:hover': {
                  bgcolor: blue[800],
                  color: 'white'
                }
              }}
              onClick={handleRefresh}
            >
              <Refresh />
              <Typography variant="body2">Refresh</Typography>
            </IconButton>

            <IconButton
              sx={{
                borderRadius: 'unset',
                bgcolor: green[600],
                color: grey[100],

                '&:hover': {
                  bgcolor: green[800],
                  color: 'white'
                }
              }}
              onClick={handleFinishProject}
            >
              <Check />
              <Typography variant="body2">Complete project</Typography>
            </IconButton>
          </Stack>
        </Box>

        {project.teamsList.map((el) => (
          <Accordion key={crypto.randomUUID()}>
            <AccordionSummary
              sx={{
                '& > *': {
                  justifyContent: 'space-between'
                }
              }}
            >
              <Typography variant="h6">{el!.name}</Typography>

              <IconButton onClick={() => alert('Delete team')}>
                <Delete />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                divider={<Divider />}
                direction={'row'}
                gap="9px"
                maxWidth={'1200px'}
                flexWrap={'wrap'}
              >
                {el.users.map((el, i) => (
                  <List
                    direction="column"
                    key={crypto.randomUUID()}
                    id={el.id}
                    title={el.username}
                    status={el.status as UserStatus}
                    desc={`${el.email} - ${el.roles[0]}`}
                    finished={el.roles[0] === 'manager'}
                    img={`https://i.pravatar.cc/300?img=${i}`}
                    onClick={() => alert('Delete team')}
                    buttonText="Remove user"
                    buttonColor="error"
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      <Stack gap={4} direction="row" alignItems={'flex-end'} justifyContent={'flex-end'}>
        <FabButton title="Add new team" variant="green" onClick={() => setOpenAddNewTeam(true)} />
        <FabButton title="Edit project" variant="blue" onClick={() => setOpenCreateProject(true)} />
      </Stack>

      <CreateProjectDialog
        open={openCreateProject}
        handleClose={() => setOpenCreateProject(false)}
        handleOpen={() => setOpenCreateProject(true)}
        setKey={() => setKey(crypto.randomUUID())}
      />

      <AddNewTeam
        open={addNewTeam}
        handleClose={() => setOpenAddNewTeam(false)}
        projectId={pathname.split('/')[2]}
        setKey={() => setKey(crypto.randomUUID())}
      />
    </Box>
  )
}
