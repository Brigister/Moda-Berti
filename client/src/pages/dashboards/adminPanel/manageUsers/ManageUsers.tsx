import React from 'react'
import { QueryResult, useQuery } from 'react-query'
import api from '../../../../api/axiosIstance'
import { ColDef, DataGrid, RowData, RowProps, ValueFormatterParams } from '@material-ui/data-grid';
import { User } from '../../../../interfaces/interfaces';
import { dateFormat } from '../../../../utils/dateFormatter';

export const ManageUsers: React.FC = () => {

    const { data, error, isLoading }: QueryResult<User[], Error> = useQuery('users', async () => {
        const res = await api.get('users');
        console.log(res);
        return res.data.data;
    });
    console.log(data);
    if (!data) return <h3>No data</h3>
    if (error) return <h3>Errore: {error.message}</h3>

    const column: ColDef[] = [
        { field: 'id', headerName: 'Id' },
        { field: 'name', headerName: 'Nome', width: 250 },
        { field: 'surname', headerName: 'Cognome', width: 250 },
        { field: 'email', headerName: 'E-mail', width: 250 },
        {
            field: 'isAdmin',
            headerName: 'Ruolo',
            valueFormatter: (params: ValueFormatterParams) => (
                (params.value as boolean) ? 'Admin' : 'Utente'
            )
        },
        {
            field: 'create_time',
            headerName: 'Creato il',
            valueFormatter: (params: ValueFormatterParams) => (
                dateFormat(params.value as Date)
            ),
            width: 250
        }
    ]
    return (
        <>
            <h2>Users</h2>
            <DataGrid
                columns={column}
                rows={data}
                rowHeight={80}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                disableExtendRowFullWidth

            />
        </>
    )
}
