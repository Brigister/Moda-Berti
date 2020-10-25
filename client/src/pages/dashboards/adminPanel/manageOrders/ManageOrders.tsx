import React from 'react'
import { OrderDataGrid } from './OrderDataGrid'

export const ManageOrders: React.FC = () => {
    return (
        <>
            <h2>Ordini da Lavorare</h2>
            <OrderDataGrid status={"pending"} />
            <h2>Ordini spediti</h2>
            <OrderDataGrid status={"shipped"} />

        </>
    )
}
