import { CssBaseline, Box, makeStyles } from '@material-ui/core'
import { LeftSide } from './components/LeftSide'
import { RightSide } from './components/RightSide'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
    padding: 0,
    margin: 0
  }
}))

export const Login = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <CssBaseline />
      <LeftSide />
      <RightSide />
    </Box>
  )
}
