import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import {
    TextField,
    InputAdornment,
    IconButton,
    Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import styles from '../../../auth/auth.module.css'
import api from '../../../../api/axiosIstance';


export const ChangePassword = () => {
    const id = 2;
    const { register, handleSubmit } = useForm();
    const [fieldType, setFieldType] = useState(false);

    const changePassword = async (data) => {
        console.log(data)
        const res = await api.patch(`/api/auth/editPassword/${id}`, data)
        console.log(res.data);
    }
    return (
        <form onSubmit={handleSubmit(changePassword)}>
            <TextField className={styles.field}
                inputRef={register}
                name="password"
                label="Password attuale"
                variant="outlined"
                type={fieldType ? 'text' : 'password'}
                required
                autoFocus
                InputProps={{
                    endAdornment:
                        < InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setFieldType(!fieldType)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                            >
                                {fieldType ? <Visibility className={styles.visibility} /> : <VisibilityOff className={styles.visibility} />}
                            </IconButton>
                        </InputAdornment>
                }}
            />
            <TextField className={styles.field}
                inputRef={register}
                name="newPassword"
                variant="outlined"
                label="Nuova password"
                type={fieldType ? 'text' : 'password'}
                required
                InputProps={{
                    endAdornment:
                        < InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setFieldType(!fieldType)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                            >
                                {fieldType ? <Visibility className={styles.visibility} /> : <VisibilityOff className={styles.visibility} />}
                            </IconButton>
                        </InputAdornment>
                }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={styles.button}
            >Salva
            </Button>
        </form>
    )
}
