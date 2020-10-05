import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom'
import decode from 'jwt-decode'

import {
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Grid
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


import styles from '../auth.module.css'
import { useMutation, useQueryCache } from 'react-query';

import { UserContext } from '../../../context/UserContext'
import axios from 'axios';
import api from '../../../api/axiosIstance';



export const Login = () => {
    const { setUser } = useContext(UserContext);
    const [fieldType, setFieldType] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    const [login, { isError }] = useMutation(async (data) => {
        const res = await api.post('auth/login', data, {
            withCredentials: true, credentials: 'include'
        });
        return res.data;
    }, {
        onSuccess: ({ token }) => {
            if (token) {
                const { isAdmin } = decode(token);
                setUser({
                    token,
                    isLoggedIn: true,
                    isAdmin
                });
                history.push('/shop');
            }
        },
    })

    return (
        <>
            <form onSubmit={handleSubmit(login)}>
                <h2>Login</h2>
                <TextField className={styles.field}
                    inputRef={register}
                    name="email"
                    variant="outlined"
                    label="Email"
                    autoFocus
                    required
                />

                {errors.email && <p>First name is required</p>}
                <TextField className={styles.field}
                    inputRef={register}
                    name="password"
                    variant="outlined"
                    label="Password"
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
                >Login
            </Button>

                <Grid
                    container
                    className={styles.container}
                >
                    <Grid item xs={6}>
                        <Link to="/resetPassword" className={styles.links}>Password dimenticata?</Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to="/signup" className={styles.links}>Non hai un account? Registrati</Link>
                    </Grid>
                </Grid>
            </form>
            { isError ? < h2 > Dati errati</h2 > : null
            }
        </>
    )
}
