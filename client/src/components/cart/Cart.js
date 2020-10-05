import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Grid, Button } from '@material-ui/core';

import { CartItem } from './CartItem';
import { useQuery } from 'react-query';
import api from '../../api/axiosIstance';

export const Cart = () => {
    const history = useHistory();
    const id = 2;
    console.log(id);
    const { isLoading, data, error } = useQuery('cart',
        () => api.get(`cart/${id}`).then(res => res.data.data),
        {
            refetchOnMount: true,
            staleTime: 0,
        }
    )
    console.log(data);
    console.log('loading', isLoading);
    console.log(error)
    const handleBuyButton = () => {
        history.push("/stripe");
    }

    return (
        data ?
            <>
                <h1>Carrello di {id}</h1>
                <h3>CartId {data.id}</h3>

                <Grid container>
                    {data.map(product =>
                        <CartItem key={product.id} product={product} />
                    )}
                    <Grid item container xs={4}>
                        <Grid item xs={12}>
                            {/* <h4>{`${total / 100}€`}</h4> */}
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" colo="primary" onClick={handleBuyButton}>PAGAH</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </>
            :
            <>
                <h2>Non c'è un carrello</h2>
            </>
    )
}
