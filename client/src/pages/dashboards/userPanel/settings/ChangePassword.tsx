import React, { useContext, useState } from 'react'
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
import { UserContext } from '../../../../context/UserContext';
import { LoggedUser } from '../../../../interfaces/interfaces';
import { useMutation } from 'react-query';
import { MyFormField } from '../../../../components/MyFormField';

interface ChangePasswordForm {
    password: string,
    newPassword: string
}

export const ChangePassword: React.FC = () => {
    const { userId }: LoggedUser = useContext(UserContext);
    const { register, handleSubmit } = useForm<ChangePasswordForm>();
    const [fieldType, setFieldType] = useState<boolean>(false);

    /* const changePassword = async (data) => {
        console.log(data)
        const res = await api.patch(`/api/auth/editPassword/${userId}`, data)
        console.log(res.data);
    } */

    const [changePassword, { error }] = useMutation(async (data: ChangePasswordForm) => {
        const res = await api.patch(`auth/editPassword`, data);
        console.log(res);

        return res.data
    })
    const onSubmitHandler = handleSubmit(async (data) => {
        console.log('handler', data);
        const res = await changePassword(data)
    })
    return (
        <form onSubmit={onSubmitHandler}>
            <MyFormField
                className={styles.field}
                ref={register}
                name="password"
                label="Password attuale"
                type={fieldType ? 'text' : 'password'}
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
            <MyFormField
                className={styles.field}
                ref={register}
                name="newPassword"
                label="Nuova password"
                type={fieldType ? 'text' : 'password'}
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
                className={styles.button}>
                Salva
            </Button>
        </form>
    )
}
