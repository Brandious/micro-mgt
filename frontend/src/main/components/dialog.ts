import { dialog } from 'electron'

export async function handleDialogOpen(): Promise<void> {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  console.log(canceled, filePaths)
}
