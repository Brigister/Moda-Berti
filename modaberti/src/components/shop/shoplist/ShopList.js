import React, { useEffect } from 'react';

import { Grid } from '@material-ui/core';

import styles from './shoplist.module.css'
import ShopItem from '../shopItem/ShopItem';
import { Sidebar } from '../sidebar/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, selectProducts } from '../../../redux/ProductsReducer'

export const ShopList = () => {
    const { products, loading } = useSelector(selectProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts("/api/products"));
    }, [])


    return (
        <>
            <h2>{loading ? "Loading..." : null}</h2>

            <Grid container >
                <Grid item xs={2} >
                    {/* <Sidebar /> */}
                </Grid>

                <Grid
                    item
                    container
                    spacing={2}
                    xs={8}
                    className={styles.items}
                >
                    {products.map(product =>
                        <Grid
                            item
                            xs={4}
                            key={product._id}
                        >
                            <ShopItem product={product} > </ShopItem>
                        </Grid>)}
                </Grid>

                <Grid item xs={2} />
            </Grid>

        </>
    )
}



