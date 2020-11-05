
import { TextField, InputAdornment, IconButton, Button, Grid } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import api from '../../../api/axiosIstance'
import { MyFormField } from '../../../components/MyFormField'

import styles from '../auth.module.css'

interface ForgotPasswordForm {
    email: string
}
export const ForgotPassword: React.FC = () => {

    const [forgotPassword] = useMutation(async (email: ForgotPasswordForm) => {
        const res = api.patch('users/forgotPassword', email)
    }, {

    });

    const { register, handleSubmit, errors } = useForm();

    const handleForgotPassword = handleSubmit(async (email: ForgotPasswordForm) => {
        await forgotPassword(email);
    });

    return (
        <>
            <form onSubmit={handleForgotPassword}>
                <h2>Recupero Password</h2>
                <MyFormField
                    className={styles.field}
                    ref={register}
                    name="email"
                    label="Email"
                    autoFocus
                    required
                />

                {errors.email && <p>Inserisci la mail</p>}

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
                        <Link to="/login" className={styles.links}>Login</Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to="/signup" className={styles.links}>Non hai un account? Registrati</Link>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
