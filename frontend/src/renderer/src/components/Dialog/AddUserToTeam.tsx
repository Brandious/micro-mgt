import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from 'react-hook-form'
import { assignUserToTeam, getUsers } from '@renderer/api/users-api'
import { useUsers } from '@renderer/store/users-store'
import { MenuItem } from '@mui/material'
import { getActions } from '@renderer/store/user-store'

const { refreshUser } = getActions()

type AddUserToTeamInput = {
  userId: string
  teamId: string
}

export default function AddUserDialog({
  open,
  handleClose,
  // handleOpen,
  setKey,
  teamId
}: {
  open: boolean
  handleClose: () => void
  handleOpen?: () => void
  setKey: () => void
  teamId: string
}) {
  const users = useUsers()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<AddUserToTeamInput>()

  React.useEffect(() => {
    const get = async () => {
      await getUsers()
    }
    get()
  }, [])

  const onSubmit = async (data: AddUserToTeamInput): Promise<void> => {
    console.log(data, { teamIds: [teamId] })

    const res = await assignUserToTeam({ userId: data.userId, teamIds: [teamId] })
    setKey()
    refreshUser()
    if (res.status !== 200)
      setError('root', { type: 'manual', message: 'Error assigning team to project' })
    else handleClose()
  }

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
        <DialogTitle>Add user</DialogTitle>
        <DialogContent>
          <DialogContentText>Select user from dropdown menu to add to team</DialogContentText>

          <TextField
            autoFocus
            select
            {...register('userId', {
              required: 'User is required'
            })}
            margin="dense"
            id={crypto.randomUUID()}
            label="Add new user to team"
            type="text"
            fullWidth
            error={Boolean(errors.teamId)}
            helperText={errors.teamId ? errors.teamId.message : ''}
          >
            {users?.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                {el.username}
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
