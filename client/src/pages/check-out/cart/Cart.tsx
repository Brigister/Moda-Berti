import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { CartItem } from './CartItem';
import { QueryResult, useMutation, useQuery } from 'react-query';
import api from '../../../api/axiosIstance';
import { Loading } from '../../../components/Loading';
import { TotalPanel } from './TotalPanel';
import { Order } from '../../../interfaces/interfaces';

import styles from './cart.module.css'
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
    /* const [deleteCart] = useMutation(async () => {
        const res = await api.delete('cart');
        return res.data;
    }) */

    const { isLoading, data, error }: QueryResult<Order, Error> = useQuery('cart', async () => {
        try {
            const res = await api.get("cart");
            return res.data.data;
        }
        catch (error) {
            console.log(error.response.data.error);
            throw new Error(error.response.data.error);

        }
    },
        {
            refetchOnMount: "always",
            retry: 1
        }
    );
    console.log(error);
    if (isLoading) return <Loading />
    if (error?.message === "Non c'è un carrello" || !data?.products) return (
        <>
            <h3>{error && error.message}</h3>
            <Link to="/">Negozio</Link>
        </>
    )


    const total = data.products.reduce((total, product) => total + product.price, 0);

    return (
        <Grid container justify="space-evenly" classes={{ root: styles.container }}>
            <Grid
                item
                xs={12}
                sm={8}
                container
            >
                <Paper classes={{ root: styles.root }}>
                    {data.products.map((product) =>
                        <CartItem key={product.id} {...product} />
                    )}
                </Paper>
            </Grid>
            <TotalPanel total={total} />
        </Grid>
    )
}
