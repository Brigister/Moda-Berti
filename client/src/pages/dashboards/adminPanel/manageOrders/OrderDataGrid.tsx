import React from 'react'
import { useQueryCache, QueryResult, useQuery, useMutation } from 'react-query';
import api from '../../../../api/axiosIstance';
import { ColDef, ValueFormatterParams, ValueGetterParams, RowsProp, DataGrid } from '@material-ui/data-grid';
import { Loading } from '../../../../components/Loading';
import { Order } from '../../../../interfaces/interfaces';
import { dateFormat } from '../../../../utils/dateFormatter';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import styles from './manageOrders.module.css'

interface OrderDataGridProps {
    status: string;
}

export const OrderDataGrid: React.FC<OrderDataGridProps> = ({ status }) => {
    console.log(status)
    const cache = useQueryCache();
    const { data, error, isLoading }: QueryResult<Order[], Error> = useQuery(`${status} orders`, () =>
        api.get(`orders?status=${status}`)
            .then(res =>
                res.data.data
            )
            .catch(err => {
                console.log(err)
            })
    )

    const [deleteOrder] = useMutation(async (id: number) => {
        const res = await api.delete(`orders/${id}`, {
            data: data
        })
        return res.data;


    }, {
        onSuccess: (_, id) => {
            const newData = data?.filter(product => product.id != id)
            cache.setQueryData('products', newData);
        }
    })

    console.log(data);
    if (!data) return <h3>No data</h3>
    if (error) return <h3>Errore: {error.message}</h3>

    const columns: ColDef[] = [
        { field: 'id', headerName: 'Id' },
        { field: 'user_id', headerName: 'Utente' },
        { field: 'status', headerName: 'Status' },
        { field: 'tracking', headerName: 'Numero di Spedizione', width: 250 },
        {
            field: 'create_time',
            headerName: 'Creato',
            valueFormatter: (params: ValueFormatterParams) =>
                dateFormat(params.value as Date),
            width: 200
        },
        {
            field: 'edit',
            headerName: 'Modifica',
            renderCell: (params: ValueGetterParams) => (
                <EditIcon
                    cursor="pointer"
                />)

        },
        {
            field: 'delete',
            headerName: 'Elimina',
            renderCell: (params: ValueGetterParams) => (
                <DeleteIcon
                    cursor="pointer"
                    onClick={async () => await deleteOrder(params.getValue('id') as number)} />
            )
        }
    ];

    return (
        <DataGrid
            className={styles.pending_table}
            columns={columns}
            rows={data}
            rowHeight={80}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
            disableExtendRowFullWidth

            loading={isLoading}
            components={{
                loadingOverlay: Loading
            }}

        />
    )
}
