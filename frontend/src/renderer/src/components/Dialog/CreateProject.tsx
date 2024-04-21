import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function CreateProjectDialog({
  open,
  handleClose,
  handleOpen
}: {
  open: boolean
  handleClose: () => void
  handleOpen: () => void
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries((formData as any).entries())
            const email = formJson.email
            console.log(email)
            handleClose()
          }
        }}
      >
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter project name, project description and assign project board to it!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Project name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Project description"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            select
            required
            margin="dense"
            id="board"
            name="board"
            label="Project board"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
