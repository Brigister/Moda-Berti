import React, { useState } from 'react'
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Button,
    CardActionArea,
    Collapse,
    ButtonGroup,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';

import { OrderProduct } from './OrderProduct'

import styles from './orderItem.module.css';
import { dateFormat } from '../../../../utils/dateFormatter';
import { Order } from '../../../../interfaces/interfaces';
import { ExpandLess, ExpandMore, } from '@material-ui/icons';

export const OrderItem: React.FC<Order> = ({
    id,
    status,
    tracking,
    products,
    create_time

}) => {
    const [expand, setExpand] = useState(false);

    const dateString = dateFormat(create_time)
    return (
        <Grid container justify="center" spacing={3} classes={{ root: styles.container }}>
            <Grid item container direction="column" xs={8}>
                <Card raised className={styles.orderItemCard}>
                    <CardHeader
                        title={`Ordine #${id}`}
                        subheader={`Effettuato il: ${dateString} `}

                    />

                    <CardContent className={styles.actions}>
                        <h2>Status: {status}</h2>
                        <IconButton
                            className={styles.expand}
                            onClick={() => setExpand(!expand)}
                            aria-expanded={expand}
                            aria-label="mostra info prodotti"
                        >
                            {expand ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        <ButtonGroup orientation="vertical">
                            {tracking
                                ?
                                <a href={`https://www.sda.it/wps/portal/Servizi_online/dettaglio-spedizione?locale=it&tracing.letteraVettura=${tracking}`}>
                                    <Button variant="contained" color="primary" className={styles.button}>Tracking</Button>
                                </a>
                                :
                                <></>
                            }
                            <Button variant="contained" color="primary" className={styles.button}>Ricevuta</Button>
                            <Button variant="contained" color="primary" className={styles.button}>Assistenza</Button>
                        </ButtonGroup>


                    </CardContent>
                    <Collapse in={expand} unmountOnExit>
                        <CardContent>

                            {products?.map(product =>
                                <OrderProduct key={product.id} {...product} />
                            )}
                        </CardContent>
                    </Collapse>
                </Card>




            </Grid>

        </Grid >
    )
}
