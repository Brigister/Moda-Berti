import { TextField, TextFieldProps, } from '@material-ui/core'
import React, { forwardRef, InputHTMLAttributes } from 'react'

type FormFieldProps = TextFieldProps & {
    name: string,
    label: string

}
export const MyFormField: React.FC<any> = forwardRef((props, ref) => {
    return (
        <TextField
            inputRef={ref}
            variant="outlined"
            required
            {...props}
        />
    )
})
