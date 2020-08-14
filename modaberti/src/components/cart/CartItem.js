import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from '../../redux/CartReducer';
import { loggedUser } from '../../redux/AuthReducer'

import { Button, Grid } from '@material-ui/core';


export const CartItem = ({ product }) => {
    const { _id, imageUrl, name, price, size } = product
    const dispatch = useDispatch();
    const { id } = useSelector(loggedUser)
    return (
        <Grid item container xs={8} key={_id}>
            <Grid item xs={3}>
                <img src={`http://localhost:4000/${imageUrl}`} width="100px"></img>
            </Grid>
            <Grid item container direction="column" xs={7}>
                <Grid item>
                    <h2>{name}</h2>
                </Grid>
                <Grid item>
                    <p>Taglia: {size}</p>
                </Grid>
                <Grid item>
                    <p>{`${price / 100}€`}</p>
                </Grid>
            </Grid>
            <Grid item container xs={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch(removeCartItem({
                        userId: id,
                        itemId: _id
                    }))}
                >Elimina</Button>
            </Grid>
        </Grid>
    )
}
