import { Grid, Button, Card, CardHeader, CardContent, Divider } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom';
import { priceFormatter } from '../../../utils/priceFormatter';
import { Shipping } from './Shipping';

import styles from './totalPanel.module.css'

interface TotalPanelProps {
    total: number;
}
export const TotalPanel: React.FC<TotalPanelProps> = ({ total }) => {
    const history = useHistory();

    const handleBuyButton = () => {
        history.push({
            pathname: '/stripe',
            state: {
                total
            }
        });
    }

    return (
        <Grid item container xs={12} sm={3} justify="center" >
            <Card raised classes={{ root: styles.totalCard }}>
                <CardHeader title="Totale" classes={{ title: styles.totalCardHeader }} />
                <Divider />
                <CardContent classes={{ root: styles.totalCardContent }}>
                    <Grid item container >
                        <Grid item xs={6}>
                            <p>Subtotale</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p>{priceFormatter(total)}€</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p>Spedizione</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p> {total < 5000 ? priceFormatter(500) : 0}€</p>
                        </Grid>
                    </Grid>
                    <Divider classes={{ root: styles.divider }} />
                    <Grid item container >
                        <Grid item xs={6}>
                            <p><strong>Totale</strong></p>
                        </Grid>
                        <Grid item xs={6}>
                            <p><strong>{total < 5000 ? priceFormatter(total + 500) : priceFormatter(total)}€</strong></p>
                        </Grid>
                    </Grid>
                    <Button
                        classes={{ root: styles.button, label: styles.buttonLabel }}
                        onClick={handleBuyButton}
                        variant="contained"
                        color="primary"
                    >Procedi</Button>
                </CardContent>
            </Card>
            <Shipping />
        </Grid>
    )
}
