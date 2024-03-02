import { Box, Typography } from '@material-ui/core'
import { useStyles } from './styles'

export const LeftSide = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.rootGreen}>
      <Box className={classes.centerColumn}>
        <Typography variant="h4" color="inherit">
          Welcome to MicroManagment!
        </Typography>

        <Typography variant="body2" color="inherit">
          {` Streamline your team's productivity with MicroManagment, the cutting-edge application
          designed to effortlessly track your team's status throughout the working day. Our
          intuitive login screen grants you secure access to your team's data, ensuring seamless
          collaboration and enhanced efficiency.`}
        </Typography>

        <Typography className={classes.textAlignLeft} variant="caption" color="inherit">
          Get started today!
        </Typography>
      </Box>
    </Box>
  )
}
