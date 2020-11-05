import React from 'react'
import { useMutation, useQueryCache } from 'react-query';
import { Button, Card, CardContent, CardHeader, CardMedia, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { OrderProduct } from '../../../interfaces/interfaces';
import api from '../../../api/axiosIstance';
import { priceFormatter } from '../../../utils/priceFormatter';

import styles from './cartItem.module.css';
import { Link } from 'react-router-dom';

export const CartItem: React.FC<OrderProduct> = ({
    id,
    product_id,
    image_url,
    name,
    brand,
    price,
    size
}) => {
    const cache = useQueryCache();
    console.log(product_id)
    const [deleteCart] = useMutation(async () => {
        const res = await api.delete('cart');
        return res.data;
    })
    const [deleteItem] = useMutation(async (id: number) => {
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
        <Grid item container >
            <Card raised classes={{ root: styles.itemCard }}>
                <Grid item container>
                    <Grid item xs={3}>
                        <Link to={`shop/product/${product_id}`}>
                            <CardMedia
                                style={{ height: 197, width: 100 }}
                                title={name}
                                component="img"
                                src={`http://localhost:4000/${image_url}`}
                                alt={name}
                            />
                        </Link>
                    </Grid>

                    <Grid item xs={8}>
                        <CardHeader title={name} />
                        <CardContent>
                            <p>Brand: {brand}</p>
                            <p>Taglia: {size}</p>
                            <p>Prezzo: {priceFormatter(price)}€</p>
                        </CardContent>
                    </Grid>
                    <Grid item xs={1}>
                        <DeleteIcon
                            fontSize="large"
                            cursor="pointer"
                            classes={{ root: styles.delete }}
                            onClick={async () => await deleteItem(id)}
                        />
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}