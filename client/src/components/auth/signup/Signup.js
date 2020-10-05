import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Grid
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


import styles from '../auth.module.css'
import { Link } from 'react-router-dom';


export const Signup = () => {
    const [fieldType, setFieldType] = useState(false);

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Registrati</h2>
            <TextField className={styles.field}
                inputRef={register}
                name="name"
                variant="outlined"
                label="Nome"
                autoFocus
                required
            />
            <TextField className={styles.field}
                inputRef={register}
                name="surname"
                variant="outlined"
                label="Cognome"
                required
            />
            <TextField className={styles.field}
                inputRef={register}
                name="email"
                variant="outlined"
                label="Email"
                required
            />
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
            >Registrati
            </Button>

            <Grid
                container
                className={styles.container}
            >
                <Grid item xs={8}>
                    <Link to="/resetPassword" className={styles.links}>Password dimenticata?</Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to="/login" className={styles.links}>Hai già un account?</Link>
                </Grid>
            </Grid>
        </form>

    )
}
