import React from 'react'
import { Card, CardHeader, CardContent, Grid, Divider } from '@material-ui/core'

import styles from './totalPanel.module.css'

export const Shipping: React.FC = () => {
    return (
        <Grid item  >
            <Card raised classes={{ root: styles.totalCard }}>
                <CardHeader
                    classes={{ title: styles.totalCardHeader }}
                    title="Spedizione"
                />
                <Divider />
                <CardContent>
                    <p>Spediamo tramite GLS</p>
                    <p>Consenga in: 4/5 giorni lavorativi</p>
                </CardContent>
            </Card>
        </Grid>
    )
}
