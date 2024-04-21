import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function TeamDialog({
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
        <DialogTitle>Create Team</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter team name, and assign team to project!</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Team name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            select
            // required
            margin="dense"
            id="board"
            name="board"
            label="Select project"
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
