import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from 'react-hook-form'
import { createProject } from '@renderer/api/project-api'
import { MenuItem } from '@mui/material'
import { useBoard } from '@renderer/store/board-store'

type CreateProjectInput = {
  name: string
  description: string
  board?: string
}

export default function CreateProjectDialog({
  open,
  handleClose,

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
  } = useForm<CreateProjectInput>()

  const board = useBoard()
  const onSubmit = async (data: CreateProjectInput): Promise<void> => {
    const res = await createProject(data)
    if (res.status !== 200) setError('root', { type: 'manual', message: 'Error creating project' })

    setKey()
    handleClose()
  }
  const issues = board?.values

  return (
    <React.Fragment>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit)
        }}
      >
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter project name, project description and assign project board to it!
          </DialogContentText>
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
            {...register('description', {
              required: 'Description is required'
            })}
            margin="dense"
            id={crypto.randomUUID()}
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            error={Boolean(errors.description)}
            helperText={errors.description ? errors.description.message : ''}
          />

          <TextField
            autoFocus
            select
            {...register('board')}
            margin="dense"
            id="board"
            name="board"
            label="Project board"
            type="text"
            fullWidth
          >
            {issues?.map((el) => <MenuItem value={el.id}>{el?.location.displayName}</MenuItem>)}
          </TextField>

          {errors.root ? <DialogContentText>{errors.root.message}</DialogContentText> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
