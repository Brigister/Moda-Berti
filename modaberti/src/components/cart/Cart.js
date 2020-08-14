import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

import { Grid, Button, Select } from '@material-ui/core';

import { loggedUser } from '../../redux/AuthReducer'
import { cartProducts, getUserCart, removeCartItem } from '../../redux/CartReducer'
import { CartItem } from './CartItem';

export const Cart = () => {
    const dispatch = useDispatch()
    const history = useHistory();

    const { id } = useSelector(loggedUser);
    const { cartId, products, total } = useSelector(cartProducts)

    useEffect(() => {
        console.log(id)
        dispatch(getUserCart(id));
    }, [id])

    const handleBuyButton = () => {
        history.push("/stripe");
    }

    return (
        <div>
            <h1>Carrello di {id}</h1>
            <h3>CartId {cartId}</h3>

            <Grid container>
                {products.map(product =>
                    <CartItem product={product} />
                )}
                <Grid item container xs={4}>
                    <Grid item xs={12}>
                        <h4>{`${total / 100}€`}</h4>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" colo="primary" onClick={handleBuyButton}>PAGAH</Button>
                    </Grid>
                </Grid>
            </Grid>

            <Route></Route>
        </div>
    )
}
