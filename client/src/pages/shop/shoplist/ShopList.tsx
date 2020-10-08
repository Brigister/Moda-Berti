import React, { useEffect } from 'react';
import axios from 'axios'
import { Grid } from '@material-ui/core';

import styles from './shoplist.module.css'
import { ShopItem } from '../shopItem/ShopItem';

import { QueryResult, useQuery } from 'react-query';
import api from '../../../api/axiosIstance';
import { Product } from '../../../interfaces/interfaces';
import { Loading } from '../../../components/Loading';

export const ShopList = () => {

    const { isLoading, error, data }: QueryResult<Product[], Error> = useQuery('products', () =>
        api.get(`products`).then(res =>
            res.data.data
        )
    );

    return (
        <>
            {isLoading
                ?
                <Loading />
                :
                <Grid
                    container
                    spacing={2}
                    xs={12}

                    justify="space-around"
                    className={styles.items}
                >
                    {data && data.map(product =>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={2}
                            key={product.id}
                        >
                            <ShopItem {...product} />
                        </Grid>)}
                </Grid>
            }
        </>
    )
}