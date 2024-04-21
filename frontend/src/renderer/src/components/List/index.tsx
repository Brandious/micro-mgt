import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Button, Chip, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'

const StatusColor = new Map([
  ['offline', 'red'],
  ['online', 'green'],
  ['idle', 'yellow']
])

export default function AlignItemsList({
  id,
  title,
  desc,
  finished,
  img,
  buttonText,
  buttonColor,
  onClick,
  direction = 'row',
  status
}: {
  id: string
  title: string
  desc: string
  finished: boolean
  img: string
  buttonText: string
  buttonColor?: string
  direction?: 'column' | 'row'
  status?: 'online' | 'idle' | 'offline' | 'undefined'
  onClick: (id: string) => void
}) {
  return (
    <List sx={{ bgcolor: finished ? 'lightgreen' : grey[100], flex: 1 }}>
      <ListItem
        sx={{
          flexDirection: direction,
          flexWrap: 'wrap',
          gap: '4px',
          flex: 1,
          alignItems: direction === 'row' ? 'center' : 'flex-start',
          justifyContent: 'center'
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={direction === 'row' ? 'unset' : '100%'}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={img} />
          </ListItemAvatar>
          {status ? (
            <Chip
              sx={{
                height: '40px',
                width: '40px',
                borderRadius: '100%',
                bgcolor: StatusColor.get(status as string)
              }}
            />
          ) : null}
        </Stack>

        <ListItemText
          primary={
            <Typography variant="h6" color="text.primary">
              {title}
            </Typography>
          }
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {desc}
            </Typography>
          }
        />

        <Button
          variant="contained"
          color={(buttonColor as 'inherit' | 'primary' | 'secondary') || 'primary'}
          sx={{ maxWidth: '200px' }}
          onClick={() => onClick(id)}
        >
          {buttonText}
        </Button>
      </ListItem>
    </List>
  )
}
