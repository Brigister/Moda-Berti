import React from 'react'
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Button,
    CardActionArea
} from '@material-ui/core'
import { OrderProduct } from './OrderProduct'

import styles from './orderItem.module.css';

export const OrderItem = ({ order }) => {
    console.log(order)
    const date = new Date(order.createdAt)
    const formatOptions = {
        day: "2-digit",
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    const dateString = date.toLocaleDateString("it-IT", formatOptions)
    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item container direction="column" xs={8}>
                <Card raised="true" className={styles.orderItemCard}>
                    <CardHeader
                        title={`Ordine #${order._id}`}
                        subheader={`Effettuato il: ${dateString} `}

                    />
                    <CardActionArea className={styles.actions}>
                        <Button variant="contained" color="primary" className={styles.button}>Ricevuta</Button>
                        <Button variant="contained" color="primary" className={styles.button}>Assistenza</Button>
                    </CardActionArea>

                    <CardContent>
                        <h2>Status: {order.status}</h2>
                        {order.products.map(product =>
                            <OrderProduct key={product._id} product={product}
                            />
                        )}
                    </CardContent>
                </Card>




            </Grid>

        </Grid >
    )
}


/* <Grid item container>
                    <Grid item xs={6}>
                        <h2>Ordine #<strong>{order._id}</strong></h2>
                    </Grid>
                    <Grid item xs={3}>
                        <p>Effettuato il: {dateString}</p>
                    </Grid>
                    <Grid item xs={3}>
                        <p>Totale: {order.price / 100}€</p>
                    </Grid>
                </Grid>
                <hr></hr>
                {order.products.map(product =>
                    <Grid item container justify="center" key={product._id}>
                        <OrderProduct product={product}
                        />
                    </Grid>
                )} */