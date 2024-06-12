import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTeams } from '@renderer/store/teams-store'
import { MenuItem } from '@mui/material'
import { getTeams } from '@renderer/api/teams-api'
import { useForm } from 'react-hook-form'
import { assignTeamToProject } from '@renderer/api/project-api'

import { getActions } from '@renderer/store/user-store'

const { refreshUser } = getActions()

type AssignmentInput = {
  teamId: string
}

export default function AssignTeamToProject({
  open,
  handleClose,
  projectId,
  setKey
}: {
  open: boolean
  handleClose: () => void
  projectId: string
  setKey: () => void
}) {
  const teams = useTeams()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<AssignmentInput>()

  React.useEffect(() => {
    const get = async () => {
      await getTeams()
    }
    get()
  }, [])

  const onSubmit = async (data: AssignmentInput): Promise<void> => {
    console.log(projectId, data)

    const res = await assignTeamToProject({ projectId, teamId: data.teamId })
    setKey()
    refreshUser()
    if (res.status !== 200)
      setError('root', { type: 'manual', message: 'Error assigning team to project' })
    else handleClose()
  }

  const filteredTeams = teams?.filter((team) => !team.project?.id)

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit)
        }}
      >
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <DialogContentText>Select team from dropdown menu to add to project</DialogContentText>

          <TextField
            autoFocus
            select
            {...register('teamId', {
              required: 'Team is required'
            })}
            margin="dense"
            id={crypto.randomUUID()}
            label="Add new team"
            type="text"
            fullWidth
            variant="standard"
            error={Boolean(errors.teamId)}
            helperText={errors.teamId ? errors.teamId.message : ''}
          >
            {filteredTeams?.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </TextField>

          {errors.root ? (
            <DialogContentText style={{ color: 'red' }}>{errors.root.message}</DialogContentText>
          ) : (
            ''
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
