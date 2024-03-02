import { Box, Button, TextField, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { useNavigate } from 'react-router-dom'
// import { TextField } from '@renderer/components/Inputs/TextField'

export const RightSide = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleLogin = (): void => {
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
