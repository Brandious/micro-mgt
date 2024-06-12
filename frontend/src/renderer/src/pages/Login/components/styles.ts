import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
  rootWhite: {
    // background: 'red',
    // display: 'flex',
    height: '100%',
    flex: 0.75,

    '@media (max-width: 768px)': {
      flex: 1
    }
  },
  rootGreen: {
    background: 'rgba(0, 128, 0, 0.8)',
    // display: 'flex',xw
    height: '100%',
    flex: 1,

    '@media (max-width: 768px)': {
      flex: 0.75
    }
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  centerColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    gap: '16px',
    height: '100%',
    padding: '32px',
    color: 'white'
  },
  textAlignLeft: {
    textAlign: 'left'
  },

  textColor: {
    color: 'rgba(0, 128, 0, 0.8)'
  },
  buttonBackgroundColor: {
    background: 'rgba(0, 128, 0, 0.8)',
    color: 'white',

    '&:hover': {
      background: 'rgba(0, 128, 0, 1)'
    },
    '&:active': {
      background: 'rgba(0, 128, 0, 1)'
    },
    '&:focus': {
      background: 'rgba(0, 128, 0, 1)'
    }
  },
  errorText: {
    color: 'red',
    fontStyle: 'italic'
  }
}))
