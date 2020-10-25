import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Grid } from '@material-ui/core';

import styles from './shoplist.module.css'
import { ShopItem } from '../shopItem/ShopItem';

import { PaginatedQueryResult, QueryResult, usePaginatedQuery, useQuery, useQueryCache } from 'react-query';
import api from '../../../api/axiosIstance';
import { Product } from '../../../interfaces/interfaces';
import { Loading } from '../../../components/Loading';
import { useLocation } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';



export const ShopList = () => {
    const cache = useQueryCache()
    let { search } = useLocation();

    const query = new URLSearchParams(search);

    const gender = query.get('gender');

    const [page, setPage] = useState<number>(1);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const fetchProducts = useCallback(async (key, page = 0) => {
        const res = await api.get(`products?gender=${gender}&page=${page - 1}`);
        return res.data.data
    }, [])

    const {
        status,
        resolvedData,
        latestData,
        error,
        isFetching,
        isLoading
    }: PaginatedQueryResult<Product[], Error> = usePaginatedQuery([`products-${gender}`, page], fetchProducts);

    useEffect(() => {
        if (latestData) {
            cache.prefetchQuery([`products-${gender}`, page], fetchProducts);
        }

    }, [latestData, fetchProducts, page])
    console.log(latestData);
    return (
        <>
            {isLoading
                ?
                <Loading />
                :
                <>
                    <Grid
                        container
                        spacing={10}
                        justify="flex-start"
                        className={styles.items}
                    >
                        {latestData && latestData.map((product) =>
                            <Grid
                                item
                                key={product.id}
                            >
                                <ShopItem {...product} />
                            </Grid>)
                        }
                    </Grid>
                    <Pagination
                        classes={{ root: styles.pagination, ul: styles.paginator }}
                        count={10}
                        page={page}
                        onChange={handlePageChange}
                        shape="rounded"
                        variant="outlined"
                        size="large"
                    />
                </>
            }
        </>
    )
}