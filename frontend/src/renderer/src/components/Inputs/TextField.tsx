import { TextFieldProps } from '@material-ui/core'

export const TextField = ({ type, ...props }: TextFieldProps): JSX.Element => (
  <TextField {...props} type={type} />
)
