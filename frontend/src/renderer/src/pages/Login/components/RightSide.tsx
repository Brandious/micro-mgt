import { Box, Button, FormHelperText, TextField, Typography } from '@material-ui/core'
import { signIn } from '@renderer/api/user-api'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './styles'

type LoginInput = {
  username: string
  password: string
}

export const RightSide = (): JSX.Element => {
  const classes = useStyles()
  // Inside your component
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginInput>()

  const handleLogin = async (data: LoginInput): Promise<void> => {
    try {
      const res = await signIn({ username: data.username, password: data.password })

      if (res.status === 401) {
        setError('root', { type: 'manual', message: 'Invalid username or password' })
      }

      navigate('/')
    } catch (err) {
      console.log({ err })
    }
    // if (res.status !== 200) return
  }

  return (
    <Box className={classes.rootWhite}>
      <>
        <form onSubmit={handleSubmit(handleLogin)} className={classes.centerColumn}>
          <Typography variant="h4" color="inherit" className={classes.textColor}>
            Login
          </Typography>
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            {...register('username', {
              required: 'Username is required'
            })}
            error={Boolean(errors.username)}
            helperText={errors.username ? errors.username.message : ''}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            {...register('password', {
              required: 'Password is required'
            })}
            error={Boolean(errors.password)}
            helperText={errors.password ? errors.password.message : ''}
          />
          {errors.root ? (
            <FormHelperText className={classes.errorText}>{errors.root.message}</FormHelperText>
          ) : (
            ''
          )}
          <Button className={classes.buttonBackgroundColor} type="submit">
            Login
          </Button>
        </form>
      </>
    </Box>
  )
}
