import React from 'react'

import { TextField, Card } from '@material-ui/core'

import styles from './form.module.css'

export const ShippingDetailsFields = () => {
    return (
        <Card className={styles.container} raised>
            <TextField className={styles.fields}
                name="name"
                label="Nome"
                variant="outlined"
                autoFocus
                required
            />
            <TextField className={styles.fields}
                name="surname"
                label="Cognome"
                variant="outlined"
                required
            />
            <TextField className={styles.fields}
                name="email"
                label="Email"
                variant="outlined"
                required
            />
            <TextField className={styles.fields}
                name="address"
                label="Indirizzo"
                variant="outlined"
                required
            />
            <TextField className={styles.fields}
                name="city"
                label="Città"
                variant="outlined"
                required
            />
            <TextField className={styles.fields}
                name="postal_code"
                label="Codice postale"
                variant="outlined"
                required
            />
        </Card>
    )
}
