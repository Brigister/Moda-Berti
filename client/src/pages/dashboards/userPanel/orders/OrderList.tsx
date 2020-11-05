import { AxiosError } from 'axios';
import React, { useEffect } from 'react'
import { QueryResult, useQuery } from 'react-query';
import api from '../../../../api/axiosIstance'
import { Loading } from '../../../../components/loading/Loading';
import { Order } from '../../../../interfaces/interfaces';
import { OrderItem } from './OrderItem';


export const OrderList: React.FC = () => {

    const { data, error, isLoading }: QueryResult<Order[], AxiosError> = useQuery('personal-orders', async () => {
        const res = await api.get('orders/personal');
        console.log(res.data)
        return res.data.data;
    });

    if (error?.response?.status === 404) return <h2>{error.response?.data.error}</h2>

    if (isLoading) return <Loading />
    return (
        <>
            {data?.map(order =>
                <OrderItem key={order.id} {...order} />
            )}
        </>
    )



}