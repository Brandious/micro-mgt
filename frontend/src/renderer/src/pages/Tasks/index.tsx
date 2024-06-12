import { Box, Button, MenuItem, TextField } from '@mui/material'
import { getBoards } from '@renderer/api/board-api'
import { useBoard } from '@renderer/store/board-store'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Tasks = (): JSX.Element => {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const handleClick = (): void => {
    navigate(`/tasks/${id}`)
  }

  const board = useBoard()
  // const user = useUser()

  useEffect(() => {
    const get = async () => {
      await getBoards()
    }
    get()
  }, [])

  const issues = board?.values

  return (
    <Box
      sx={{
        mt: 2
      }}
    >
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <TextField
          autoFocus
          select
          // {...register('board')}
          onChange={(e) => setId(e.target.value)}
          margin="dense"
          id="board"
          name="board"
          label="Select board"
          type="text"
          fullWidth
        >
          {issues?.map((el) => <MenuItem value={el.id}>{el?.location.displayName}</MenuItem>)}
        </TextField>

        <Button variant="contained" sx={{ maxWidth: '200px' }} onClick={handleClick}>
          Go to task detail
        </Button>
      </Box>
    </Box>
  )
}
