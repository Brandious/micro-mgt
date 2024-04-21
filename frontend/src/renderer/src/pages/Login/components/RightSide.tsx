import { Box, Button, TextField, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { useNavigate } from 'react-router-dom'
import { signIn } from '@renderer/api/user-api'
import { useUser } from '@renderer/store/user-store'

export const RightSide = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleLogin = async (): Promise<void> => {
    signIn({ username: 'manager3', password: 'manager3' })

    navigate('/')
  }

  return (
    <Box className={classes.rootWhite}>
      <Box className={classes.centerColumn}>
        <Typography variant="h4" color="inherit" className={classes.textColor}>
          Login
        </Typography>
        <TextField type="email" label="Email" variant="outlined" />
        <TextField type="password" label="Password" variant="outlined" />
        <Button className={classes.buttonBackgroundColor} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  )
}
