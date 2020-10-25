import React, { useContext } from 'react'

import { Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Divider, Grid, Paper } from '@material-ui/core';
import { UserContext } from '../../../context/UserContext';
import { OrderProduct, LoggedUser, Order } from '../../../interfaces/interfaces';

import styles from './cartItem.module.css';
import { useMutation, useQueryCache } from 'react-query';
import api from '../../../api/axiosIstance';
import { priceFormatter } from '../../../utils/priceFormatter';

export const CartItem: React.FC<OrderProduct> = ({
    id,
    image_url,
    name,
    brand,
    price,
    size
}) => {
    const cache = useQueryCache();

    const [deleteCart] = useMutation(async () => {
        const res = await api.delete('cart');
        return res.data;
    })
    const [deleteItem] = useMutation(async (id: number) => {
        console.log(id);
        const res = await api.patch(`cart/${id}`);
        return res.data;
    }, {
        onSuccess: async (data, id) => {
            /* const { products }: any = cache.getQueryData('cart'); */
            await cache.invalidateQueries('cart');
            /*  const newCart: Order = products.filter((product: OrderProduct) => product.id != id)
             cache.setQueryData('cart', newCart); */
            const { products }: any = cache.getQueryData('cart');
            console.log(products);
            if (!products) {
                await deleteCart()
            }

        }
    })

    return (
        <Card raised classes={{ root: styles.itemCard }}>
            <Grid item container >
                <Grid item>
                    <CardMedia
                        style={{ height: 150, width: 100 }}
                        title={name}
                        component="img"
                        src={`http://localhost:4000/${image_url}`}
                    />
                </Grid>

                <Grid item>
                    <CardHeader title={name} />
                    <CardContent>
                        <p>Brand: {brand}</p>
                        <p>Size: {size}</p>
                        <p>Prezzo: {priceFormatter(price)}€</p>
                    </CardContent>
                </Grid>
                <Grid item >
                    <Button
                        classes={{ root: styles.button }}
                        variant="contained"
                        color="secondary"
                        onClick={async () => await deleteItem(id)}
                    >Elimina</Button>
                </Grid>
            </Grid>
        </Card>
    )
}