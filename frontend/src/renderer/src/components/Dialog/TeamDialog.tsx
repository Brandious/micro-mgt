import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from 'react-hook-form'
import { createTeam } from '@renderer/api/teams-api'
import { MenuItem } from '@mui/material'

type CreateTeamInput = {
  name: string
  projectId?: string
}

export default function TeamDialog({
  open,
  handleClose,
  // handleOpen,
  setKey
}: {
  open: boolean
  handleClose: () => void
  handleOpen?: () => void
  setKey: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<CreateTeamInput>()

  const onSubmit = async (data: CreateTeamInput): Promise<void> => {
    const res = await createTeam(data)
    setKey()
    if (res.status !== 200) setError('root', { type: 'manual', message: 'Error creating team' })

    handleClose()
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit)
        }}
      >
        <DialogTitle>Create Team</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter team name, and assign team to project!</DialogContentText>
          <TextField
            {...register('name', {
              required: 'Name is required'
            })}
            autoFocus
            margin="dense"
            id={crypto.randomUUID()}
            name="name"
            label="Project name"
            type="text"
            fullWidth
            variant="standard"
            error={Boolean(errors.name)}
            helperText={errors.name ? errors.name.message : ''}
          />

          <TextField
            autoFocus
            select
            {...register('projectId')}
            margin="dense"
            id="board"
            name="board"
            label="Select project"
            type="text"
            fullWidth
          >
            <MenuItem value="1">Project 1</MenuItem>
            <MenuItem value="2">Project 2</MenuItem>
            <MenuItem value="3">Project 3</MenuItem>
          </TextField>

          {errors.root ? <DialogContentText>{errors.root.message}</DialogContentText> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
