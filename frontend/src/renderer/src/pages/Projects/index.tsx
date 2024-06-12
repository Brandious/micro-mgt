import { Typography } from '@material-ui/core'
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack } from '@mui/material'
import { getBoards } from '@renderer/api/board-api'
import { getProjects } from '@renderer/api/project-api'
import CreateProjectDialog from '@renderer/components/Dialog/CreateProject'
import { FabButton } from '@renderer/components/FabButton'
import List from '@renderer/components/List'
import { useProject } from '@renderer/store/projects-store'
import { useUser } from '@renderer/store/user-store'
import { Roles, hasAccess } from '@renderer/utils'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Projects = (): JSX.Element => {
  const [openCreateProject, setOpenCreateProject] = useState(false)
  const [expand, setExpand] = useState(true)
  const [key, setKey] = useState(crypto.randomUUID())

  const navigate = useNavigate()

  const project = useProject()
  // const board = useBoard()
  const user = useUser()

  useEffect(() => {
    const get = async () => {
      await getProjects()
      await getBoards()
    }
    get()
  }, [key])

  const handleClick = (id: string): void => {
    navigate(`/projects/${id}`)
  }

  const finishedProjects = project && project.filter((el) => el.finished)
  const openProjects = project && project.filter((el) => !el.finished)
  const managerAccess = hasAccess({ roles: user?.roles! }, Roles.MANAGER)
  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-around',
          gap: 8
        }}
      >
        <Stack gap={4}>
          <Accordion expanded={expand} onClick={() => setExpand(!expand)}>
            <AccordionSummary>
              <Typography variant="h6">Open Projects</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={4}>
                {openProjects
                  ? openProjects.map((el) => (
                      <List
                        direction="row"
                        key={crypto.randomUUID()}
                        id={el.id}
                        title={el.name}
                        desc={el.description}
                        finished={el.finished}
                        img={'https://i.pravatar.cc/300'}
                        onClick={handleClick}
                        buttonText="Project detail"
                      />
                    ))
                  : null}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {finishedProjects?.length! > 0 ? (
            <Accordion>
              <AccordionSummary>
                <Typography variant="h6">Finished Projects</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {finishedProjects
                  ? finishedProjects.map((el) => (
                      <List
                        key={crypto.randomUUID()}
                        id={el.id}
                        title={el.name}
                        desc={el.description}
                        finished={el.finished}
                        img={'https://i.pravatar.cc/300'}
                        onClick={handleClick}
                        buttonText="Project detail"
                      />
                    ))
                  : null}
              </AccordionDetails>
            </Accordion>
          ) : null}
        </Stack>
      </Box>
      <FabButton
        title="Create Project"
        onClick={() => setOpenCreateProject(true)}
        additionalStyles={{
          position: 'fixed',
          bottom: '16px',
          right: '16px'
        }}
      />
      {managerAccess ? (
        <CreateProjectDialog
          open={openCreateProject}
          handleClose={() => setOpenCreateProject(false)}
          handleOpen={() => setOpenCreateProject(true)}
          setKey={() => setKey(crypto.randomUUID())}
        />
      ) : null}
    </Box>
  )
}
