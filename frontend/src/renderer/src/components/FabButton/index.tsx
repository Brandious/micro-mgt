import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { blue, green } from '@mui/material/colors'

export const FabButton = ({
  title,
  variant = 'green',
  onClick
}: {
  title: string
  variant?: 'blue' | 'green'
  onClick?: () => void
}) => {
  const variantColor = variant === 'blue' ? { ...fabBlueStyle } : { ...fabGreenStyle }
  return (
    <Fab variant="extended" sx={{ ...fabStyle, ...variantColor }} onClick={onClick}>
      <AddIcon />
      {title}
    </Fab>
  )
}

const fabStyle = {
  float: 'right',

  mt: 2
}

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600]
  }
}

const fabBlueStyle = {
  color: 'common.white',
  bgcolor: blue[500],
  '&:hover': {
    bgcolor: blue[600]
  }
}
