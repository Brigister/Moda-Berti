import React, { useEffect } from 'react';
import axios from 'axios'
import { Grid } from '@material-ui/core';

import styles from './shoplist.module.css'
import { ShopItem } from '../shopItem/ShopItem';
/* import { Sidebar } from '../sidebar/Sidebar'; */

import { useQuery } from 'react-query';
import api from '../../../api/axiosIstance';

export const ShopList = () => {

    const { isLoading, error, data } = useQuery('products', () =>
        api.get(`products`, {
            withCredentials: true, credentials: 'include'
        }).then(res =>
            res.data.data
        )
    )
    console.log(isLoading);
    console.log(error);
    console.log(data);
    return (
        <>
            {isLoading
                ?
                <h2>Loading...</h2>
                :
                <Grid container >
                    <Grid item xs={2} >
                        {/*  <Sidebar /> */}
                    </Grid>

                    <Grid
                        item
                        container
                        spacing={2}
                        xs={8}
                        className={styles.items}
                    >
                        {data.map(product =>
                            <Grid
                                item
                                xs={4}
                                key={product.id}
                            >
                                <ShopItem product={product} > </ShopItem>
                            </Grid>)}
                    </Grid>

                    <Grid item xs={2} />
                </Grid>
            }
        </>
    )
}



