import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'


import {
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Grid
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


import styles from '../auth.module.css'
import { login } from '../../../redux/AuthReducer';



export const Login = () => {
    const dispatch = useDispatch();
    const [fieldType, setFieldType] = useState(false);
    const history = useHistory();

    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        dispatch(login(data));
        history.push("/shop");
        /*  login(data);
  */
        /* axios.post('http://localhost:4000/api/auth/login', data)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.token);
                    localStorage.setItem("Token", res.data.token)
                    history.push("/shop");
                }
            })
            .catch(err => {
                console.log(err);
            }) */
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
    )
}
