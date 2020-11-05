import React from 'react'
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core'
import { QueryResult, useQuery } from 'react-query';
import api from '../../../../api/axiosIstance';
import { Loading } from '../../../../components/loading/Loading';
import { Order } from '../../../../interfaces/interfaces';
import { MiniCartItem } from './MiniCartItem';

export const MiniCart: React.FC = () => {
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
    if (error?.message === "Non c'è un carrello" || !data?.products) return <h3>{error && error.message}</h3>

    return (
        <Card raised >
            <CardHeader
                title="Carrello"
            />
            <CardContent>
                <Grid container spacing={1}>
                    {
                        data.products.map(product =>
                            <Grid item container key={product.id} xs={12} sm={4} >
                                <MiniCartItem {...product} />
                            </Grid>
                        )
                    }

                </Grid>
            </CardContent>
        </Card>
    )
}
