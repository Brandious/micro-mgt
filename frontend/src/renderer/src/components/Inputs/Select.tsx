import { MenuItem, SelectProps, Select as MuiSelect } from '@mui/material'

export type CustomSelectProps = {
  options: {
    value: string
    label: string
  }[]
} & SelectProps

export const Select = ({ options, ...props }: CustomSelectProps): JSX.Element => (
  <MuiSelect {...props}>
    {options.map((option, index) => (
      <MenuItem key={index} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </MuiSelect>
)
