import { TextField, } from '@material-ui/core'
import React, { InputHTMLAttributes } from 'react'

type FormFieldProps = {
    name: string,
    label: string
    register: any

}
//???
export const MyFormField: React.FC<FormFieldProps> = ({ name, label, register, ...props }) => {
    return (
        <TextField
            name={name}
            label={label}
            inputRef={register}
            variant="outlined"
            autoFocus
            required
            {...props}
        />
    )
}
