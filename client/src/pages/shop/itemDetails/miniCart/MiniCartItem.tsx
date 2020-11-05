import React from 'react'
import { Button, Card, CardContent, CardHeader, CardMedia, Grid } from '@material-ui/core'
import { OrderProduct } from '../../../../interfaces/interfaces'
import { priceFormatter } from '../../../../utils/priceFormatter'

import styles from './miniCart.module.css';

export const MiniCartItem: React.FC<OrderProduct> = ({
    name,
    image_url,
    size,
    price
}) => {
    return (
        <Card raised classes={{ root: styles.itemCard }}>
            <Grid item container justify="flex-start" alignItems="center">
                <Grid item>
                    <CardMedia
                        classes={{ root: styles.itemCardImage }}
                        title={name}
                        component="img"
                        src={`http://localhost:4000/${image_url}`}
                    />
                </Grid>

                <Grid item>
                    <CardContent classes={{ root: styles.itemCardContent }}>
                        <p>Size: {size}</p>
                        <p>Prezzo: {priceFormatter(price)}€</p>
                    </CardContent>
                </Grid>

            </Grid>
        </Card>
    )
}
